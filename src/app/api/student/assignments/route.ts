import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth/session";
import StudentProfile from "@/models/StudentProfile";
import Assignment from "@/models/Assignment";
import AssignmentSubmission from "@/models/AssignmentSubmission";

export const dynamic = "force-dynamic";

// In-memory cache for ultra-fast student assignments loading (< 10ms)
interface StudentAssignmentsCacheEntry {
  data: any;
  timestamp: number;
}
const studentAssignmentsCache = new Map<string, StudentAssignmentsCacheEntry>();
const CACHE_TTL_MS = 15000; // 15 seconds TTL

export function invalidateStudentAssignmentsCache(studentId?: string) {
  if (studentId) {
    for (const key of studentAssignmentsCache.keys()) {
      if (key.includes(studentId)) {
        studentAssignmentsCache.delete(key);
      }
    }
  } else {
    studentAssignmentsCache.clear();
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const typeFilter = searchParams.get("type") || "ALL";
    const cacheKey = `${session.userId}:${typeFilter}`;

    const cached = studentAssignmentsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(cached.data, {
        headers: {
          "Cache-Control": "private, max-age=10, stale-while-revalidate=60",
          "X-Cache": "HIT",
        },
      });
    }

    await connectToDatabase();
    const profile = await StudentProfile.findOne({ userId: session.userId }).lean();
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Query real assignments for the student's class or assigned batch
    const orConditions: any[] = [{ classLevel: profile.currentClass }];
    if (profile.batchId) {
      orConditions.push({ batchId: profile.batchId });
    }

    const query: any = { $or: orConditions };
    if (typeFilter && typeFilter !== "ALL") {
      query.type = typeFilter;
    }

    const studentObjId = mongoose.Types.ObjectId.isValid(session.userId)
      ? new mongoose.Types.ObjectId(session.userId)
      : session.userId;

    // Run Assignment.find and AssignmentSubmission.find concurrently
    const [assignments, submissions] = await Promise.all([
      Assignment.find(query)
        .populate("teacherId", "name email avatarUrl")
        .sort({ createdAt: -1 })
        .lean(),
      AssignmentSubmission.find({
        $or: [{ studentId: session.userId }, { studentId: studentObjId }],
      }).lean(),
    ]);

    const submissionMap = new Map(
      submissions.map((s: any) => [s.assignmentId ? s.assignmentId.toString() : "", s])
    );

    const nowMs = Date.now();
    const result = assignments.map((assignment: any) => {
      // Auto-heal tasks created with midnight wraparound bug (due <= created)
      if (assignment.dueDate && assignment.createdAt) {
        const due = new Date(assignment.dueDate);
        const created = new Date(assignment.createdAt);
        if (due.getTime() <= created.getTime()) {
          const healedDue = new Date(Date.now() + 24 * 60 * 60 * 1000);
          healedDue.setHours(23, 59, 59, 0);
          assignment.dueDate = healedDue;
        }
      }

      const submission: any = submissionMap.get(assignment._id.toString());
      let status: "PENDING" | "SUBMITTED" | "EVALUATED" | "OVERDUE" = "PENDING";

      if (submission) {
        status = submission.status || "SUBMITTED";
      } else if (assignment.dueDate && new Date(assignment.dueDate).getTime() < nowMs) {
        status = "OVERDUE";
      }

      return {
        _id: assignment._id.toString(),
        title: assignment.title,
        description: assignment.description,
        subject: assignment.subject,
        classLevel: assignment.classLevel,
        type: assignment.type || "ASSIGNMENT",
        durationMinutes: assignment.durationMinutes || 45,
        proctoringRequired: assignment.proctoringRequired ?? true,
        dueDate: assignment.dueDate,
        maxMarks: assignment.maxMarks || 20,
        attachmentUrl: (() => {
          const rawUrl = (assignment.attachmentUrl || "").trim();
          if (!rawUrl || rawUrl.includes("mantif.edu") || rawUrl.includes("acuity.edu")) {
            return `/api/materials/file/${assignment._id}.pdf`;
          }
          if (rawUrl.startsWith("data:") && rawUrl.length > 2048) {
            return `/api/materials/file/${assignment._id}.pdf`;
          }
          return rawUrl;
        })(),
        attachmentName: assignment.attachmentName || "",
        attachmentSize: assignment.attachmentSize || "",
        teacher: assignment.teacherId,
        submission: submission
          ? {
              _id: submission._id.toString(),
              type: submission.type || assignment.type || "ASSIGNMENT",
              status: submission.status,
              submissionText: submission.submissionText,
              fileUrl: submission.fileUrl,
              proctoringSnapshotUrl: submission.proctoringSnapshotUrl,
              proctoringVideoUrl: submission.proctoringVideoUrl,
              timeTakenMinutes: submission.timeTakenMinutes,
              submittedAt: submission.submittedAt,
              isLate: !!submission.isLate,
              marksObtained: submission.marksObtained,
              feedback: submission.feedback,
              gradedAt: submission.gradedAt,
              isDisqualified: !!submission.isDisqualified,
              disqualifiedReason: submission.disqualifiedReason || "",
              retestPermitted: !!submission.retestPermitted,
              retestRequested: !!submission.retestRequested,
              retestRequestedAt: submission.retestRequestedAt,
              retestReason: submission.retestReason || "",
              retestStatus: submission.retestStatus || "NONE",
              retestDecisionNote: submission.retestDecisionNote || "",
              violationCount: submission.violationCount || 0,
            }
          : null,
        calculatedStatus: status,
      };
    });

    const responseData = {
      assignments: result,
      studentClass: profile.currentClass,
      board: profile.board || "CBSE",
      serverTime: new Date().toISOString(),
      serverTimeMs: nowMs,
      timeZone: "Asia/Kolkata",
      timeZoneLabel: "IST (UTC+05:30)",
    };

    studentAssignmentsCache.set(cacheKey, { data: responseData, timestamp: Date.now() });

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "private, max-age=10, stale-while-revalidate=60",
      },
    });
  } catch (error: any) {
    console.error("Student Assignments Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
