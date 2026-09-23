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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { assignmentId, violationCount = 3, proctoringSnapshotUrl = "" } = await req.json();

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

    const targetAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId)
      ? new mongoose.Types.ObjectId(assignmentId)
      : assignmentId;
    const targetStudentId = mongoose.Types.ObjectId.isValid(session.userId)
      ? new mongoose.Types.ObjectId(session.userId)
      : session.userId;

    // Upsert the disqualified submission
    const submission = await AssignmentSubmission.findOneAndUpdate(
      { assignmentId: targetAssignmentId, studentId: targetStudentId },
      {
        $set: {
          type: "TEST",
          violationCount: Math.max(3, violationCount),
          isDisqualified: true,
          disqualifiedReason: "Terminated: 3 Proctoring Violations reached.",
          retestPermitted: false,
          retestRequested: false,
          status: "DISQUALIFIED",
          proctoringSnapshotUrl: proctoringSnapshotUrl || "",
          submittedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    // Notify Teacher
    if (assignment.teacherId) {
      await Notification.create({
        userId: assignment.teacherId,
        title: "Proctoring Violation: Test Terminated",
        message: `${student?.name || "Student"} was automatically disqualified from "${assignment.title}" after reaching 3 proctoring violations. Teacher permission is required to allow a retest.`,
        type: "TEST",
        linkUrl: "/teacher/assignments",
      });
    }

    // Notify Student
    await Notification.create({
      userId: session.userId,
      title: "Test Terminated: 3 Proctoring Violations",
      message: `Your proctored test "${assignment.title}" has been closed due to reaching 3 proctoring violations. You cannot retake this test until your teacher grants permission.`,
      type: "TEST",
      linkUrl: "/student/assignments",
    });

    return NextResponse.json({
      success: true,
      message: "Proctored test terminated due to 3 warnings. Retest locked pending teacher approval.",
      submission: {
        _id: submission._id.toString(),
        isDisqualified: true,
        retestPermitted: false,
        violationCount: submission.violationCount,
      },
    });
  } catch (error: any) {
    console.error("Violation Termination API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process termination" }, { status: 500 });
  }
}
