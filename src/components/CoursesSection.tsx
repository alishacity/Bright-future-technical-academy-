import React, { useState } from 'react';
import { BookOpen, Check, Clock, Filter, GraduationCap, Search, Sparkles, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { COURSES, calculateCourseFee, formatINR } from '../data/coursesData';
import { Course } from '../types';

interface CoursesSectionProps {
  onSelectCourse: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const filteredCourses = COURSES.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  return (
    <section id="courses" className="py-16 sm:py-20 bg-white border-b border-slate-200/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] mb-2 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
              <BookOpen className="w-3.5 h-3.5 text-[#c99b2e]" />
              <span>CAREER-ORIENTED SKILL CURRICULUM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0a2240] tracking-tight">
              Certificate Training Programmes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            Hands-on technical courses designed for trade competence, self-employment, and workplace readiness. Automatic 12% promotional discount applied across all course fees.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#0a2240] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Courses ({COURSES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('it')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'it'
                  ? 'bg-white text-[#0a2240] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Computer & Hardware
            </button>
            <button
              onClick={() => setSelectedCategory('electronics')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'electronics'
                  ? 'bg-white text-[#0a2240] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mobile Repairing
            </button>
            <button
              onClick={() => setSelectedCategory('electrical')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'electrical'
                  ? 'bg-white text-[#0a2240] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Electrical Work
            </button>
            <button
              onClick={() => setSelectedCategory('business')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'business'
                  ? 'bg-white text-[#0a2240] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tally & Spoken English
            </button>
            <button
              onClick={() => setSelectedCategory('vocational')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'vocational'
                  ? 'bg-white text-[#0a2240] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Other Technical
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trade or skill..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const fee = calculateCourseFee(c.price);
            const isExpanded = expandedCourseId === c.id;

            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#145da0]/50 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top line with Icon, Duration & Admission Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-3xl p-2.5 bg-slate-100 rounded-xl group-hover:scale-110 transition-transform inline-block">
                      {c.icon}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{c.duration}</span>
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {c.admissionStatus}
                      </span>
                    </div>
                  </div>

                  {/* Course Title & Tagline */}
                  <h3 className="text-lg font-bold font-serif-title text-[#0a2240] mb-1.5 group-hover:text-[#145da0] transition-colors leading-snug">
                    {c.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {c.tagline}
                  </p>

                  {/* Eligibility */}
                  <div className="text-[11px] text-slate-500 mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#c99b2e] shrink-0" />
                    <span><strong>Eligibility:</strong> {c.eligibility}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Core Competencies:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.skills.slice(0, 4).map((s, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-50 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200/80"
                        >
                          {s}
                        </span>
                      ))}
                      {c.skills.length > 4 && (
                        <span className="text-[10px] text-slate-400 self-center pl-1">
                          +{c.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Curriculum Module Drawer */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#145da0] block">
                        Detailed Curriculum Modules:
                      </span>
                      {c.curriculum.map((m, mIdx) => (
                        <div key={mIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5 leading-snug">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Toggle Curriculum Details */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(c.id)}
                    className="text-[11px] font-semibold text-[#145da0] hover:text-[#0a2240] flex items-center gap-1 cursor-pointer mt-1"
                  >
                    <span>{isExpanded ? 'Hide Curriculum' : 'View Curriculum Modules'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <del className="text-xs text-slate-400 font-medium">
                        {formatINR(fee.basePrice)}
                      </del>
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200/60 px-1.5 py-0.5 rounded">
                        12% OFF
                      </span>
                    </div>
                    <div className="text-xl font-black text-[#0a2240] tracking-tight">
                      {formatINR(fee.payableAmount)}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCourse(c)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">No courses matching your search filter.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-2 text-xs text-[#145da0] font-semibold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
