import React from 'react';
import { AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';

export const TransparencyNotice: React.FC = () => {
  return (
    <section id="transparency" className="py-12 bg-amber-50/80 border-y border-amber-200/90 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300/80 shadow-sm space-y-5">
          {/* Header */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
                MANDATORY DISCLOSURE & ADMISSION GUIDANCE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-amber-950">
                Important Notice — Institute Status & Certificate Transparency
              </h3>
            </div>
          </div>

          {/* Primary Statement */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            "{INSTITUTE_CONFIG.name} is presented as a private technical training institute. Government recognition, affiliation, accreditation, or authorization to issue government certificates should not be assumed unless valid supporting documentation is provided. Course certificates, where offered, must be described accurately according to their actual issuing authority and status. Students should verify certificate acceptance and course recognition with the relevant authority before enrolling."
          </div>

          {/* Detailed Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-700 pt-1">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
              <span>
                <strong>Private Vocational Status: </strong>
                All certificates issued are private vocational completion records based on attendance, practical workshops, and syllabus completion.
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
              <span>
                <strong>No Automatic Recognition: </strong>
                The institute does not claim statutory affiliation with State Boards, Central Boards, UGC, NCVT, or AICTE unless explicitly documented.
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
              <span>
                <strong>Employer Acceptance: </strong>
                Certificate evaluation, credit transfer, or vocational recognition depends solely on the hiring company or receiving institution.
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
              <span>
                <strong>Verification Support: </strong>
                All issued credentials feature an online verification ID for legitimate candidate record lookups.
              </span>
            </div>
          </div>

          {/* Central Address Location Reminder */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500">
            <span>
              Campus Office: <strong>{INSTITUTE_CONFIG.address}</strong>
            </span>
            <span className="text-[#145da0] font-semibold">
              Estd. {INSTITUTE_CONFIG.estdYear} · {INSTITUTE_CONFIG.businessType}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
