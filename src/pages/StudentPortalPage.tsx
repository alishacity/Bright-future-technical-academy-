import React from 'react';
import { ArrowLeft, Award, BookOpen, CheckCircle2, ChevronRight, FileText, IdCard, Lock, LogOut, ShieldAlert, ShieldCheck, User } from 'lucide-react';
import { StudentUser } from '../types/auth';
import { StudentApplication, CertificateRecord } from '../types';
import { InstituteLogo } from '../components/InstituteLogo';
import { formatINR } from '../data/coursesData';

interface StudentPortalPageProps {
  user: StudentUser;
  onLogout: () => void;
  onNavigateToHome: () => void;
  onNavigateToApply: () => void;
  onViewCertificate: () => void;
  application: StudentApplication;
}

export const StudentPortalPage: React.FC<StudentPortalPageProps> = ({
  user,
  onLogout,
  onNavigateToHome,
  onNavigateToApply,
  onViewCertificate,
  application
}) => {
  const isPaymentPending = application.paymentStatus !== 'Verified Paid';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-[#c99b2e]/20 selection:text-[#0a2240]">
      {/* Portal Top Navigation Header */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8 shadow-xs sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onNavigateToHome}
            className="flex items-center gap-2 cursor-pointer text-left shrink-0"
          >
            <InstituteLogo size="sm" />
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0a2240] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-lg border border-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Portal Dashboard Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Greeting Banner */}
        <div className="bg-gradient-to-r from-[#0a2240] via-[#0f3d6c] to-[#145da0] text-white rounded-3xl p-6 sm:p-8 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5c46d] bg-white/10 px-3 py-1 rounded-full border border-[#c99b2e]/40 inline-block">
                STUDENT ACADEMIC PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-title">
                Welcome back, {user.fullName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                Registered Student Account: <span className="text-white font-mono">{user.email}</span> · Student ID: <span className="text-[#e5c46d] font-mono font-bold">{user.id}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onViewCertificate}
                className="px-4 py-2.5 text-xs font-bold text-[#0a2240] bg-[#e5c46d] hover:bg-white rounded-xl transition-colors shadow-sm cursor-pointer flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-[#0a2240]" />
                <span>View My Certificate Sheet</span>
              </button>
              <button
                type="button"
                onClick={onNavigateToApply}
                className="px-4 py-2.5 text-xs font-bold text-white bg-white/15 hover:bg-white/25 rounded-xl border border-white/30 transition-colors cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#e5c46d]" />
                <span>Apply for Courses</span>
              </button>
            </div>
          </div>
        </div>

        {/* Protected Student Records Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Student Profile Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#145da0] flex items-center justify-center font-bold">
                <User className="w-5 h-5 text-[#0a2240]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0a2240]">Student Profile</h3>
                <span className="text-[10.5px] text-slate-500">Private account information</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name</span>
                <strong className="text-slate-900">{user.fullName}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Account Email</span>
                <span className="text-slate-700 font-mono text-[11px]">{user.email}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Student Member ID</span>
                <span className="font-mono text-[#145da0] font-bold">{user.id}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Registration Date</span>
                <span className="text-slate-700">{user.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Active Admission Application */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#c99b2e] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5 text-[#0a2240]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0a2240]">Active Admission Record</h3>
                  <span className="text-[10.5px] text-slate-500">Ref: {application.applicationId}</span>
                </div>
              </div>

              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                isPaymentPending
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}>
                {isPaymentPending ? 'Payment Pending (Sample Preview)' : 'Verified Paid (Official Credential)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Course Name</span>
                <strong className="text-slate-900 block mt-0.5">{application.courseName}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Batch Schedule</span>
                <span className="text-slate-700 block mt-0.5">{application.preferredBatch}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Admission Fee</span>
                <strong className="text-emerald-700 font-bold block mt-0.5">{formatINR(application.feePayable)}</strong>
              </div>
            </div>

            {/* Status explanation */}
            <div className="text-xs pt-1">
              {isPaymentPending ? (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 flex items-start gap-2.5 text-amber-950">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block">Admission Status: Payment Pending</span>
                    <p className="text-[11px] leading-relaxed text-amber-900/90">
                      Your application has been received with sample certificate preview available. Official certificate ID issuance and unwatermarked PDF download will unlock once institutional fee reconciliation is verified.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/70 flex items-start gap-2.5 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block">Admission Status: Verified & Cleared</span>
                    <p className="text-[11px] leading-relaxed text-emerald-900/90">
                      Your admission fee is verified. Official Certificate ID <strong>{application.certificateId}</strong> has been issued and is available for native Print and PDF download.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onViewCertificate}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Open Certificate Viewer</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#e5c46d]" />
              </button>
            </div>
          </div>
        </div>

        {/* Protection Notice */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-500 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated student records are isolated. You have access only to your own applications and credentials.</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs font-semibold text-slate-600 hover:text-red-700 underline cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} Bright Future Technical Academy · Student Academic Portal
      </footer>
    </div>
  );
};
