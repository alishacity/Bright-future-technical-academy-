import React from 'react';
import { AlertTriangle, Edit3, Lock, Printer, ShieldAlert, ShieldCheck } from 'lucide-react';
import { StudentApplication } from '../types';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';
import { InstituteLogo } from './InstituteLogo';
import { formatINR } from '../data/coursesData';

interface CertificateViewProps {
  application: StudentApplication;
  onEdit: () => void;
  onOpenVerify: () => void;
  onVerifyPayment: () => void;
  onResetPaymentToPending: () => void;
  onReturnToMyApplication?: () => void;
  activeStudentName?: string;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  application,
  onEdit,
  onOpenVerify,
  onVerifyPayment,
  onResetPaymentToPending,
  onReturnToMyApplication,
  activeStudentName
}) => {
  const isPaymentPending = application.paymentStatus !== 'Verified Paid';

  // Eagerly preload certificate images so they are cached in memory for print dialog
  React.useEffect(() => {
    const badgeImg = new Image();
    badgeImg.src = INSTITUTE_CONFIG.images.awardBadge;
    const sigImg = new Image();
    sigImg.src = INSTITUTE_CONFIG.images.directorSignature;
  }, []);

  // Synchronize global print events (e.g. user pressing Ctrl+P / Cmd+P)
  React.useEffect(() => {
    const handleBeforePrint = () => {
      // Default to certificate print mode unless ID card print was explicitly requested
      if (!document.body.classList.contains('print-mode-idcard')) {
        document.body.classList.add('print-mode-certificate');
      }
    };

    const handleAfterPrint = () => {
      document.body.classList.remove('print-mode-certificate', 'print-mode-idcard');
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const handlePrint = () => {
    // Security restriction: Prevent print invocation if payment is not verified
    if (isPaymentPending) {
      return;
    }

    // 1. Set print mode class specifically for single-page A4 certificate
    document.body.classList.add('print-mode-certificate');
    document.body.classList.remove('print-mode-idcard');

    // 2. Focus window before invoking print dialog
    window.focus();

    // 3. Immediately trigger native browser print dialog while user gesture is active
    try {
      window.print();
    } catch (error) {
      console.warn('Native print dialog invocation notice:', error);
    }
  };

  return (
    <section id="certificate" className="py-16 sm:py-20 bg-slate-200/80 border-b border-slate-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Controls Toolbar (Hidden in Print) */}
        <div className="no-print bg-white rounded-2xl p-4 sm:p-5 mb-6 border border-slate-300 shadow-xs">
          {/* Archive Record Notice if inspecting past historical record */}
          {application.isArchiveRecord && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#0a2240]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[10px] uppercase tracking-wider bg-blue-200/80 text-[#0a2240] px-2 py-0.5 rounded">
                  Historical Archive Record
                </span>
                <span>
                  Viewing archived credential for <strong>{application.fullName}</strong> ({application.certificateId}).
                </span>
              </div>
              {onReturnToMyApplication && activeStudentName && (
                <button
                  type="button"
                  onClick={onReturnToMyApplication}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-lg transition-colors cursor-pointer"
                >
                  Return to My Application ({activeStudentName})
                </button>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  isPaymentPending
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {isPaymentPending ? 'Sample Preview · Payment Pending' : 'Official Credential Issued'}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Ref: {application.applicationId || 'APP-2026-BFTA-DEMO1'}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0a2240] mt-1">
                Candidate:{' '}
                <span className="text-[#0a2240] font-serif-title italic font-bold">
                  {application.fullName}
                </span>
                <span className="text-slate-400 font-normal mx-2">|</span>
                <span className="text-xs font-normal text-slate-600">ID:</span>{' '}
                <span className={`font-mono text-sm ${isPaymentPending ? 'text-amber-700' : 'text-[#c99b2e]'}`}>
                  {isPaymentPending ? 'SAMPLE-PREVIEW (Payment Pending)' : application.certificateId}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Standard A4 Portrait (210 × 297 mm) · {isPaymentPending ? 'Unpaid Sample Watermark (Print Locked)' : 'Official Credential (Print Ready)'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Payment Verification Actions specifically for THIS candidate */}
              {isPaymentPending ? (
                <button
                  type="button"
                  onClick={onVerifyPayment}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title={`Confirm payment verification for candidate "${application.fullName}". Issues authentic certificate ID and unlocks PDF printing.`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Verify Payment for {application.fullName.split(' ')[0] || 'Applicant'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onResetPaymentToPending}
                  className="px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Lock certificate back to Payment Pending state to test unpaid sample watermark"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Lock as Unpaid (Sample Mode)</span>
                </button>
              )}

              <button
                type="button"
                onClick={onEdit}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                <span>Edit Details</span>
              </button>
              <button
                type="button"
                onClick={onOpenVerify}
                className="px-3.5 py-2 text-xs font-semibold text-[#0a2240] bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#145da0]" />
                <span>Verify ID</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                disabled={isPaymentPending}
                className={`px-5 py-2 text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-all ${
                  isPaymentPending
                    ? 'bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed opacity-80'
                    : 'text-white bg-[#0a2240] hover:bg-[#145da0] cursor-pointer'
                }`}
                title={
                  isPaymentPending
                    ? 'Official Certificate Printing & PDF Download are restricted until server-side payment verification is completed.'
                    : `Click to print or save official certificate for ${application.fullName} as PDF`
                }
              >
                {isPaymentPending ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-700" />
                    <span>Print Restricted (Payment Pending)</span>
                  </>
                ) : (
                  <>
                    <Printer className="w-4 h-4 text-[#e5c46d]" />
                    <span>Print / Save as PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Pending & Security Status Notice (Hidden in Print) */}
        {isPaymentPending && (
          <div className="no-print mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 text-xs text-amber-950 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#0a2240]">
                    Application Summary & Payment Security Notice
                  </h4>
                  <span className="font-bold bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] border border-amber-300">
                    STATUS: PAYMENT PENDING
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-y border-amber-200/70 text-[11.5px]">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Candidate:</span>
                    <strong className="text-slate-900">{application.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Course:</span>
                    <strong className="text-slate-900">{application.courseName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Payable Admission Fee:</span>
                    <strong className="text-emerald-700 font-bold">{formatINR(application.feePayable || 4312)}</strong>
                  </div>
                </div>

                <p className="text-[11.5px] text-amber-900/90 leading-relaxed pt-1">
                  <strong>Security Policy:</strong> Online payment gateway integration (Razorpay / Cashfree webhook verification) is not currently connected to this environment. Form submission does <strong>not</strong> authorize final certificate generation or valid credential IDs. Official PDF download and printing remain safely locked until authenticated server-side payment reconciliation is confirmed. The document below is a <strong>Sample Watermark Preview</strong> for data verification only.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Container Wrapper */}
        <div className="certificate-print-wrapper w-full overflow-x-auto flex justify-center pb-6">
          {/* Exact A4 Sheet: 210mm x 297mm */}
          <div
            id="a4-certificate-sheet"
            className="certificate-print-sheet relative bg-white border-[6px] border-[#0a2240] text-slate-900 shadow-2xl overflow-hidden shrink-0"
            style={{
              width: '210mm',
              height: '297mm',
              maxHeight: '297mm',
              padding: '10mm 13mm 9mm',
              boxSizing: 'border-box'
            }}
          >
            {/* Outer Gold Border Inset */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: '3.5mm',
                left: '3.5mm',
                right: '3.5mm',
                bottom: '3.5mm',
                border: '1.5px solid #c99b2e',
                boxShadow: 'inset 0 0 0 1px rgba(201, 155, 46, 0.3)'
              }}
            />

            {/* Subtle Academy-Logo Vector Crest Watermark in Middle */}
            <div
              className="absolute pointer-events-none select-none z-1 flex items-center justify-center"
              style={{
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '130mm',
                height: '130mm',
                opacity: 0.045
              }}
            >
              <svg viewBox="0 0 100 85" className="w-full h-full text-[#0a2240]" fill="currentColor">
                {/* Sun rays */}
                <line x1="50" y1="12" x2="50" y2="4" stroke="#0a2240" strokeWidth="4" strokeLinecap="round" />
                <line x1="62" y1="15" x2="68" y2="9" stroke="#0a2240" strokeWidth="4" strokeLinecap="round" />
                <line x1="38" y1="15" x2="32" y2="9" stroke="#0a2240" strokeWidth="4" strokeLinecap="round" />
                <line x1="72" y1="24" x2="80" y2="20" stroke="#0a2240" strokeWidth="4" strokeLinecap="round" />
                <line x1="28" y1="24" x2="20" y2="20" stroke="#0a2240" strokeWidth="4" strokeLinecap="round" />
                <line x1="78" y1="36" x2="86" y2="35" stroke="#0a2240" strokeWidth="4" strokeLinecap="round" />
                <line x1="22" y1="36" x2="14" y2="35" stroke="#0a2240" strokeWidth="4" strokeLinecap="round" />
                {/* Sun body */}
                <circle cx="50" cy="40" r="18" />
                {/* Book wings */}
                <path d="M 50 56 Q 32 40 10 45 L 14 62 Q 32 57 50 72 Z" />
                <path d="M 50 56 Q 68 40 90 45 L 86 62 Q 68 57 50 72 Z" />
                <path d="M 50 56 L 50 74" stroke="#ffffff" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Prominent SAMPLE Watermark when payment is pending */}
            {isPaymentPending && (
              <div
                className="absolute pointer-events-none select-none z-20 flex flex-col items-center justify-center text-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-32deg)',
                  width: '185mm'
                }}
              >
                <div className="border-4 border-dashed border-red-600/35 px-8 py-3.5 rounded-xl bg-red-50/15 backdrop-blur-3xs">
                  <span className="text-[26pt] font-black tracking-[0.16em] text-red-600/35 uppercase block leading-none font-formal">
                    SAMPLE — NOT A VALID CERTIFICATE
                  </span>
                  <span className="text-[9.5pt] font-bold tracking-[0.22em] text-amber-800/45 uppercase block mt-1.5 font-sans">
                    PAYMENT PENDING · NOT AN OFFICIAL CREDENTIAL
                  </span>
                </div>
              </div>
            )}

            {/* Certificate Inner Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full text-center">
              {/* Header: Logo, Name, Address & Certificate ID */}
              <div>
                {/* Security sample strip on top of sheet when payment is pending */}
                {isPaymentPending && (
                  <div className="bg-amber-500/10 border-b border-amber-500/25 -mx-[13mm] -mt-[10mm] py-1 px-4 mb-2 text-center">
                    <span className="text-[6.5pt] font-bold tracking-widest text-amber-900 uppercase">
                      ⚠️ SAMPLE PREVIEW — NOT AN OFFICIAL CERTIFICATE · ADMISSION PAYMENT PENDING
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pb-2.5 border-b border-[#c99b2e]/50">
                  {/* Brand Mark with rising sun emblem */}
                  <div className="flex items-center gap-2.5 text-left">
                    <InstituteLogo size="sm" showText={false} />
                    <div>
                      <h1 className="font-formal font-bold text-[13.5pt] text-[#0a2240] tracking-wide leading-tight">
                        BRIGHT FUTURE TECHNICAL ACADEMY
                      </h1>
                      <span className="text-[7pt] text-slate-600 block leading-tight">
                        Vocational & Technical Training Centre · Estd. {INSTITUTE_CONFIG.estdYear}
                      </span>
                      <span className="text-[6.2pt] text-slate-500 block">
                        {INSTITUTE_CONFIG.address}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Right */}
                  <div className="text-right text-[6.8pt] text-slate-500 space-y-0.5">
                    <div>
                      <span>CERTIFICATE NO.</span>
                      <strong className={`block font-mono font-bold tracking-wider ${
                        isPaymentPending ? 'text-[7.5pt] text-amber-800' : 'text-[8.5pt] text-[#0a2240]'
                      }`}>
                        {isPaymentPending ? 'SAMPLE-PREVIEW' : application.certificateId}
                      </strong>
                    </div>
                    <div className="text-[7pt] text-slate-600 font-medium">
                      Date of Issue: <strong>{application.issueDate}</strong>
                    </div>
                  </div>
                </div>

                {/* Certificate Title */}
                <div className="mt-[5mm] mb-[1.5mm]">
                  <h2 className="font-formal font-bold text-[25pt] text-[#0a2240] tracking-[0.14em] leading-none">
                    CERTIFICATE
                  </h2>
                  <div className="text-[7.8pt] font-bold tracking-[0.24em] text-[#9e7518] uppercase mt-1">
                    OF COURSE COMPLETION & SKILL DEVELOPMENT
                  </div>
                </div>

                {/* Refined Gold Flourish Header */}
                <div className="flex items-center justify-center gap-3 my-[2.5mm] max-w-[130mm] mx-auto">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c99b2e]/60 to-[#c99b2e]" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#c99b2e] bg-[#c99b2e]/30" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c99b2e]/60 to-[#c99b2e]" />
                </div>

                {/* Recipient Statement */}
                <div className="font-serif-title italic text-[10pt] text-slate-600 mt-[3mm]">
                  This is to certify that
                </div>

                {/* Recipient Student Name */}
                <div className="w-[75%] mx-auto mt-[3mm] pb-[1mm] border-b border-slate-400">
                  <span className="font-serif-title italic font-bold text-[21pt] text-[#0a2240] tracking-wide">
                    {application.fullName}
                  </span>
                </div>

                {/* Course Completion Statement */}
                <div className="font-serif text-[9pt] text-slate-700 max-w-[160mm] mx-auto mt-[3.5mm] leading-relaxed">
                  has successfully completed the prescribed vocational training curriculum and demonstrated practical competencies in
                </div>

                {/* Course Title */}
                <div className="mt-[2.5mm] mb-[2mm]">
                  <div className="font-formal font-bold text-[13pt] text-[#0a2240] tracking-wide">
                    {application.courseName}
                  </div>
                </div>

                {/* Official Navy-Blue & Gold Award Rosette Badge Insignia */}
                <div className="flex items-center justify-center gap-3.5 my-[2mm] max-w-[145mm] mx-auto">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c99b2e]/65 to-[#c99b2e]" />
                  <div className="shrink-0 flex items-center justify-center">
                    <img
                      src={INSTITUTE_CONFIG.images.awardBadge}
                      alt="Bright Future Technical Academy Award Rosette Badge"
                      className="h-[21mm] w-[21mm] object-contain block mx-auto filter drop-shadow-xs"
                      loading="eager"
                    />
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c99b2e]/65 to-[#c99b2e]" />
                </div>

                {/* Achievement Commendation */}
                <div
                  className="max-w-[158mm] mx-auto py-[3mm] px-[6mm] my-[2.5mm] text-[7.8pt] text-slate-800 leading-relaxed rounded-sm"
                  style={{
                    backgroundColor: '#faf8f2',
                    borderLeft: '2.5px solid #c99b2e',
                    borderRight: '2.5px solid #c99b2e',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  {application.achievement}
                </div>

                {/* Skills & Competencies List */}
                <div className="mt-[2mm]">
                  <div className="text-[7pt] font-bold uppercase tracking-wider text-[#0a2240] mb-[1.5mm]">
                    Demonstrated Skills & Technical Competencies
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 max-w-[160mm] mx-auto">
                    {application.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 text-[6.8pt] text-[#0a2240] bg-white border border-[#c99b2e]/60 rounded-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practical Experience */}
                {application.experience && (
                  <div className="text-[7.2pt] text-slate-600 italic mt-[2mm]">
                    Practical Experience: {application.experience}
                  </div>
                )}
              </div>

              {/* Bottom Signatures & Seal Stamp & Statutory Disclaimer */}
              <div className="mt-[3mm]">
                <div className="flex items-end justify-between px-[5mm]">
                  {/* Left Signature: Technical Instructor */}
                  <div className="w-[48mm] text-center">
                    <div className="h-[14mm] flex items-end justify-center pb-1">
                      <span className="font-serif-title italic text-slate-500 text-sm">Instructor Signature</span>
                    </div>
                    <hr className="border-t border-slate-800 my-1" />
                    <span className="text-[7.2pt] font-bold text-slate-800 block">Technical Instructor</span>
                    <span className="text-[6.2pt] text-slate-500 block">Vocational Trade Division</span>
                  </div>

                  {/* Center Official Gold Seal Stamp */}
                  <div
                    className="w-[27mm] h-[27mm] rounded-full border-[3px] border-double border-[#145da0] text-[#145da0] flex flex-col items-center justify-center text-center p-1 select-none shrink-0"
                    style={{
                      transform: 'rotate(-6deg)',
                      boxShadow: 'inset 0 0 0 2px rgba(20, 93, 160, 0.2), 0 2px 6px rgba(20, 93, 160, 0.15)',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    <span className="text-[5.5pt] font-bold tracking-wider">BRIGHT FUTURE</span>
                    <span className="text-[10.5pt] font-black font-formal leading-none">BFTA</span>
                    <span className="text-[5.2pt] font-bold">★ VERIFIED SEAL ★</span>
                    <span className="text-[4.8pt] font-semibold text-[#c99b2e]">ESTD. 2018</span>
                  </div>

                  {/* Right Signature: Director Rahul Kumar (Supplied Handwritten Signature Image) */}
                  <div className="w-[52mm] text-center">
                    <div className="h-[14mm] flex items-end justify-center pb-0.5 relative">
                      <img
                        src={INSTITUTE_CONFIG.images.directorSignature}
                        alt={`Signature of ${INSTITUTE_CONFIG.directorName}`}
                        className="h-[14mm] max-w-[48mm] object-contain block mx-auto filter drop-shadow-xs"
                        loading="eager"
                      />
                    </div>
                    <hr className="border-t border-slate-800 my-1" />
                    <strong className="text-[7.8pt] text-[#0a2240] block font-semibold">{INSTITUTE_CONFIG.directorName}</strong>
                    <span className="text-[6.8pt] text-slate-600 block">Director, {INSTITUTE_CONFIG.name}</span>
                  </div>
                </div>

                {/* Bottom Statutory Institutional Certificate Disclaimer */}
                <div className="text-left max-w-[166mm] mx-auto mt-[3mm] pt-[2mm] border-t border-slate-300/80">
                  <p className="text-[6.2pt] leading-[1.3] text-slate-700 font-sans tracking-tight">
                    <strong className="font-bold text-[#0a2240]">IMPORTANT NOTICE:</strong> This certificate is issued by Bright Future Technical Academy as an institutional certificate only. It is NOT a Government certificate and does not represent certification, recognition, affiliation, or authorization by any Government department or authority. No person may falsely represent or claim this certificate to be a Government-issued certificate. Acceptance and validity for any particular employment, admission, licensing, or official purpose must be confirmed with the relevant authority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
