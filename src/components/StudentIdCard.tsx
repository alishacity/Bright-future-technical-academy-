import React from 'react';
import { IdCard, Lock, Printer, QrCode, User } from 'lucide-react';
import { StudentApplication } from '../types';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';
import { InstituteLogo } from './InstituteLogo';

interface StudentIdCardProps {
  application: StudentApplication;
}

export const StudentIdCard: React.FC<StudentIdCardProps> = ({ application }) => {
  const isPaymentPending = application.paymentStatus !== 'Verified Paid';

  const handlePrintIdCard = () => {
    if (isPaymentPending) return;

    document.body.classList.add('print-mode-idcard');
    document.body.classList.remove('print-mode-certificate');
    window.focus();
    try {
      window.print();
    } catch (err) {
      console.warn('ID card print error:', err);
    }
  };

  return (
    <section id="student-id-section" className="py-12 bg-slate-100 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 no-print">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] mb-1">
            <IdCard className="w-3.5 h-3.5 text-[#c99b2e]" />
            <span>OFFICIAL STUDENT IDENTIFICATION</span>
          </div>
          <h3 className="text-2xl font-bold font-serif-title text-[#0a2240]">
            ATM-Size Hanging Student ID Card
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Standard 85.6 × 54 mm card geometry with top lanyard slot, scannable QR verification code, and academy credentials.
          </p>
        </div>

        {/* Card Display Area */}
        <div className="flex flex-col items-center justify-center">
          {/* Card Element */}
          <div
            id="student-id-card"
            className="relative w-[340px] h-[215px] rounded-xl bg-gradient-to-br from-white via-slate-50 to-blue-50 border-2 border-[#c99b2e] shadow-xl overflow-hidden text-slate-900 select-none shrink-0"
            style={{
              boxShadow: '0 12px 30px rgba(10, 34, 64, 0.15)'
            }}
          >
            {/* Top Lanyard Slot Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-slate-200 border-b border-x border-slate-300 rounded-b-md z-30" />

            {/* Background Graphic Corner Waves */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 55%, #0a2240 55%, #145da0 82%, #c99b2e 82%)',
                opacity: 0.96
              }}
            />

            {/* Header: Logo & Title */}
            <div className="relative z-20 flex items-center gap-2 px-3 pt-2.5 pb-1 border-b border-slate-200/60 bg-white/70 backdrop-blur-xs">
              <InstituteLogo size="sm" showText={false} />
              <div className="leading-tight">
                <span className="font-formal font-bold text-[10.5px] text-[#0a2240] block tracking-tight">
                  BRIGHT FUTURE TECHNICAL ACADEMY
                </span>
                <span className="text-[7pt] text-slate-500 font-medium block">
                  Student Identity Card · {INSTITUTE_CONFIG.addressShort}
                </span>
              </div>
            </div>

            {/* Card Body: Photo & Fields */}
            <div className="relative z-20 flex items-start gap-3.5 px-3.5 pt-2">
              {/* Photo Box */}
              <div className="w-16 h-20 bg-slate-200 border-2 border-white rounded-md shadow-xs overflow-hidden flex items-center justify-center shrink-0">
                {application.studentPhoto ? (
                  <img
                    src={application.studentPhoto}
                    alt={application.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-1">
                    <User className="w-6 h-6 text-slate-400" />
                    <span className="text-[7px] font-bold mt-1 text-slate-500">STUDENT</span>
                  </div>
                )}
              </div>

              {/* Data Fields */}
              <div className="space-y-1 text-left flex-1 min-w-0">
                <div>
                  <span className="text-[7px] uppercase font-bold text-slate-500 block leading-none">NAME</span>
                  <span className="text-xs font-bold text-[#0a2240] truncate block">
                    {application.fullName}
                  </span>
                </div>

                <div>
                  <span className="text-[7px] uppercase font-bold text-slate-500 block leading-none">COURSE</span>
                  <span className="text-[9px] font-semibold text-[#145da0] truncate block">
                    {application.courseName}
                  </span>
                </div>

                <div className="flex items-center justify-between pr-3">
                  <div>
                    <span className="text-[7px] uppercase font-bold text-slate-500 block leading-none">STUDENT ID</span>
                    <span className="text-[8.5px] font-mono font-bold text-slate-800 block">
                      {application.certificateId}
                    </span>
                  </div>
                  <div>
                    <span className="text-[7px] uppercase font-bold text-slate-500 block leading-none">ISSUED</span>
                    <span className="text-[8.5px] text-slate-700 block">
                      {application.issueDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code and Footer Bar */}
            <div className="absolute bottom-2 left-3.5 right-3 z-20 flex items-end justify-between">
              <div className="text-[7px] text-slate-600 leading-tight">
                <span>For campus and skill verification use</span>
                <span className="block text-[6.5px] text-slate-400">{INSTITUTE_CONFIG.addressShort}</span>
              </div>

              {/* QR verification icon */}
              <div className="bg-white p-1 rounded-sm border border-slate-300 shadow-2xs flex items-center gap-1">
                <QrCode className="w-5 h-5 text-[#0a2240]" />
              </div>
            </div>

            {/* Sample Watermark for Unverified Payment */}
            {isPaymentPending && (
              <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center rotate-[-22deg]">
                <div className="border-2 border-dashed border-red-600/50 px-4 py-1.5 rounded-lg bg-red-50/25 backdrop-blur-3xs text-center">
                  <span className="text-[10px] font-black tracking-widest text-red-600/60 uppercase block leading-tight">
                    SAMPLE — NOT A VALID ID CARD
                  </span>
                  <span className="text-[7.5px] font-bold tracking-wider text-amber-800/60 uppercase block mt-0.5">
                    PAYMENT PENDING
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="no-print mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrintIdCard}
              disabled={isPaymentPending}
              className={`px-4 py-2 text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors ${
                isPaymentPending
                  ? 'bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed opacity-80'
                  : 'text-[#0a2240] bg-white hover:bg-slate-50 border border-slate-300 cursor-pointer'
              }`}
              title={
                isPaymentPending
                  ? 'Official Student ID Card printing is restricted until server-side payment verification is completed.'
                  : 'Print Student ID Card'
              }
            >
              {isPaymentPending ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Print ID Card (Locked — Payment Pending)</span>
                </>
              ) : (
                <>
                  <Printer className="w-3.5 h-3.5 text-[#c99b2e]" />
                  <span>Print Student ID Card</span>
                </>
              )}
            </button>
          </div>

          {/* Physical ID Card Samples Gallery Reference */}
          <div className="no-print mt-8 w-full max-w-2xl bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <IdCard className="w-4 h-4 text-[#145da0]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a2240]">
                  Actual Issued Physical Student Identity Card
                </h4>
              </div>
              <span className="text-[10px] font-semibold bg-blue-50 text-[#145da0] px-2 py-0.5 rounded-full border border-blue-200">
                Official Academy Credentials
              </span>
            </div>
            
            <p className="text-xs text-slate-500 mb-3">
              All enrolled trainees receive a physical PVC ID card with an official royal blue lanyard upon enrollment verification. Below are photographic records of the academy ID card:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="group relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={INSTITUTE_CONFIG.images.studentIdCardClose}
                    alt="Physical Student Identity Card with Lanyard"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 bg-white border-t border-slate-100">
                  <p className="text-xs font-bold text-[#0a2240]">Physical ID Card & Lanyard</p>
                  <p className="text-[11px] text-slate-500">PVC laminated card with official academy strap</p>
                </div>
              </div>

              <div className="group relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={INSTITUTE_CONFIG.images.studentIdCardDesk}
                    alt="Student ID Card at Training Workstation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 bg-white border-t border-slate-100">
                  <p className="text-xs font-bold text-[#0a2240]">ID Card at Training Desk</p>
                  <p className="text-[11px] text-slate-500">Trainee credential badge at computer editing suite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
