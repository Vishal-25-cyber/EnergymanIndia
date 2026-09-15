/**
 * Script to completely wipe all Student and Teacher data from the live MongoDB Atlas database.
 * Leaves only ADMIN users and system configuration (Batches, Subjects, SystemSettings).
 *
 * Run with: npx tsx src/scripts/wipe-atlas-keep-admin-only.ts
 */

import "dotenv/config";
import mongoose from "mongoose";

// Connection string securely read from environment variables (e.g. .env)
const ATLAS_URI: string | undefined = process.env.MONGODB_DIRECT_URI || process.env.MONGODB_URI;

async function wipeDatabase() {
  if (!ATLAS_URI) {
    console.error(
      "❌ Error: MongoDB connection string not found.\nPlease set MONGODB_DIRECT_URI or MONGODB_URI in your .env file or environment variables."
    );
    process.exit(1);
  }

  try {
    console.log("🔌 Connecting to MongoDB Atlas cluster...");
    await mongoose.connect(ATLAS_URI, { serverSelectionTimeoutMS: 15000 });
    console.log("✅ Connected to MongoDB cluster\n");

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection is not available.");
    }

    // Delete all users EXCEPT admins
    const userResult = await db.collection("users").deleteMany({ role: { $ne: "ADMIN" } });
    console.log(`✅ Deleted Non-Admin Users: ${userResult.deletedCount}`);

    // Delete all profiles
    const spResult = await db.collection("studentprofiles").deleteMany({});
    console.log(`✅ Deleted Student Profiles: ${spResult.deletedCount}`);

    const tpResult = await db.collection("teacherprofiles").deleteMany({});
    console.log(`✅ Deleted Teacher Profiles: ${tpResult.deletedCount}`);

    // Delete all related records
    const collectionsToWipe = [
      "attendances",
      "staffattendances",
      "assignments",
      "assignmentsubmissions",
      "livesessions",
      "materials",
      "payments",
      "notifications",
      "announcements",
      "tests",
      "testresults",
      "teacherremarks",
      "parentcommunications",
      "studentreporthistories"
    ];

    for (const name of collectionsToWipe) {
      try {
        const res = await db.collection(name).deleteMany({});
        console.log(`✅ Cleared ${name}: ${res.deletedCount}`);
      } catch (err: any) {
        // ignore if collection doesn't exist
      }
    }

    // Verify remaining users
    const remainingUsers = await db.collection("users").find({}).toArray();
    console.log("\n📋 Remaining Users in MongoDB Atlas:");
    for (const u of remainingUsers) {
      console.log(`   👑 ${u.name} | ${u.email} | Role: ${u.role}`);
    }

    console.log("\n🎉 Database Wipe Complete! Only Admins and System Settings remain.");
  } catch (err: any) {
    console.error("❌ Error during wipe:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

wipeDatabase();
