import React, { useState } from 'react';
import { CheckCircle2, Printer, Search, ShieldAlert, ShieldCheck, X } from 'lucide-react';
import { CertificateRecord } from '../types';

interface VerifyCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  allCertificates: CertificateRecord[];
  onLoadCertificate?: (record: CertificateRecord) => void;
}

export const VerifyCertificateModal: React.FC<VerifyCertificateModalProps> = ({
  isOpen,
  onClose,
  allCertificates,
  onLoadCertificate
}) => {
  const [searchId, setSearchId] = useState<string>('BFTA-2024-CADE-8812');
  const [searchedRecord, setSearchedRecord] = useState<CertificateRecord | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    const match = allCertificates.find((c) => c.id.toUpperCase() === query);
    setSearchedRecord(match || null);
    setHasSearched(true);
  };

  const handleSelectSample = (sampleId: string) => {
    setSearchId(sampleId);
    const match = allCertificates.find((c) => c.id.toUpperCase() === sampleId.toUpperCase());
    setSearchedRecord(match || null);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#145da0]">
              <ShieldCheck className="w-5 h-5 text-[#c99b2e]" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif-title text-[#0a2240]">
                Official Certificate Verification
              </h3>
              <p className="text-xs text-slate-500">
                Verify Bright Future Technical Academy credentials by Certificate ID.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. BFTA-2024-CADE-8812"
              className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#145da0] focus:bg-white"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-lg cursor-pointer transition-colors"
            >
              Verify
            </button>
          </div>

          {/* Quick sample buttons for test evaluation */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
            <span>Sample IDs:</span>
            {allCertificates.slice(0, 3).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectSample(c.id)}
                className="bg-slate-100 hover:bg-slate-200 text-[#0a2240] px-2 py-0.5 rounded font-mono text-[10px] cursor-pointer"
              >
                {c.id}
              </button>
            ))}
          </div>
        </form>

        {/* Verification Result Area */}
        {hasSearched && (
          <div className="space-y-4">
            {searchedRecord ? (
              searchedRecord.status === 'Verified' ? (
                <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Official Record Verified & Authentic</span>
                    </div>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      AUTHENTIC
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name</span>
                      <strong className="text-slate-900 font-semibold">{searchedRecord.studentName}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Course Name</span>
                      <strong className="text-[#145da0] font-semibold">{searchedRecord.courseName}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Certificate Number</span>
                      <span className="font-mono text-slate-800">{searchedRecord.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Issue</span>
                      <span className="text-slate-800">{searchedRecord.issueDate}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="pt-2 border-t border-emerald-200/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Certified Competencies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {searchedRecord.skills.map((s, idx) => (
                        <span key={idx} className="bg-white text-slate-700 text-[10px] px-2 py-0.5 rounded border border-emerald-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 pt-1">
                    Issued by: <strong>Rahul Kumar, Director</strong> · Bright Future Technical Academy
                  </div>

                  {onLoadCertificate && (
                    <button
                      type="button"
                      onClick={() => {
                        onLoadCertificate(searchedRecord);
                        onClose();
                        const certEl = document.getElementById('certificate');
                        certEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full mt-3 py-2 px-3 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#e5c46d]" />
                      <span>Inspect Archived Certificate Sheet ({searchedRecord.studentName})</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 text-xs text-amber-900">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                    <div className="flex items-center gap-2 font-bold text-amber-800">
                      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>Application Pending Payment Verification</span>
                    </div>
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      PAYMENT PENDING
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    Application reference <strong>{searchedRecord.id}</strong> ({searchedRecord.studentName}) has been received, but payment has not yet been verified.
                  </p>
                  <p className="text-[11px] text-amber-800/80">
                    Official certificate generation, verification clearance, and PDF credentials are restricted until server-side payment reconciliation is confirmed.
                  </p>
                </div>
              )
            ) : (
              <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs text-red-800">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-sm">Certificate ID Not Found</strong>
                  <span>No student record matching the credential query was found in the archive. Please confirm the exact certificate ID issued by Bright Future Technical Academy.</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Private institutional verification database.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
