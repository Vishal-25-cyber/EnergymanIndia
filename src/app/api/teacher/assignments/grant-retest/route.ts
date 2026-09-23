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
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized. Teacher role required." }, { status: 401 });
    }

    const { submissionId, assignmentId, studentId, action = "APPROVE", note = "" } = await req.json();

    if (!submissionId && (!assignmentId || !studentId)) {
      return NextResponse.json(
        { error: "submissionId or both assignmentId and studentId are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const query: any = submissionId
      ? { _id: mongoose.Types.ObjectId.isValid(submissionId) ? new mongoose.Types.ObjectId(submissionId) : submissionId }
      : {
          assignmentId: mongoose.Types.ObjectId.isValid(assignmentId) ? new mongoose.Types.ObjectId(assignmentId) : assignmentId,
          studentId: mongoose.Types.ObjectId.isValid(studentId) ? new mongoose.Types.ObjectId(studentId) : studentId,
        };

    const submission = await AssignmentSubmission.findOne(query).populate("assignmentId");

    if (!submission) {
      return NextResponse.json({ error: "Submission record not found." }, { status: 404 });
    }

    const asgTitle = (submission.assignmentId as any)?.title || "Proctored Test";
    const cleanNote = typeof note === "string" ? note.trim() : "";

    if (action === "REJECT") {
      submission.retestPermitted = false;
      submission.retestRequested = false;
      submission.retestStatus = "REJECTED";
      submission.retestDecisionNote = cleanNote || "Retest request declined by faculty.";
      submission.retestRejectedAt = new Date();
      await submission.save();

      // Notify Student with explicit decline reason
      await Notification.create({
        userId: submission.studentId,
        title: "Retest Request Declined",
        message: `Your retest request for "${asgTitle}" was declined by faculty.${cleanNote ? ` Reason: "${cleanNote}"` : ""}`,
        type: "TEST",
        linkUrl: "/student/assignments",
      });

      return NextResponse.json({
        success: true,
        message: `Retest request for "${asgTitle}" was declined with reason: "${submission.retestDecisionNote}". Student has been notified.`,
        submission: {
          _id: submission._id.toString(),
          retestPermitted: false,
          retestStatus: "REJECTED",
          retestDecisionNote: submission.retestDecisionNote,
          status: submission.status,
        },
      });
    }

    // Default: APPROVE
    submission.retestPermitted = true;
    submission.retestRequested = false;
    submission.retestStatus = "APPROVED";
    submission.retestDecisionNote = cleanNote || "Retest approved by faculty. You may now retake the test.";
    submission.retestGrantedBy = (session.userId && mongoose.Types.ObjectId.isValid(session.userId)
      ? new mongoose.Types.ObjectId(session.userId)
      : session.userId) as any;
    submission.retestGrantedAt = new Date();
    submission.violationCount = 0;
    submission.isDisqualified = false;
    submission.disqualifiedReason = "Retest permission granted by faculty.";
    submission.status = "PENDING";
    await submission.save();

    // Notify Student with explicit approval note
    await Notification.create({
      userId: submission.studentId,
      title: "Retest Permission Granted",
      message: `Your faculty has approved your retest request for "${asgTitle}".${cleanNote ? ` Note: "${cleanNote}".` : ""} You can now start your retest.`,
      type: "TEST",
      linkUrl: "/student/assignments",
    });

    return NextResponse.json({
      success: true,
      message: `Retest permission granted for "${asgTitle}". Student has been notified.`,
      submission: {
        _id: submission._id.toString(),
        retestPermitted: true,
        retestStatus: "APPROVED",
        retestDecisionNote: submission.retestDecisionNote,
        isDisqualified: false,
        status: submission.status,
      },
    });
  } catch (error: any) {
    console.error("Grant Retest API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process retest decision" }, { status: 500 });
  }
}
