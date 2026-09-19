"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  GraduationCap,
  Sparkles,
  Code2,
  Brain,
  Film,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useSearchParams } from "@/lib/router-compat-nav";

const AVAILABLE_ROLES = [
  {
    title: "Full Stack Developer",
    type: "Internship",
    dept: "Engineering & Platform",
    icon: Code2,
  },
  {
    title: "AI Developer",
    type: "Internship",
    dept: "Artificial Intelligence & R&D",
    icon: Brain,
  },
  {
    title: "Academic Tutors",
    type: "Internship / Faculty Specialist",
    dept: "Academics & Pedagogy",
    icon: GraduationCap,
  },
  {
    title: "Video & Content Editors",
    type: "Internship",
    dept: "Media & Creative Production",
    icon: Film,
  },
  {
    title: "Digital Marketing Specialist",
    type: "Internship",
    dept: "Growth & Community",
    icon: TrendingUp,
  },
  {
    title: "General / Other Internship",
    type: "Internship",
    dept: "Cross-Functional",
    icon: Sparkles,
  },
];

export default function CareerApplyPage() {
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") || "";

  const [role, setRole] = useState("Full Stack Developer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (initialRoleParam) {
      const match = AVAILABLE_ROLES.find(
        (r) => r.title.toLowerCase() === initialRoleParam.toLowerCase()
      );
      if (match) {
        setRole(match.title);
      } else {
        setRole(initialRoleParam);
      }
    }
  }, [initialRoleParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!portfolio.trim()) {
      setErrorMsg("Please provide a resume, GitHub, LinkedIn, or portfolio link.");
      return;
    }

    setLoading(true);

    const mailSubject = `Career Application: ${role} - ${name.trim()}`;
    const mailBody =
      `Dear MANTIF Team,\n\n` +
      `I am applying for the ${role} (Internship) position at MANTIF.\n\n` +
      `Applicant Information:\n` +
      `- Full Name: ${name.trim()}\n` +
      `- Email: ${email.trim()}\n` +
      `- Mobile / WhatsApp: ${phone.trim()}\n` +
      `- College, Degree & Year: ${qualification.trim() || "Not specified"}\n` +
      `- Resume / Portfolio / GitHub Link: ${portfolio.trim()}\n\n` +
      `Candidate Pitch & Experience:\n` +
      `${message.trim() || "No additional comments provided."}\n\n` +
      `Best regards,\n${name.trim()}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          classLevel: qualification.trim() || role,
          subject: mailSubject,
          message: mailBody,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to submit application. Please try again or contact info@mantif.com.");
        return;
      }

      // Submission recorded in database. Also trigger client-side FormSubmit relay to info@mantif.com
      try {
        fetch("https://formsubmit.co/ajax/info@mantif.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: mailSubject,
            _replyto: email.trim(),
            Candidate_Name: name.trim(),
            Email_Address: email.trim(),
            Phone_WhatsApp: phone.trim(),
            Applied_Role: role,
            Degree_College: qualification.trim() || "Not specified",
            Resume_Portfolio_Link: portfolio.trim(),
            Message_Pitch: message.trim() || "None",
            _template: "table",
          }),
        }).catch((err) => console.warn("[Client FormSubmit relay]", err));
      } catch (err) {
        // non-blocking
      }

      setSuccessMsg(
        `Your application for ${role} has been submitted successfully! We have received your application at info@mantif.com.`
      );
      setName("");
      setEmail("");
      setPhone("");
      setQualification("");
      setPortfolio("");
      setMessage("");
    } catch {
      setErrorMsg("Unable to connect to server. Please try again or reach out to info@mantif.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 flex flex-col justify-between">
      {/* ── Top Header Navigation Bar ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/#careers"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#002137] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Careers</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-black tracking-wider text-[#002137]">
              MANTIF
            </span>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#004b79] border border-blue-200">
              Careers Portal
            </span>
          </Link>

          <a
            href="mailto:info@mantif.com"
            className="text-xs font-bold text-[#8c6924] hover:underline flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">info@mantif.com</span>
          </a>
        </div>
      </header>

      {/* ── Main Application Content ── */}
      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          
          {/* Page Title & Intro */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002137]/5 border border-[#002137]/15 text-[#002137] text-xs font-black uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-[#8c6924]" />
              <span>Career &amp; Internship Application</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002137] tracking-tight">
              Join an Ambitious, Mission-Driven Team
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
              Join and build your skills on your own through real-world hands-on experience, collaborative learning, and impactful EdTech challenges.
            </p>
          </div>

          {/* Form Container Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl p-6 sm:p-8 lg:p-10 space-y-6">
            
            {/* Header of Form */}
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#002137]">
                  Submit Your Application
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Submissions are received directly at <strong className="text-[#002137]">info@mantif.com</strong>.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold self-start sm:self-auto">
                <Send className="w-3 h-3 text-[#004b79]" />
                <span>Instant Delivery</span>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Confirmation Card */}
            {successMsg ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-950 space-y-4 text-left animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-emerald-900">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                      Received at <strong>info@mantif.com</strong> and recorded in our admissions system.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed font-normal">
                  Thank you for applying to MANTIF. Our team will evaluate your portfolio and reach out to you via WhatsApp or Email regarding the interview discussion.
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSuccessMsg("")}
                    className="px-5 py-2.5 rounded-xl bg-[#002137] hover:bg-[#004b79] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Another Application
                  </button>
                  <Link
                    to="/"
                    className="px-5 py-2.5 rounded-xl border border-emerald-300 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Position / Role Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Position / Role Applying For <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#004b79] focus:ring-2 focus:ring-[#004b79]/20 outline-none text-xs sm:text-sm font-bold bg-white text-slate-900 cursor-pointer transition-all shadow-2xs"
                  >
                    {AVAILABLE_ROLES.map((r) => (
                      <option key={r.title} value={r.title}>
                        {r.title} ({r.type} - {r.dept})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Kumar"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#004b79] focus:ring-2 focus:ring-[#004b79]/20 outline-none text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. anand@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#004b79] focus:ring-2 focus:ring-[#004b79]/20 outline-none text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Phone & College/Degree */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      10-Digit Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#004b79] focus:ring-2 focus:ring-[#004b79]/20 outline-none text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      College, Degree &amp; Year of Study
                    </label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      placeholder="e.g. B.Tech Computer Science (3rd Year) / B.Sc"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#004b79] focus:ring-2 focus:ring-[#004b79]/20 outline-none text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Portfolio / Resume Link */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Resume Link / GitHub / Portfolio / LinkedIn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://drive.google.com/... or https://github.com/... or LinkedIn URL"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#004b79] focus:ring-2 focus:ring-[#004b79]/20 outline-none text-xs sm:text-sm font-medium transition-all"
                  />
                  <p className="text-[11px] text-slate-400 font-medium">
                    Ensure Google Drive files are set to &ldquo;Anyone with link can view&rdquo;.
                  </p>
                </div>

                {/* Pitch / Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Brief Pitch &amp; Relevant Experience (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you have built, your key strengths, or why you want to build at MANTIF..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#004b79] focus:ring-2 focus:ring-[#004b79]/20 outline-none text-xs sm:text-sm font-medium resize-none transition-all"
                  />
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8c6924]" />
                    <span>Delivers in real-time to info@mantif.com</span>
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#002137] hover:bg-[#004b79] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#000f1c] text-white border-t border-white/10 py-6 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} MANTIF Education. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="mailto:info@mantif.com" className="hover:text-white transition-colors">
              info@mantif.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
