import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  GraduationCap,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Wrench
} from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';

interface AboutAndContactProps {
  phone: string;
  onUpdatePhone: (phone: string) => void;
  onNavigateToApply: () => void;
}

export const AboutAndContact: React.FC<AboutAndContactProps> = ({
  phone,
  onUpdatePhone,
  onNavigateToApply
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSent, setContactSent] = useState<boolean>(false);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [tempPhone, setTempPhone] = useState<string>(phone);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;
    setContactSent(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSent(false);
    }, 3000);
  };

  const faqs = [
    {
      q: 'What type of certification is provided upon completion of training?',
      a: `Students who complete the required syllabus and practical lab exercises receive a Certificate of Course Completion and an ATM-sized hanging Student ID Card issued directly by ${INSTITUTE_CONFIG.name}. Each certificate contains an online verification ID for employer validation.`
    },
    {
      q: 'Where is the institute campus located?',
      a: `The institute is based in the ${INSTITUTE_CONFIG.address}. Official communication can be directed through ${INSTITUTE_CONFIG.email}.`
    },
    {
      q: 'How does the 12% promotional discount work?',
      a: 'The 12% promotional discount is automatically calculated on course fees in the online application form and catalog. The payable fee shown reflects the 12% deduction from the standard base price.'
    },
    {
      q: 'Can employers or academic institutions verify student certificates?',
      a: 'Yes. Any candidate or prospective employer can use the Certificate Services section on this website to verify the certificate ID number and confirm student name, course, and issue date.'
    },
    {
      q: 'Are the courses suitable for beginners?',
      a: 'Yes. All programs start with fundamental concepts and tools before advancing to practical workshop exercises and component-level diagnostics.'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section 7: About the Institute */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
              <Building className="w-3.5 h-3.5 text-[#c99b2e]" />
              <span>ABOUT THE INSTITUTE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0a2240] tracking-tight">
              An Institute for Skill Development & Better Career
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>{INSTITUTE_CONFIG.name}</strong> was established in {INSTITUTE_CONFIG.estdYear} as a {INSTITUTE_CONFIG.businessType}. Our primary objective is to equip youth and aspiring technicians with practical vocational skills that support employment and independent trade self-reliance.
            </p>

            {/* Core Educational Objectives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-[#0a2240] font-bold text-xs">
                  <Wrench className="w-4 h-4 text-[#145da0]" />
                  <span>Practical Skills Development</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focus on hands-on workshop learning, diagnostic testing, circuit tracing, and computer automation rather than only textbook theory.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-[#0a2240] font-bold text-xs">
                  <GraduationCap className="w-4 h-4 text-[#145da0]" />
                  <span>Course Offerings & Training</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structured trade programs in Computer Training, Mobile Repairing, Electrical Work, Hardware & Networking, Tally Accounting, and Spoken English.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-[#0a2240] font-bold text-xs">
                  <Compass className="w-4 h-4 text-[#145da0]" />
                  <span>Career Guidance & Support</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Providing resume building assistance, interview preparation drills, and trade counseling to help students pursue entry-level opportunities.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-[#0a2240] font-bold text-xs">
                  <UserCheck className="w-4 h-4 text-[#145da0]" />
                  <span>Student Centric Facilities</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clean training labs, interactive notice board announcements, organized student counseling desk, and personalized ID credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Leadership & Overview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md space-y-5">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0a2240] to-[#145da0] flex items-center justify-center text-white text-lg font-formal font-bold shrink-0 border-2 border-[#c99b2e]">
                  RK
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif-title text-[#0a2240]">
                    {INSTITUTE_CONFIG.directorName}
                  </h3>
                  <span className="text-xs text-[#145da0] font-semibold block">
                    Director, {INSTITUTE_CONFIG.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Head of Vocational & Technical Training
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Institution Type:</span>
                  <strong className="text-slate-800 text-right">{INSTITUTE_CONFIG.businessType}</strong>
                </div>
                <div className="flex items-start justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Year Established:</span>
                  <strong className="text-slate-800">{INSTITUTE_CONFIG.estdYear}</strong>
                </div>
                <div className="flex items-start justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Area Location:</span>
                  <strong className="text-slate-800 text-right">{INSTITUTE_CONFIG.addressShort}</strong>
                </div>
                <div className="flex items-start justify-between py-1.5">
                  <span className="text-slate-500">Working Hours:</span>
                  <span className="text-slate-800 text-right">{INSTITUTE_CONFIG.officeHours}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Address Transparency Notice: </strong>
                {INSTITUTE_CONFIG.address}
              </div>

              <button
                onClick={onNavigateToApply}
                className="w-full py-3 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                Apply for New Technical Batch
              </button>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-6 max-w-4xl mx-auto pt-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#c99b2e]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-[#0a2240]">
              Candidate Admission & Certification Queries
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-[#0a2240]">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#145da0]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 15: Contact Us Section */}
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-slate-200">
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#145da0] block mb-1">GET IN TOUCH</span>
              <h3 className="text-2xl font-bold font-serif-title text-[#0a2240]">
                Contact Campus Office
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Reach our admissions desk for course counseling, fee schedules, or credential verification.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c99b2e] shrink-0 mt-1" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Institute Address:</strong>
                  <span className="text-slate-700 leading-relaxed block">{INSTITUTE_CONFIG.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#c99b2e] shrink-0 mt-1" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Official Email:</strong>
                  <span className="text-slate-700">{INSTITUTE_CONFIG.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#c99b2e] shrink-0 mt-1" />
                <div className="flex-1">
                  <strong className="block text-slate-900 font-semibold">Helpline Contact:</strong>
                  {isEditingPhone ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (tempPhone.trim()) {
                          onUpdatePhone(tempPhone.trim());
                          setIsEditingPhone(false);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 mt-1"
                    >
                      <input
                        type="text"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        className="bg-slate-50 text-slate-900 px-2 py-0.5 rounded text-xs border border-slate-300 focus:outline-hidden"
                        placeholder="Enter helpline phone"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="text-[11px] bg-[#0a2240] text-white px-2 py-0.5 rounded font-semibold cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingPhone(false)}
                        className="text-[11px] text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-700">{phone}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setTempPhone(phone);
                          setIsEditingPhone(true);
                        }}
                        className="text-[10px] text-[#145da0] underline hover:text-[#0a2240] cursor-pointer"
                        title="Edit helpline phone"
                      >
                        (edit)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#c99b2e] shrink-0 mt-1" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Office Hours:</strong>
                  <span>{INSTITUTE_CONFIG.officeHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Working Admission & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold font-serif-title text-[#0a2240] mb-2">
              Send an Admission Inquiry
            </h4>
            <p className="text-xs text-slate-500 mb-5">
              Have questions regarding course curriculum, batch schedules, or fee concession? Submit an inquiry below.
            </p>

            {contactSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your inquiry has been submitted. Our counselor will respond promptly.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Sweta Banik"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="sweta@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Message / Trade of Interest *</label>
                  <textarea
                    rows={3}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your inquiry or preferred course..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-[#e5c46d]" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
