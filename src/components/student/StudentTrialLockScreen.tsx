"use client";

import React from "react";
import Link from "next/link";
import {
  Lock,
  MessageCircle,
  CreditCard,
  Clock,
  Check,
} from "lucide-react";

interface StudentTrialLockScreenProps {
  studentName?: string;
  studentClass?: string;
  studentId?: string;
  trialEndsAt?: string | Date;
  pendingVerification?: boolean;
  transactionId?: string;
  amount?: number;
}

export function StudentTrialLockScreen({
  studentName = "Student",
  studentClass = "Class 10",
  studentId,
  trialEndsAt,
  pendingVerification = false,
  transactionId,
  amount = 1999,
}: StudentTrialLockScreenProps) {
  const formattedEndDate = trialEndsAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(trialEndsAt))
    : "Concluded";

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200 select-none">
      {/* ── 1. HEADER & NOTICE (CARDLESS, CLEAN WHITE BACKGROUND) ── */}
      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
            <Lock className="w-3 h-3 shrink-0" />
            <span>{pendingVerification ? "Verification Pending" : "Access Restricted"}</span>
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {studentName} ({studentClass})
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {pendingVerification
              ? "Payment Submitted — Pending Admin Verification"
              : "2-Day Free Trial Concluded"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-2xl">
            {pendingVerification
              ? `Your payment reference has been recorded for ${studentName} (${studentClass}). The academic administration is verifying your transaction. All live classes, notes, and study dashboards will unlock automatically once approved.`
              : `Your 48-hour free trial preview for ${studentName} (${studentClass}) has officially ended. Complete your monthly tuition payment to unlock full access to live classes, chapter notes, assignments, and study materials.`}
          </p>
        </div>
      </div>

      {/* ── 2. ACCOUNT STATUS INFO (CARDLESS METADATA ROW) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Account Status
          </span>
          <p className="font-bold text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{pendingVerification ? "Under Admin Review" : "Trial Concluded"}</span>
          </p>
        </div>

        <div className="space-y-1 sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {pendingVerification ? "Reference UTR" : "Concluded On"}
          </span>
          <p className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
            {pendingVerification ? transactionId || "Submitted UTR" : formattedEndDate}
          </p>
        </div>

        <div className="space-y-1 sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Monthly Tuition Fee
          </span>
          <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
            ₹{amount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ month</span>
          </p>
        </div>
      </div>

      {/* ── 3. WHAT UNLOCKS (CARDLESS DIVIDER LIST) ── */}
      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Features Included With Tuition Pass
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Live Interactive WebRTC Classes
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daily sessions with audio/video participation and live doubt resolution.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Complete Syllabus Notes &amp; Handbooks
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Full NCERT chapter notes, solved formula books and downloadable PDFs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Teacher Assignment Evaluation &amp; Tests
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Submit homework and practice exams with personalized faculty feedback.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Official Receipts &amp; Attendance Records
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Downloadable GST fee receipts, attendance tracking and parent report view.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. ACTIONS & CONTACT ── */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/student/fees"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#002137] hover:bg-[#003659] dark:bg-slate-100 dark:hover:bg-white text-white dark:text-[#002137] font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>
              {pendingVerification
                ? "View Payment Verification Status →"
                : "Proceed to Tuition Fees & Founder QR →"}
            </span>
          </Link>

          <a
            href={`https://wa.me/916381180488?text=${encodeURIComponent(
              `Hello Mantif Academic Admin, my name is ${studentName} (${studentClass}). I have a query regarding fee payment/verification of ₹${amount}${
                transactionId ? ` with UTR ${transactionId}` : ""
              }. Kindly assist.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Contact Academic Admin</span>
          </a>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
          {pendingVerification
            ? "Your payment is under review. The dashboard will automatically unlock upon approval — no need to refresh."
            : "Already paid via UPI / Netbanking? Submit your 12-digit UTR on the Tuition Fees page to unlock immediately."}
        </p>
      </div>
    </div>
  );
}

export default StudentTrialLockScreen;
