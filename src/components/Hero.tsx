import React from 'react';
import { Award, BookOpen, CheckCircle, ChevronRight, Sparkles, Tag, Users, Wrench } from 'lucide-react';

interface HeroProps {
  onExploreCourses: () => void;
  onApplyNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses, onApplyNow }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-100/80 via-white to-slate-50 pt-8 pb-16 sm:pb-20 border-b border-slate-200/80 no-print">
      {/* Promotional Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-900 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 shrink-0" />
            <span className="font-semibold text-amber-950">PROMOTIONAL OFFER:</span>
            <span>Flat <strong className="text-red-700 font-bold">12% OFF</strong> automatically calculated on all vocational certificate courses.</span>
          </div>
          <button
            onClick={onApplyNow}
            className="hidden sm:inline-flex items-center text-xs font-bold text-amber-950 hover:text-amber-800 underline shrink-0 cursor-pointer"
          >
            Claim Offer →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#145da0] bg-blue-50/90 border border-blue-200/60 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-[#c99b2e]" />
              <span>ESTD. 2018 · PRIVATE VOCATIONAL TRAINING CENTRE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-title text-[#0a2240] tracking-tight leading-[1.08] text-balance">
              Build Skills. <br />
              <span className="text-[#145da0] italic font-medium">Shape Your Future.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Bright Future Technical Academy provides industry-oriented vocational education and practical skill development in Berhampore, Murshidabad. From modern computer applications and mobile diagnostics to electrical maintenance and garment tailoring—master hands-on trades with verified certificate generation and official student identity cards.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hands-on practical training & live workshop labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Personalized A4 Certificate with QR verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ATM-standard student ID card included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent private skill certification</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExploreCourses}
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#0a2240] hover:bg-[#103460] rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#e5c46d]" />
                <span>Explore Courses</span>
              </button>
              <button
                onClick={onApplyNow}
                className="px-6 py-3.5 text-sm font-bold text-[#0a2240] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Apply for Admission</span>
                <ChevronRight className="w-4 h-4 text-[#c99b2e]" />
              </button>
            </div>

            {/* Trust and Transparency Note */}
            <div className="pt-2 text-[11px] text-slate-500">
              <span>Notice: Private skill-development centre. Certificate acceptance is subject to receiving employers and institutions. </span>
              <a href="#about" className="text-[#145da0] underline font-medium">Read transparency guidelines</a>.
            </div>
          </div>

          {/* Right Highlight Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#061b33] via-[#0a274a] to-[#114b82] text-white p-7 sm:p-8 shadow-xl border border-slate-700/60 overflow-hidden">
              {/* Background ambient accents */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c99b2e]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#145da0]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Gold Discount Medallion */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#c99b2e]/20 border border-[#c99b2e] flex items-center justify-center text-[#e5c46d]">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e5c46d] block">Limited Season</span>
                      <span className="text-base font-bold text-white">Promotional Admission</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#e5c46d]">12% OFF</span>
                    <span className="block text-[10px] text-slate-300">All Courses</span>
                  </div>
                </div>

                {/* Institute Credibility Card */}
                <div className="space-y-3.5 bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Head of Institute:</span>
                    <strong className="text-white font-medium">Rahul Kumar, Director</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Training Campus:</span>
                    <strong className="text-white font-medium">Berhampore, Murshidabad</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Established:</span>
                    <strong className="text-[#e5c46d] font-semibold">2018 (Sample Demo Data)</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Certificate Status:</span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-semibold">
                      Private Vocational Verified
                    </span>
                  </div>
                </div>

                {/* Fast statistics strip */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                    <span className="block text-lg font-bold text-white font-mono">1,860+</span>
                    <span className="text-[10px] text-slate-300">Trained (Demo)</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                    <span className="block text-lg font-bold text-white font-mono">10</span>
                    <span className="text-[10px] text-slate-300">Vocational Trades</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                    <span className="block text-lg font-bold text-[#e5c46d] font-mono">100%</span>
                    <span className="text-[10px] text-slate-300">Hands-on Lab</span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={onApplyNow}
                  className="w-full py-3 text-xs font-bold text-[#0a2240] bg-gradient-to-r from-[#e5c46d] to-[#c99b2e] hover:from-[#ebd085] hover:to-[#d4aa3e] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-[#0a2240]" />
                  <span>Generate Certificate & Student ID</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
