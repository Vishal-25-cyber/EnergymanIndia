import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import Assignment from "@/models/Assignment";
import AssignmentSubmission from "@/models/AssignmentSubmission";
import StudentProfile from "@/models/StudentProfile";
import Notification from "@/models/Notification";
import TeacherProfile from "@/models/TeacherProfile";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const typeFilter = searchParams.get("type"); // "ASSIGNMENT" | "TEST" | "HOMEWORK" | "ALL"

    let query: any = {};
    if (typeFilter && typeFilter !== "ALL") {
      query.type = typeFilter;
    }

    if (session.role === "TEACHER") {
      const teacherProfile = await TeacherProfile.findOne({ userId: session.userId }).lean();
      const teacherSubjects = teacherProfile?.subjects && teacherProfile.subjects.length > 0
        ? teacherProfile.subjects
        : [];
      const classesTaught = teacherProfile?.classesTaught && teacherProfile.classesTaught.length > 0
        ? teacherProfile.classesTaught
        : [];

      const teacherObjId = mongoose.Types.ObjectId.isValid(session.userId)
        ? new mongoose.Types.ObjectId(session.userId)
        : session.userId;

      const orConditions: any[] = [
        { teacherId: session.userId },
        { teacherId: teacherObjId },
        { teacherId: { $exists: false } },
        { teacherId: null },
      ];

      if (teacherSubjects.length > 0) {
        orConditions.push({ subject: { $in: teacherSubjects } });
      }

      if (classesTaught.length > 0 && teacherSubjects.length > 0) {
        orConditions.push({
          classLevel: { $in: classesTaught },
          subject: { $in: teacherSubjects },
        });
      }

      if (query.type) {
        query = {
          type: query.type,
          $or: orConditions,
        };
      } else {
        query = { $or: orConditions };
      }
    }

    const assignments = await Assignment.find(query)
      .populate("batchId")
      .populate("teacherId", "name email avatarUrl")
      .sort({ createdAt: -1 });

    const assignmentIds = assignments.map((a) => a._id);
    const submissions = await AssignmentSubmission.find({
      $or: [
        { assignmentId: { $in: assignmentIds } },
        { retestRequested: true },
        { retestStatus: "REQUESTED" },
      ],
    })
      .populate("studentId", "name email avatarUrl")
      .populate("assignmentId")
      .sort({ createdAt: -1 });

    const submissionCounts: Record<string, number> = {};
    submissions.forEach((sub: any) => {
      const aId = sub.assignmentId?._id?.toString() || sub.assignmentId?.toString();
      if (aId) {
        submissionCounts[aId] = (submissionCounts[aId] || 0) + 1;
      }
    });

    const enrichedAssignments = assignments.map((asg: any) => {
      const doc = asg.toObject ? asg.toObject() : asg;
      let safeAttachmentUrl = doc.attachmentUrl;
      if (safeAttachmentUrl && safeAttachmentUrl.startsWith("data:") && safeAttachmentUrl.length > 2048) {
        safeAttachmentUrl = `/api/materials/file/${doc._id}`;
      }
      return {
        ...doc,
        attachmentUrl: safeAttachmentUrl,
        type: doc.type || "ASSIGNMENT",
        durationMinutes: doc.durationMinutes || 45,
        proctoringRequired: doc.proctoringRequired ?? true,
        submissionCount: submissionCounts[doc._id.toString()] || 0,
      };
    });

    const nowMs = Date.now();
    return NextResponse.json(
      {
        assignments: enrichedAssignments,
        submissions,
        serverTime: new Date().toISOString(),
        serverTimeMs: nowMs,
        timeZone: "Asia/Kolkata",
        timeZoneLabel: "IST (UTC+05:30)",
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Get Assignments Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      description,
      subject,
      classLevel,
      batchId,
      dueDate,
      maxMarks,
      attachmentUrl,
      attachmentName,
      attachmentSize,
      type,
      durationMinutes,
      proctoringRequired,
      testDate,
    } = await req.json();

    await connectToDatabase();

    let targetBatchId = batchId;
    if (!targetBatchId) {
      const Batch = (await import("@/models/Batch")).default;
      const firstBatch = await Batch.findOne().lean();
      targetBatchId = firstBatch?._id;
    }

    if (!title || !subject || !classLevel) {
      return NextResponse.json({ error: "Please fill all required fields (title, subject, class level)." }, { status: 400 });
    }

    const taskType = type || "ASSIGNMENT";
    let finalDueDate = new Date(Date.now() + 86400000 * 3);
    if (dueDate) {
      const parsed = new Date(dueDate);
      if (!isNaN(parsed.getTime())) {
        finalDueDate = parsed;
      }
    }

    // Safety guard against past dates caused by midnight wraparound
    if (finalDueDate.getTime() <= Date.now()) {
      finalDueDate = new Date(finalDueDate.getTime() + 24 * 60 * 60 * 1000);
      if (finalDueDate.getTime() <= Date.now()) {
        finalDueDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        finalDueDate.setHours(23, 59, 59, 0);
      }
    }

    let finalTestDate: Date | undefined = undefined;
    if (testDate) {
      const parsed = new Date(testDate);
      if (!isNaN(parsed.getTime())) {
        finalTestDate = parsed;
      }
    }
    if (finalTestDate && finalTestDate.getTime() <= Date.now()) {
      finalTestDate = new Date(finalTestDate.getTime() + 24 * 60 * 60 * 1000);
    }

    const resolvedDescription = (description || "").trim() || `${classLevel} ${subject} — ${title.trim()}`;
    const teacherUserId = session.userId || "staff";

    // Fast GridFS storage for base64 attachments so MongoDB document stays tiny and loads in milliseconds
    let permanentAttachmentUrl = attachmentUrl || "";
    if (attachmentUrl && attachmentUrl.startsWith("data:")) {
      try {
        const db = mongoose.connection.db;
        if (db) {
          const { Readable } = await import("stream");
          const commaIdx = attachmentUrl.indexOf(",");
          const header = commaIdx !== -1 ? attachmentUrl.substring(0, commaIdx) : "";
          const base64Data = commaIdx !== -1 ? attachmentUrl.substring(commaIdx + 1).replace(/\s/g, "+") : attachmentUrl.replace(/\s/g, "+");
          let mimeType = "application/pdf";
          const match = header.match(/data:([^;,]+)/);
          if (match && match[1]) mimeType = match[1].toLowerCase();

          const fileBuffer = Buffer.from(base64Data, "base64");
          const cleanFileName = (attachmentName || `${title.toLowerCase().replace(/\s+/g, "_")}.pdf`).replace(/[^a-zA-Z0-9._-]/g, "_");

          const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "materials" });
          const uploadStream = bucket.openUploadStream(cleanFileName, {
            contentType: mimeType,
            metadata: {
              title,
              uploadedBy: teacherUserId,
              originalName: attachmentName,
              createdAt: new Date(),
            },
          });

          await new Promise<void>((resolve, reject) => {
            const readable = Readable.from(fileBuffer);
            readable.pipe(uploadStream).on("finish", () => resolve()).on("error", (err) => reject(err));
          });

          permanentAttachmentUrl = `/api/materials/file/${uploadStream.id.toString()}`;
        }
      } catch (gridErr) {
        console.warn("Could not save to GridFS, keeping fallback:", gridErr);
      }
    }

    const newAssignment = await Assignment.create({
      title: title.trim(),
      description: resolvedDescription,
      subject,
      classLevel,
      batchId: targetBatchId,
      teacherId: teacherUserId,
      type: taskType,
      durationMinutes: taskType === "TEST" ? Number(durationMinutes) || 45 : undefined,
      proctoringRequired: taskType === "TEST" ? (proctoringRequired ?? true) : false,
      testDate: finalTestDate,
      dueDate: finalDueDate,
      maxMarks: Number(maxMarks) || (taskType === "TEST" ? 50 : 20),
      attachmentUrl: permanentAttachmentUrl,
      attachmentName: attachmentName || "",
      attachmentSize: attachmentSize || "",
    });

    // Notify students
    const studentQuery: any = { currentClass: classLevel };
    if (targetBatchId) {
      studentQuery.batchId = targetBatchId;
    }
    const eligibleStudents = await StudentProfile.find(studentQuery);

    if (eligibleStudents.length > 0) {
      try {
        const typeLabel = taskType === "TEST" ? "Timed Proctored Test" : taskType === "HOMEWORK" ? "Daily Homework" : "Assignment";
        const notifs = eligibleStudents.map((st) => ({
          userId: st.userId,
          title: `New ${typeLabel}: ${title.trim()}`,
          message: `Due on ${finalDueDate.toLocaleDateString()}. Subject: ${subject}. Max marks: ${maxMarks || (taskType === "TEST" ? 50 : 20)}.`,
          type: taskType === "TEST" || taskType === "HOMEWORK" || taskType === "ASSIGNMENT" ? taskType : "ASSIGNMENT",
          linkUrl: "/student/assignments",
          read: false,
        }));
        await Notification.insertMany(notifs);
      } catch (notifErr) {
        console.warn("Notification creation warning:", notifErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${taskType === "TEST" ? "Proctored Test" : taskType === "HOMEWORK" ? "Daily Homework" : "Assignment"} created! ${eligibleStudents.length} students notified.`,
      assignment: newAssignment,
    });
  } catch (error: any) {
    console.error("Create Assignment Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { assignmentId, dueDate, testDate } = await req.json();
    if (!assignmentId) {
      return NextResponse.json({ error: "Assignment ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    const updateFields: any = {};
    if (dueDate) updateFields.dueDate = new Date(dueDate);
    if (testDate || dueDate) updateFields.testDate = new Date(testDate || dueDate);

    const updated = await Assignment.findByIdAndUpdate(assignmentId, updateFields, { new: true });
    return NextResponse.json({ success: true, assignment: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const assignmentId = searchParams.get("id");
    if (!assignmentId) {
      return NextResponse.json({ error: "Assignment ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    await Assignment.findByIdAndDelete(assignmentId);
    await AssignmentSubmission.deleteMany({ assignmentId });
    return NextResponse.json({ success: true, message: "Assignment deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
