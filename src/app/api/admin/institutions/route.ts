import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import Institution from "@/models/Institution";
import User from "@/models/User";
import TeacherProfile from "@/models/TeacherProfile";
import StudentProfile from "@/models/StudentProfile";
import Batch from "@/models/Batch";
import { hashPassword } from "@/lib/auth/passwords";
import { recordAuditLog } from "@/lib/audit";
import { isValid10DigitPhone, sanitize10DigitPhone } from "@/lib/validations/phone";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const search = (searchParams.get("search") || "").trim();

    const query: any = {};
    if (id) {
      query._id = id;
    } else if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
        { district: { $regex: search, $options: "i" } },
      ];
    }

    const institutions = await Institution.find(query).sort({ createdAt: -1 }).lean();

    // Enrich each institution with its faculty, students, and group details
    const enrichedInstitutions = await Promise.all(
      institutions.map(async (inst: any) => {
        const instRegex = new RegExp(
          `^${inst.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`,
          "i"
        );

        // 1. Fetch Teachers belonging to this institution
        const teacherProfiles = await TeacherProfile.find({
          institutionName: { $regex: instRegex },
        })
          .populate("userId", "name email phone status avatarUrl createdAt")
          .lean();

        const facultyList = teacherProfiles
          .filter((tp: any) => tp.userId)
          .map((tp: any) => {
            const u = tp.userId;
            return {
              profileId: tp._id,
              userId: u._id?.toString() || u.toString(),
              name: u.name,
              email: u.email,
              phone: u.phone,
              status: u.status,
              qualification: tp.qualification,
              specialization: tp.specialization,
              subjects: tp.assignedSubjects?.length ? tp.assignedSubjects : tp.subjects || [],
              classesTaught: tp.assignedClasses?.length ? tp.assignedClasses : tp.classesTaught || [],
              assignedStudentCount: (tp.assignedStudentIds || []).length,
              assignedStudentIds: (tp.assignedStudentIds || []).map((s: any) => (s._id || s).toString()),
            };
          });

        // 2. Fetch Students belonging to this institution
        const studentProfiles = await StudentProfile.find({
          schoolName: { $regex: instRegex },
        })
          .populate("userId", "name email phone status avatarUrl createdAt")
          .lean();

        const studentList = studentProfiles
          .filter((sp: any) => sp.userId)
          .map((sp: any) => {
            const u = sp.userId;
            return {
              profileId: sp._id,
              userId: u._id?.toString() || u.toString(),
              studentId: sp.studentId || "",
              name: u.name,
              email: u.email,
              phone: u.phone,
              currentClass: sp.currentClass,
              board: sp.board,
              parentName: sp.parentName,
              parentPhone: sp.parentPhone,
              assignedTeacherIds: (sp.assignedTeacherIds || []).map((t: any) => (t._id || t).toString()),
            };
          });

        // 3. Populate groups with user names
        const allUserIds = [
          ...facultyList.map((f) => f.userId),
          ...studentList.map((s) => s.userId),
        ];
        const userMap = new Map<string, any>();
        facultyList.forEach((f) => userMap.set(f.userId, f));
        studentList.forEach((s) => userMap.set(s.userId, s));

        const enrichedGroups = (inst.groups || []).map((grp: any) => {
          const facultyIdStr = grp.facultyUserId?.toString() || "";
          const faculty = userMap.get(facultyIdStr);
          const students = (grp.studentUserIds || [])
            .map((sId: any) => userMap.get(sId?.toString() || ""))
            .filter(Boolean);

          return {
            ...grp,
            facultyName: faculty ? faculty.name : "Unassigned Faculty",
            facultyEmail: faculty ? faculty.email : "",
            students,
            studentCount: students.length,
          };
        });

        return {
          ...inst,
          faculty: facultyList,
          students: studentList,
          groups: enrichedGroups,
          totalFaculty: facultyList.length,
          totalStudents: studentList.length,
          totalGroups: enrichedGroups.length,
        };
      })
    );

    const totalInstitutions = enrichedInstitutions.length;
    const totalFaculty = enrichedInstitutions.reduce((acc, inst) => acc + inst.totalFaculty, 0);
    const totalStudents = enrichedInstitutions.reduce((acc, inst) => acc + inst.totalStudents, 0);
    const totalGroups = enrichedInstitutions.reduce((acc, inst) => acc + inst.totalGroups, 0);

    return NextResponse.json(
      {
        institutions: enrichedInstitutions,
        summary: {
          totalInstitutions,
          totalFaculty,
          totalStudents,
          totalGroups,
        },
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      }
    );
  } catch (error: any) {
    console.error("Admin Institutions GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { action } = body;

    // ──────────────────────────────────────────────────────────────────────────
    // 1. CREATE INSTITUTION
    // ──────────────────────────────────────────────────────────────────────────
    if (action === "CREATE_INSTITUTION") {
      const {
        name,
        code,
        district,
        address,
        contactPerson,
        contactPhone,
        contactEmail,
        classesOffered,
      } = body;

      if (!name || !name.trim()) {
        return NextResponse.json({ error: "Institution name is required." }, { status: 400 });
      }

      const cleanName = name.trim();
      const cleanCode = (code || cleanName.replace(/[^A-Za-z0-9]/g, "").substring(0, 8)).toUpperCase();

      const existing = await Institution.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${cleanName}$`, "i") } },
          { code: cleanCode },
        ],
      });

      if (existing) {
        return NextResponse.json(
          { error: "An institution with this name or code already exists." },
          { status: 409 }
        );
      }

      const defaultClasses = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
      const finalClasses = Array.isArray(classesOffered) && classesOffered.length > 0
        ? classesOffered
        : defaultClasses;

      const institution = await Institution.create({
        name: cleanName,
        code: cleanCode,
        district: (district || "").trim(),
        address: (address || "").trim(),
        contactPerson: (contactPerson || "").trim(),
        contactPhone: contactPhone ? sanitize10DigitPhone(contactPhone) : "",
        contactEmail: (contactEmail || "").trim().toLowerCase(),
        classesOffered: finalClasses,
        status: "ACTIVE",
        groups: [],
      });

      await recordAuditLog({
        actorId: session.userId,
        action: "ADMIN_INSTITUTION_CREATED",
        entityType: "INSTITUTION",
        entityId: institution._id.toString(),
        details: { name: cleanName, code: cleanCode },
      });

      return NextResponse.json({
        success: true,
        message: `Institution "${cleanName}" created successfully!`,
        institution,
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 2. ADD FACULTY MEMBER (Username & Password)
    // ──────────────────────────────────────────────────────────────────────────
    if (action === "ADD_FACULTY") {
      const {
        institutionId,
        institutionName,
        name,
        username,
        email,
        phone,
        password,
        qualification,
        specialization,
        classesTaught,
        subjects,
      } = body;

      if (!name || !name.trim()) {
        return NextResponse.json({ error: "Faculty member name is required." }, { status: 400 });
      }

      const loginEmail = (username || email || "").trim().toLowerCase();
      if (!loginEmail) {
        return NextResponse.json({ error: "Faculty username / email is required." }, { status: 400 });
      }

      const userPassword = (password || "").trim();
      if (!userPassword || userPassword.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
      }

      const cleanPhone = phone ? sanitize10DigitPhone(phone) : "";

      // Resolve Institution
      let instDoc: any = null;
      if (institutionId) {
        instDoc = await Institution.findById(institutionId);
      } else if (institutionName) {
        instDoc = await Institution.findOne({
          name: { $regex: new RegExp(`^${institutionName.trim()}$`, "i") },
        });
      }

      const targetInstitutionName = instDoc?.name || institutionName?.trim() || "";
      if (!targetInstitutionName) {
        return NextResponse.json({ error: "Target school/institution not specified." }, { status: 400 });
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email: loginEmail },
          ...(cleanPhone ? [{ phone: cleanPhone }] : []),
        ],
      });

      let facultyUser = existingUser;
      if (facultyUser) {
        // Update credentials and role if already registered
        facultyUser.name = name.trim();
        facultyUser.role = "TEACHER";
        facultyUser.status = "ACTIVE";
        facultyUser.passwordHash = await hashPassword(userPassword);
        if (cleanPhone) facultyUser.phone = cleanPhone;
        await facultyUser.save();
      } else {
        const passwordHash = await hashPassword(userPassword);
        facultyUser = await User.create({
          name: name.trim(),
          email: loginEmail,
          phone: cleanPhone || `9${Math.floor(100000000 + Math.random() * 900000000)}`,
          passwordHash,
          role: "TEACHER",
          status: "ACTIVE",
          avatarUrl: "",
        });
      }

      // Create or update TeacherProfile
      const teacherCount = await TeacherProfile.countDocuments();
      const staffId = `STF_${String(teacherCount + 1).padStart(3, "0")}`;

      const finalClasses = Array.isArray(classesTaught) && classesTaught.length > 0
        ? classesTaught
        : ["Class 9", "Class 10"];
      const finalSubjects = Array.isArray(subjects) && subjects.length > 0
        ? subjects
        : ["Mathematics", "Science"];

      let profile = await TeacherProfile.findOne({ userId: facultyUser._id });
      if (!profile) {
        profile = await TeacherProfile.create({
          userId: facultyUser._id,
          staffId,
          teacherType: "B2B",
          institutionName: targetInstitutionName,
          qualification: (qualification || "B.Ed, B.Sc").trim(),
          specialization: (specialization || "Mathematics & Science").trim(),
          subjects: finalSubjects,
          classesTaught: finalClasses,
          assignedSubjects: finalSubjects,
          assignedClasses: finalClasses,
          assignedStudentIds: [],
          experienceYears: 5,
          approvalStatus: "ACTIVE",
        });
      } else {
        profile.teacherType = "B2B";
        profile.institutionName = targetInstitutionName;
        profile.approvalStatus = "ACTIVE";
        profile.classesTaught = finalClasses;
        profile.assignedClasses = finalClasses;
        profile.subjects = finalSubjects;
        profile.assignedSubjects = finalSubjects;
        if (qualification) profile.qualification = qualification.trim();
        if (specialization) profile.specialization = specialization.trim();
        await profile.save();
      }

      await recordAuditLog({
        actorId: session.userId,
        action: "ADMIN_INSTITUTION_FACULTY_ADDED",
        entityType: "TEACHER",
        entityId: facultyUser._id.toString(),
        details: { name: facultyUser.name, email: loginEmail, institution: targetInstitutionName },
      });

      return NextResponse.json({
        success: true,
        message: `Faculty member "${facultyUser.name}" added to ${targetInstitutionName} with active login credentials!`,
        user: {
          id: facultyUser._id,
          name: facultyUser.name,
          email: facultyUser.email,
          phone: facultyUser.phone,
        },
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 3. ADD STUDENT MEMBER (Username & Password & Optional Direct Faculty Allocation)
    // ──────────────────────────────────────────────────────────────────────────
    if (action === "ADD_STUDENT") {
      const {
        institutionId,
        institutionName,
        name,
        username,
        email,
        phone,
        password,
        currentClass,
        board,
        parentName,
        parentPhone,
        assignedFacultyId,
      } = body;

      if (!name || !name.trim()) {
        return NextResponse.json({ error: "Student name is required." }, { status: 400 });
      }

      const loginEmail = (username || email || "").trim().toLowerCase();
      if (!loginEmail) {
        return NextResponse.json({ error: "Student username / email is required." }, { status: 400 });
      }

      const userPassword = (password || "").trim();
      if (!userPassword || userPassword.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
      }

      const cleanPhone = phone ? sanitize10DigitPhone(phone) : "";

      // Resolve Institution
      let instDoc: any = null;
      if (institutionId) {
        instDoc = await Institution.findById(institutionId);
      } else if (institutionName) {
        instDoc = await Institution.findOne({
          name: { $regex: new RegExp(`^${institutionName.trim()}$`, "i") },
        });
      }

      const targetInstitutionName = instDoc?.name || institutionName?.trim() || "";
      if (!targetInstitutionName) {
        return NextResponse.json({ error: "Target school/institution not specified." }, { status: 400 });
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email: loginEmail },
          ...(cleanPhone ? [{ phone: cleanPhone }] : []),
        ],
      });

      let studentUser = existingUser;
      if (studentUser) {
        studentUser.name = name.trim();
        studentUser.role = "STUDENT";
        studentUser.status = "ACTIVE";
        studentUser.passwordHash = await hashPassword(userPassword);
        if (cleanPhone) studentUser.phone = cleanPhone;
        await studentUser.save();
      } else {
        const passwordHash = await hashPassword(userPassword);
        studentUser = await User.create({
          name: name.trim(),
          email: loginEmail,
          phone: cleanPhone || `9${Math.floor(100000000 + Math.random() * 900000000)}`,
          passwordHash,
          role: "STUDENT",
          status: "ACTIVE",
          avatarUrl: "",
        });
      }

      // Find or assign batch
      const defaultBatch = await Batch.findOne().lean();
      const targetBatchId = defaultBatch?._id || new mongoose.Types.ObjectId();

      const studentCount = await StudentProfile.countDocuments();
      const formattedStudentId = `STD_${String(studentCount + 1).padStart(3, "0")}`;

      const assignedTeachers = assignedFacultyId ? [assignedFacultyId] : [];

      let profile = await StudentProfile.findOne({ userId: studentUser._id });
      if (!profile) {
        profile = await StudentProfile.create({
          userId: studentUser._id,
          studentId: formattedStudentId,
          studentType: "B2B",
          schoolName: targetInstitutionName,
          board: board || "State Board",
          currentClass: currentClass || "Class 10",
          subjects: ["Mathematics", "Science"],
          assignedTeacherIds: assignedTeachers,
          batchId: targetBatchId,
          parentName: (parentName || `${name.trim()}'s Guardian`).trim(),
          parentPhone: parentPhone ? sanitize10DigitPhone(parentPhone) : cleanPhone || "9876543210",
          streakCount: 1,
          attendanceRiskLevel: "LOW",
        });
      } else {
        profile.studentType = "B2B";
        profile.schoolName = targetInstitutionName;
        if (currentClass) profile.currentClass = currentClass;
        if (board) profile.board = board;
        if (parentName) profile.parentName = parentName.trim();
        if (parentPhone) profile.parentPhone = sanitize10DigitPhone(parentPhone);
        if (assignedFacultyId) {
          const currentTeachers = (profile.assignedTeacherIds || []).map((t: any) => t.toString());
          if (!currentTeachers.includes(assignedFacultyId.toString())) {
            profile.assignedTeacherIds = [...currentTeachers, assignedFacultyId];
          }
        }
        await profile.save();
      }

      // If assigned to a teacher, also update TeacherProfile.assignedStudentIds
      if (assignedFacultyId) {
        const teacherProf = await TeacherProfile.findOne({
          $or: [{ userId: assignedFacultyId }, { _id: assignedFacultyId }],
        });
        if (teacherProf) {
          const curStudents = (teacherProf.assignedStudentIds || []).map((s: any) => s.toString());
          if (!curStudents.includes(studentUser._id.toString())) {
            teacherProf.assignedStudentIds = [...curStudents, studentUser._id];
            await teacherProf.save();
          }
        }
      }

      await recordAuditLog({
        actorId: session.userId,
        action: "ADMIN_INSTITUTION_STUDENT_ADDED",
        entityType: "STUDENT",
        entityId: studentUser._id.toString(),
        details: { name: studentUser.name, email: loginEmail, institution: targetInstitutionName },
      });

      return NextResponse.json({
        success: true,
        message: `Student "${studentUser.name}" added to ${targetInstitutionName} with active login credentials!`,
        user: {
          id: studentUser._id,
          name: studentUser.name,
          email: studentUser.email,
          phone: studentUser.phone,
        },
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 4. CREATE / UPDATE CLASS GROUP (Allocating Faculty "Mam" to specific students)
    // ──────────────────────────────────────────────────────────────────────────
    if (action === "SAVE_GROUP") {
      const {
        institutionId,
        groupId,
        groupName,
        classLevel,
        facultyUserId,
        studentUserIds,
      } = body;

      if (!institutionId) {
        return NextResponse.json({ error: "Institution ID is required." }, { status: 400 });
      }
      if (!groupName || !groupName.trim()) {
        return NextResponse.json({ error: "Group name is required (e.g. Class 10 - Section A)." }, { status: 400 });
      }
      if (!facultyUserId) {
        return NextResponse.json({ error: "Please select the designated faculty member (Mam/Sir) for this group." }, { status: 400 });
      }

      const inst = await Institution.findById(institutionId);
      if (!inst) {
        return NextResponse.json({ error: "Institution not found." }, { status: 404 });
      }

      const cleanGroupId = groupId || `grp_${Date.now()}`;
      const selectedStudentIds = Array.isArray(studentUserIds)
        ? studentUserIds.filter(Boolean).map((id: any) => (id._id || id).toString())
        : [];

      // Check if group already exists in inst.groups
      const existingGrpIndex = (inst.groups || []).findIndex(
        (g: any) => g.groupId === cleanGroupId
      );

      const groupPayload: any = {
        groupId: cleanGroupId,
        groupName: groupName.trim(),
        classLevel: classLevel || "Class 10",
        facultyUserId: new mongoose.Types.ObjectId(facultyUserId),
        studentUserIds: selectedStudentIds.map((id) => new mongoose.Types.ObjectId(id)),
        createdAt: new Date(),
      };

      if (existingGrpIndex >= 0) {
        inst.groups[existingGrpIndex] = groupPayload;
      } else {
        inst.groups.push(groupPayload);
      }
      await inst.save();

      // Bidirectional Synchronization:
      // 1. Update TeacherProfile assignedStudentIds
      const teacherObjId = mongoose.Types.ObjectId.isValid(facultyUserId)
        ? new mongoose.Types.ObjectId(facultyUserId)
        : facultyUserId;

      const teacherProf = await TeacherProfile.findOne({
        $or: [{ userId: facultyUserId }, { userId: teacherObjId }, { _id: facultyUserId }],
      });

      if (teacherProf) {
        // Merge newly selected students with existing assigned students
        const currentAssigned = (teacherProf.assignedStudentIds || []).map((s: any) => (s._id || s).toString());
        const mergedSet = new Set([...currentAssigned, ...selectedStudentIds]);
        teacherProf.assignedStudentIds = Array.from(mergedSet).map((id) => new mongoose.Types.ObjectId(id)) as any;
        await teacherProf.save();
      }

      // 2. Update StudentProfile assignedTeacherIds for all students in this group
      if (selectedStudentIds.length > 0) {
        await StudentProfile.updateMany(
          { userId: { $in: selectedStudentIds } },
          { $addToSet: { assignedTeacherIds: new mongoose.Types.ObjectId(facultyUserId) } }
        );
      }

      await recordAuditLog({
        actorId: session.userId,
        action: "ADMIN_INSTITUTION_GROUP_SAVED",
        entityType: "INSTITUTION",
        entityId: institutionId,
        details: { groupName, classLevel, facultyUserId, studentCount: selectedStudentIds.length },
      });

      return NextResponse.json({
        success: true,
        message: `Group "${groupName}" saved successfully! Faculty allocated to ${selectedStudentIds.length} students.`,
        group: groupPayload,
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 5. DELETE GROUP
    // ──────────────────────────────────────────────────────────────────────────
    if (action === "DELETE_GROUP") {
      const { institutionId, groupId } = body;
      if (!institutionId || !groupId) {
        return NextResponse.json({ error: "Institution ID and Group ID are required." }, { status: 400 });
      }

      const inst = await Institution.findById(institutionId);
      if (!inst) {
        return NextResponse.json({ error: "Institution not found." }, { status: 404 });
      }

      inst.groups = (inst.groups || []).filter((g: any) => g.groupId !== groupId);
      await inst.save();

      return NextResponse.json({
        success: true,
        message: "Group removed from institution.",
      });
    }

    return NextResponse.json({ error: "Unknown action specified." }, { status: 400 });
  } catch (error: any) {
    console.error("Admin Institutions POST Error:", error);
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
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Institution ID is required." }, { status: 400 });
    }

    await connectToDatabase();
    const inst = await Institution.findByIdAndDelete(id);
    if (!inst) {
      return NextResponse.json({ error: "Institution not found." }, { status: 404 });
    }

    await recordAuditLog({
      actorId: session.userId,
      action: "ADMIN_INSTITUTION_DELETED",
      entityType: "INSTITUTION",
      entityId: id,
      details: { name: inst.name },
    });

    return NextResponse.json({
      success: true,
      message: `Institution "${inst.name}" deleted.`,
    });
  } catch (error: any) {
    console.error("Admin Institutions DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
