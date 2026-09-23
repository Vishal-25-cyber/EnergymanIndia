import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import Assignment from "@/models/Assignment";
import AssignmentSubmission from "@/models/AssignmentSubmission";
import User from "@/models/User";
import Notification from "@/models/Notification";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized access. Please login as a student." }, { status: 401 });
    }

    const { assignmentId, reason = "" } = await req.json();
    if (!assignmentId) {
      return NextResponse.json({ error: "Assignment ID is required." }, { status: 400 });
    }

    await connectToDatabase();

    const [assignment, student] = await Promise.all([
      Assignment.findById(assignmentId),
      User.findById(session.userId),
    ]);

    if (!assignment) {
      return NextResponse.json({ error: "Assignment/Test not found." }, { status: 404 });
    }

    const cleanReason = typeof reason === "string" ? reason.trim() : "";

    // Find or create submission record with retestRequested and explanation
    const submission = await AssignmentSubmission.findOneAndUpdate(
      {
        assignmentId: mongoose.Types.ObjectId.isValid(assignmentId)
          ? new mongoose.Types.ObjectId(assignmentId)
          : assignmentId,
        studentId: mongoose.Types.ObjectId.isValid(session.userId)
          ? new mongoose.Types.ObjectId(session.userId)
          : session.userId,
      },
      {
        $set: {
          retestRequested: true,
          retestRequestedAt: new Date(),
          retestReason: cleanReason || "Student requested permission to retake the test.",
          retestStatus: "REQUESTED",
          retestPermitted: false,
          retestDecisionNote: "",
        },
      },
      { upsert: true, new: true }
    );

    // Notify Teacher with student's explanation
    const reasonExcerpt = cleanReason ? ` Reason: "${cleanReason.slice(0, 120)}"` : "";
    if (assignment.teacherId) {
      await Notification.create({
        userId: assignment.teacherId,
        title: "Retest Requested by Student",
        message: `${student?.name || "A student"} requested permission to retake proctored test "${assignment.title}".${reasonExcerpt}`,
        type: "TEST",
        linkUrl: "/teacher/assignments",
      });
    } else {
      const teachers = await User.find({ role: { $in: ["TEACHER", "ADMIN"] } }).limit(5);
      for (const t of teachers) {
        await Notification.create({
          userId: t._id,
          title: "Retest Requested by Student",
          message: `${student?.name || "A student"} requested permission to retake proctored test "${assignment.title}".${reasonExcerpt}`,
          type: "TEST",
          linkUrl: "/teacher/assignments",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Retest request sent to faculty. You will be notified once approved.",
      submission,
    });
  } catch (error: any) {
    console.error("Request retest error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit retest request" }, { status: 500 });
  }
}
