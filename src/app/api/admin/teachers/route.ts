import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import User from "@/models/User";
import TeacherProfile from "@/models/TeacherProfile";
import Notification from "@/models/Notification";
import StudentProfile from "@/models/StudentProfile";
import { recordAuditLog } from "@/lib/audit";
import { hashPassword } from "@/lib/auth/passwords";
import { isValid10DigitPhone, isValidAcuityOrGmail, sanitize10DigitPhone } from "@/lib/validations/phone";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    await connectToDatabase();

    const filter: any = {};
    if (status && status !== "ALL") {
      filter.approvalStatus = status;
    }

    const teachers = await TeacherProfile.find(filter)
      .populate("userId", "name email phone status avatarUrl createdAt")
      .populate("assignedStudentIds", "name email phone")
      .populate("preferredBatchIds")
      .sort({ createdAt: -1 })
      .lean();

    // Enrich assignedStudentIds with details from StudentProfile
    const allAssignedUserIds = Array.from(
      new Set(
        teachers.flatMap((t: any) =>
          Array.isArray(t.assignedStudentIds)
            ? t.assignedStudentIds.map((s: any) => s._id || s)
            : []
        )
      )
    );

    let studentProfileMap: Record<string, any> = {};
    if (allAssignedUserIds.length > 0) {
      const studentProfiles = await StudentProfile.find({
        userId: { $in: allAssignedUserIds },
      }).select("userId studentId currentClass schoolName subjects studentType").lean();

      studentProfileMap = studentProfiles.reduce((acc: any, p: any) => {
        const uId = p.userId?.toString();
        if (uId) acc[uId] = p;
        return acc;
      }, {});
    }

    const enrichedTeachers = teachers.map((t: any) => {
      const enrichedStudents = (t.assignedStudentIds || []).map((st: any) => {
        const uId = st._id ? st._id.toString() : st.toString();
        const profile = studentProfileMap[uId] || {};
        return {
          _id: st._id || st,
          name: st.name || "Student",
          email: st.email || "",
          phone: st.phone || "",
          studentId: profile.studentId || "",
          currentClass: profile.currentClass || "",
          schoolName: profile.schoolName || "",
          subjects: profile.subjects || [],
          studentType: profile.studentType || "B2C",
        };
      });

      return {
        ...t,
        assignedStudents: enrichedStudents,
      };
    });

    return NextResponse.json({ teachers: enrichedTeachers }, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Admin Teachers Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      teacherId,
      name,
      email,
      phone,
      qualification,
      specialization,
      experienceYears,
      status,
      subjects,
      classesTaught,
      teacherType,
      institutionName,
      assignedSubjects,
      assignedClasses,
      assignedStudentIds,
      preferredBatchIds,
      resetPassword,
    } = body;

    if (!teacherId) {
      return NextResponse.json({ error: "Teacher ID is required" }, { status: 400 });
    }

    if (email && !isValidAcuityOrGmail(email)) {
      return NextResponse.json(
        { error: "Email address must end with @mantif.edu, @acuity.edu, or @gmail.com." },
        { status: 400 }
      );
    }

    if (phone && !isValid10DigitPhone(phone)) {
      return NextResponse.json(
        { error: "Teacher mobile number must be exactly 10 digits and cannot start with 0." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const userUpdate: any = {};
    if (name) userUpdate.name = name.trim();
    if (email) userUpdate.email = email.toLowerCase().trim();
    if (phone) userUpdate.phone = sanitize10DigitPhone(phone);
    if (status) userUpdate.status = status;
    if (resetPassword && resetPassword.trim()) {
      userUpdate.passwordHash = await hashPassword(resetPassword.trim());
    }

    if (Object.keys(userUpdate).length > 0) {
      await User.findByIdAndUpdate(teacherId, userUpdate);
    }

    const updateProfile: any = {};
    if (status) updateProfile.approvalStatus = status;
    if (qualification !== undefined) updateProfile.qualification = qualification;
    if (specialization !== undefined) updateProfile.specialization = specialization;
    if (experienceYears !== undefined) updateProfile.experienceYears = Number(experienceYears);
    if (subjects !== undefined) updateProfile.subjects = subjects;
    if (classesTaught !== undefined) updateProfile.classesTaught = classesTaught;
    if (teacherType !== undefined) updateProfile.teacherType = teacherType;
    if (institutionName !== undefined) updateProfile.institutionName = institutionName;
    if (assignedSubjects !== undefined) updateProfile.assignedSubjects = assignedSubjects;
    if (assignedClasses !== undefined) updateProfile.assignedClasses = assignedClasses;
    if (assignedStudentIds !== undefined) updateProfile.assignedStudentIds = assignedStudentIds;
    if (preferredBatchIds !== undefined) updateProfile.preferredBatchIds = preferredBatchIds;

    if (Object.keys(updateProfile).length > 0) {
      await TeacherProfile.findOneAndUpdate({ userId: teacherId }, updateProfile);
    }

    // Bidirectional sync for assignedStudentIds
    if (Array.isArray(assignedStudentIds)) {
      // Add teacher to newly assigned students
      if (assignedStudentIds.length > 0) {
        await StudentProfile.updateMany(
          { userId: { $in: assignedStudentIds } },
          { $addToSet: { assignedTeacherIds: teacherId } }
        );
      }
      // Remove teacher from unassigned students
      await StudentProfile.updateMany(
        {
          userId: { $nin: assignedStudentIds },
          assignedTeacherIds: teacherId,
        },
        { $pull: { assignedTeacherIds: teacherId } }
      );
    }

    if (status) {
      // Notify the teacher
      const message =
        status === "ACTIVE"
          ? "Your teacher application has been approved! You can now log in and schedule live classes."
          : `Your teacher account status has been updated to: ${status}.`;

      await Notification.create({
        userId: teacherId,
        title: status === "ACTIVE" ? "Account Approved" : "Account Status Update",
        message,
        type: "SYSTEM",
      });

      // ── AUTO-ALLOCATION: when a B2C teacher is approved, match students by class + subject ──
      let autoAllocated = 0;
      if (status === "ACTIVE") {
        try {
          const freshProfile = await TeacherProfile.findOne({ userId: teacherId }).lean() as any;
          if (freshProfile && freshProfile.teacherType === "B2C") {
            const tClasses: string[] = (
              freshProfile.assignedClasses?.length > 0
                ? freshProfile.assignedClasses
                : freshProfile.classesTaught
            ) ?? [];
            const tSubjects: string[] = (
              freshProfile.assignedSubjects?.length > 0
                ? freshProfile.assignedSubjects
                : freshProfile.subjects
            ) ?? [];

            if (tClasses.length > 0 && tSubjects.length > 0) {
              const existingIds = (freshProfile.assignedStudentIds ?? []).map((id: any) => id.toString());

              const matchingStudents = await StudentProfile.find({
                studentType: "B2C",
                currentClass: { $in: tClasses },
                subjects: { $in: tSubjects },
                userId: { $nin: existingIds },
              }).populate("userId", "name status").lean() as any[];

              const eligible = matchingStudents.filter(
                (s: any) => s.userId && (s.userId.status === "ACTIVE" || !s.userId.status)
              );

              if (eligible.length > 0) {
                const newIds = eligible.map((s: any) => s.userId._id.toString());

                await TeacherProfile.findOneAndUpdate(
                  { userId: teacherId },
                  { $addToSet: { assignedStudentIds: { $each: newIds } } }
                );

                await StudentProfile.updateMany(
                  { userId: { $in: newIds } },
                  { $addToSet: { assignedTeacherIds: teacherId } }
                );

                const teacherUser = await User.findById(teacherId).select("name").lean() as any;
                const teacherName = teacherUser?.name || "Your Tutor";

                for (const s of eligible) {
                  const overlap = (s.subjects || []).filter((sub: string) => tSubjects.includes(sub));
                  try {
                    await Notification.create({
                      userId: s.userId._id,
                      title: "Tutor Assigned!",
                      message: `You have been matched with ${teacherName} for ${overlap.join(", ")} — ${s.currentClass}. Your personalised sessions begin soon!`,
                      type: "SYSTEM",
                    });
                  } catch (_) {}
                }

                autoAllocated = eligible.length;
              }
            }
          }
        } catch (allocErr) {
          console.error("Auto-allocation error during approval (non-blocking):", allocErr);
        }
      }

      await recordAuditLog({
        actorId: session.userId,
        action: status ? `TEACHER_STATUS_${status}` : "ADMIN_TEACHER_UPDATED",
        entityType: "USER",
        entityId: teacherId,
        details: { name, email, status, subjects, classesTaught, teacherType, assignedStudentIds, autoAllocated },
      });

      return NextResponse.json({
        success: true,
        message:
          status === "ACTIVE" && autoAllocated > 0
            ? `Teacher approved and ${autoAllocated} student${autoAllocated === 1 ? "" : "s"} auto-allocated by class & subject match.`
            : "Teacher and student allocations updated successfully.",
        autoAllocated,
      });
    }

    // Non-status update path (profile edit only)
    await recordAuditLog({
      actorId: session.userId,
      action: "ADMIN_TEACHER_UPDATED",
      entityType: "USER",
      entityId: teacherId,
      details: { name, email, subjects, classesTaught, teacherType, assignedStudentIds },
    });

    return NextResponse.json({ success: true, message: "Teacher and student allocations updated successfully." });
  } catch (error: any) {
    console.error("Admin Patch Teacher Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const teacherId = (searchParams.get("id") || searchParams.get("teacherId") || "").trim();

    if (!teacherId) {
      return NextResponse.json({ error: "Teacher ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    let user: any = null;
    let teacherProfile: any = null;

    // 1. Try finding by User _id
    try {
      user = await User.findById(teacherId);
    } catch (e) {}

    // 2. If not found, try finding TeacherProfile by _id
    if (!user) {
      try {
        teacherProfile = await TeacherProfile.findById(teacherId);
        if (teacherProfile?.userId) {
          user = await User.findById(teacherProfile.userId);
        }
      } catch (e) {}
    }

    // 3. If still not found, try finding TeacherProfile by userId
    if (!teacherProfile && user) {
      teacherProfile = await TeacherProfile.findOne({ userId: user._id });
    } else if (!user) {
      try {
        teacherProfile = await TeacherProfile.findOne({
          $or: [{ _id: teacherId }, { userId: teacherId }],
        });
        if (teacherProfile?.userId) {
          user = await User.findById(teacherProfile.userId);
        }
      } catch (e) {}
    }

    // 4. Try finding by email
    if (!user) {
      user = await User.findOne({ email: teacherId.toLowerCase(), role: "TEACHER" });
      if (user) {
        teacherProfile = await TeacherProfile.findOne({ userId: user._id });
      }
    }

    const targetUserId = user?._id || teacherProfile?.userId;
    const targetProfileId = teacherProfile?._id;

    if (!user && !teacherProfile) {
      return NextResponse.json({ error: "Teacher record not found in database." }, { status: 404 });
    }

    // Perform database deletion
    if (targetUserId) {
      await Promise.all([
        User.findByIdAndDelete(targetUserId),
        TeacherProfile.deleteMany({ userId: targetUserId }),
      ]);
    }
    if (targetProfileId) {
      await TeacherProfile.findByIdAndDelete(targetProfileId);
    }

    const teacherName = user?.name || "Teacher";

    await recordAuditLog({
      actorId: session.userId,
      action: "ADMIN_TEACHER_DELETED",
      entityType: "USER",
      entityId: (targetUserId || targetProfileId).toString(),
      details: { name: teacherName, email: user?.email },
    });

    return NextResponse.json({
      success: true,
      message: `Teacher "${teacherName}" and associated profile permanently deleted from database.`,
    });
  } catch (error: any) {
    console.error("Admin Delete Teacher Error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete teacher" }, { status: 500 });
  }
}
