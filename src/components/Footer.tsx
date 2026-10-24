import React from 'react';
import { ChevronUp, Mail, MapPin, Phone, ShieldCheck, AlertTriangle } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';
import { InstituteLogo } from './InstituteLogo';

interface FooterProps {
  onOpenVerify: () => void;
  phone: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVerify, phone }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06182c] text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <InstituteLogo size="md" textColor="text-white" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An Institute for Skill Development & Better Career. Providing practical vocational technical education, hands-on workshop training, and verifiable course completion credentials.
            </p>

            <div className="text-xs text-slate-400 space-y-2 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{INSTITUTE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>{INSTITUTE_CONFIG.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>{phone} (Editable contact placeholder)</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Courses & Fees</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">Institute Facilities</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Institute Gallery</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Student Reviews</a></li>
              <li><a href="#apply" className="hover:text-white transition-colors">Online Application</a></li>
              <li><a href="#certificate" className="hover:text-white transition-colors">Certificate Services</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Transparency & Certificate Verification (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Certificate Verification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Employers, institutions, and candidates can verify certificate records online using our real-time verification portal.
            </p>

            <button
              onClick={onOpenVerify}
              className="px-4 py-2.5 text-xs font-semibold text-[#0a2240] bg-[#e5c46d] hover:bg-[#c99b2e] rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#0a2240]" />
              <span>Verify Certificate ID</span>
            </button>

            {/* Mandatory Transparency Box in Footer */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/80 text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[10px] uppercase">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Transparency Notice</span>
              </div>
              <p>
                {INSTITUTE_CONFIG.name} is a private vocational training institute. Course certificates represent private vocational completion credentials.
              </p>
              <a href="#transparency" className="text-[#e5c46d] underline text-[10px] block font-medium">
                Read Full Transparency Terms & Disclaimer →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {INSTITUTE_CONFIG.name}. All rights reserved. Private vocational skill training initiative.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
