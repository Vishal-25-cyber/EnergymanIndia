/**
 * Script to delete all users named "bala" and their related data
 * from the database (both student and teacher roles).
 *
 * Run with: npx tsx src/scripts/delete-bala.ts
 */

import connectToDatabase from "@/lib/db/mongoose";
import User from "@/models/User";
import StudentProfile from "@/models/StudentProfile";
import TeacherProfile from "@/models/TeacherProfile";
import Attendance from "@/models/Attendance";
import StaffAttendance from "@/models/StaffAttendance";
import Assignment from "@/models/Assignment";
import AssignmentSubmission from "@/models/AssignmentSubmission";
import LiveSession from "@/models/LiveSession";
import Material from "@/models/Material";
import Payment from "@/models/Payment";
import Notification from "@/models/Notification";
import Announcement from "@/models/Announcement";
import Test from "@/models/Test";
import TestResult from "@/models/TestResult";
import TeacherRemark from "@/models/TeacherRemark";
import ParentCommunication from "@/models/ParentCommunication";
import StudentReportHistory from "@/models/StudentReportHistory";

async function deleteBalaAccounts() {
  await connectToDatabase();
  console.log("🔌 Connected to database");

  // Find all users with name matching "bala" (case-insensitive)
  const balaUsers = await User.find({ name: { $regex: /bala/i } });

  if (balaUsers.length === 0) {
    console.log("⚠️  No users found with the name 'bala'. Nothing to delete.");
    process.exit(0);
  }

  console.log(`\n🔍 Found ${balaUsers.length} user(s) matching "bala":\n`);
  for (const user of balaUsers) {
    console.log(`   • ID: ${user._id} | Name: ${user.name} | Email: ${user.email} | Role: ${user.role} | Status: ${user.status}`);
  }

  const userIds = balaUsers.map((u) => u._id);

  console.log("\n🗑️  Deleting all related data...\n");

  // --- Student-related data (where studentId = userId) ---
  const attResult = await Attendance.deleteMany({ studentId: { $in: userIds } });
  console.log(`   ✅ Attendance records deleted: ${attResult.deletedCount}`);

  const subResult = await AssignmentSubmission.deleteMany({ studentId: { $in: userIds } });
  console.log(`   ✅ Assignment submissions deleted: ${subResult.deletedCount}`);

  const payResult = await Payment.deleteMany({ studentId: { $in: userIds } });
  console.log(`   ✅ Payment records deleted: ${payResult.deletedCount}`);

  const testResResult = await TestResult.deleteMany({ studentId: { $in: userIds } });
  console.log(`   ✅ Test results deleted: ${testResResult.deletedCount}`);

  const remarkResult = await TeacherRemark.deleteMany({ studentId: { $in: userIds } });
  console.log(`   ✅ Teacher remarks (for student) deleted: ${remarkResult.deletedCount}`);

  const parentCommResult = await ParentCommunication.deleteMany({ studentId: { $in: userIds } });
  console.log(`   ✅ Parent communications (for student) deleted: ${parentCommResult.deletedCount}`);

  const reportResult = await StudentReportHistory.deleteMany({ studentId: { $in: userIds } });
  console.log(`   ✅ Student report history deleted: ${reportResult.deletedCount}`);

  // --- Teacher-related data (where teacherId = userId) ---
  const staffAttResult = await StaffAttendance.deleteMany({ teacherId: { $in: userIds } });
  console.log(`   ✅ Staff attendance records deleted: ${staffAttResult.deletedCount}`);

  const assignResult = await Assignment.deleteMany({ teacherId: { $in: userIds } });
  console.log(`   ✅ Assignments (created by teacher) deleted: ${assignResult.deletedCount}`);

  const sessionResult = await LiveSession.deleteMany({ teacherId: { $in: userIds } });
  console.log(`   ✅ Live sessions (by teacher) deleted: ${sessionResult.deletedCount}`);

  const materialResult = await Material.deleteMany({ uploadedBy: { $in: userIds } });
  console.log(`   ✅ Materials (uploaded by teacher) deleted: ${materialResult.deletedCount}`);

  const testResult = await Test.deleteMany({ teacherId: { $in: userIds } });
  console.log(`   ✅ Tests (created by teacher) deleted: ${testResult.deletedCount}`);

  const teacherRemarkResult = await TeacherRemark.deleteMany({ teacherId: { $in: userIds } });
  console.log(`   ✅ Teacher remarks (by teacher) deleted: ${teacherRemarkResult.deletedCount}`);

  const parentCommTeacherResult = await ParentCommunication.deleteMany({ teacherId: { $in: userIds } });
  console.log(`   ✅ Parent communications (by teacher) deleted: ${parentCommTeacherResult.deletedCount}`);

  // --- Generic user-related data (where userId = userId) ---
  const notifResult = await Notification.deleteMany({ userId: { $in: userIds } });
  console.log(`   ✅ Notifications deleted: ${notifResult.deletedCount}`);

  // --- Profiles ---
  const studentProfileResult = await StudentProfile.deleteMany({ userId: { $in: userIds } });
  console.log(`   ✅ Student profiles deleted: ${studentProfileResult.deletedCount}`);

  const teacherProfileResult = await TeacherProfile.deleteMany({ userId: { $in: userIds } });
  console.log(`   ✅ Teacher profiles deleted: ${teacherProfileResult.deletedCount}`);

  // --- Finally delete the User records ---
  const userResult = await User.deleteMany({ _id: { $in: userIds } });
  console.log(`   ✅ User accounts deleted: ${userResult.deletedCount}`);

  console.log("\n🎉 All 'bala' accounts and related data have been successfully deleted!");
  process.exit(0);
}

deleteBalaAccounts().catch((err) => {
  console.error("❌ Error during deletion:", err);
  process.exit(1);
});
