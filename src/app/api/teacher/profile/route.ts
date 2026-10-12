import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTeacherAllocations } from "@/lib/teacher-allocation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || (session.role !== "TEACHER" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allocations = await getTeacherAllocations(session.userId);

    return NextResponse.json(
      {
        ...allocations,
        assignedClasses: allocations.allocatedClasses,
        assignedSubjects: allocations.allocatedSubjects,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/teacher/profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
