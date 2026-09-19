import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import Inquiry from "@/models/Inquiry";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    console.error("[Admin Inquiries API] Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }
    await connectToDatabase();
    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: any) {
    console.error("[Admin Inquiries API] Update error:", error);
    return NextResponse.json({ error: error.message || "Failed to update inquiry" }, { status: 500 });
  }
}
