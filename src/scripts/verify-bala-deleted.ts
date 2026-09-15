/**
 * Script to verify "bala" accounts are deleted and list all remaining users.
 */

import connectToDatabase from "@/lib/db/mongoose";
import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";
import TeacherProfile from "@/models/TeacherProfile";

async function verifyDeletion() {
  await connectToDatabase();
  console.log("🔌 Connected to MongoDB Atlas\n");

  // Check for any "bala" users
  const balaUsers = await User.find({ name: { $regex: /bala/i } });
  const balaStudentProfiles = await StudentProfile.find({}).populate("userId");
  const balaTeacherProfiles = await TeacherProfile.find({}).populate("userId");

  if (balaUsers.length === 0) {
    console.log("✅ No users named 'bala' found in the database. Already clean!\n");
  } else {
    console.log(`⚠️  Found ${balaUsers.length} user(s) named 'bala':`);
    for (const u of balaUsers) {
      console.log(`   • ${u.name} | ${u.email} | ${u.role}`);
    }
    console.log("");
  }

  // List all remaining users
  const allUsers = await User.find({}).select("name email role status").lean();
  console.log(`📋 All users currently in the database (${allUsers.length} total):\n`);
  console.log("   Name                          | Email                          | Role      | Status");
  console.log("   " + "-".repeat(95));
  for (const u of allUsers) {
    const name = (u.name || "").padEnd(30);
    const email = (u.email || "").padEnd(30);
    const role = (u.role || "").padEnd(10);
    console.log(`   ${name}| ${email} | ${role}| ${u.status}`);
  }

  console.log("\n📋 Student Profiles:");
  const students = await StudentProfile.find({}).populate("userId", "name email").lean();
  for (const s of students) {
    const user = s.userId as any;
    console.log(`   • ${user?.name || "ORPHANED"} (${user?.email || "N/A"}) — ${s.currentClass} — ${s.schoolName}`);
  }

  console.log("\n📋 Teacher Profiles:");
  const teachers = await TeacherProfile.find({}).populate("userId", "name email").lean();
  for (const t of teachers) {
    const user = t.userId as any;
    console.log(`   • ${user?.name || "ORPHANED"} (${user?.email || "N/A"}) — ${t.specialization}`);
  }

  process.exit(0);
}

verifyDeletion().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
