import React, { useState } from 'react';
import { Building2, CheckCircle2, Eye, Laptop, GraduationCap, Shield, Users, Wrench } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';

export const FacilitiesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'gate' | 'computer' | 'classroom' | 'office' | 'building' | 'notice'>('all');

  const facilities = [
    {
      id: 'gate',
      category: 'gate',
      title: 'Main Entrance Gate & Campus Facade',
      subtitle: 'Institutional Signboard & Direct Campus Access',
      badge: 'Main Gate',
      image: INSTITUTE_CONFIG.images.mainGate,
      description: 'The front entrance gate of Bright Future Technical Academy featuring the updated institute signboard with listed vocational trade disciplines and Camac Street, Kolkata address.',
      highlights: [
        'Large blue and gold institutional signboard with logo and Estd. 2018',
        'Direct student pedestrian and vehicle access with security gate',
        'Listed trade specializations: Computer, Mobile, Electrical, Hardware, Tally, English',
        'Secure campus boundary with paved forecourt and welcoming greenery'
      ],
      equipment: ['Security Post', 'Student Ingress Gate', 'Directional Signage', 'Paved Approach']
    },
    {
      id: 'computer',
      category: 'computer',
      title: 'Computer Lab & Practical Training Workstation',
      subtitle: 'Dual-Monitor Digital Suites for Video Editing, DTP & IT Skills',
      badge: 'Computer Lab & Practical Training',
      image: INSTITUTE_CONFIG.images.computerLabWorkstation,
      description: 'High-performance computing laboratory equipped with dual-screen editing workstations, timeline post-production software, backlit mechanical keyboards, and dedicated IT software.',
      highlights: [
        'Multi-monitor editing displays for timeline video editing and DTP layout',
        'Equipped with software suites: Adobe Photoshop, CorelDRAW, Premiere & Tally',
        'High-speed networked terminals with dedicated internet connectivity',
        'Ergonomic workstation setups tailored for long practical training sessions'
      ],
      equipment: ['Dual-Display Stations', 'Mechanical Keyboards', 'SSD High-Speed Rigs', 'Color-Graded Monitors']
    },
    {
      id: 'classroom',
      category: 'classroom',
      title: 'Classroom & Interactive Learning Hall',
      subtitle: 'Smart Lecture Rooms with Projection Displays & Student Laptops',
      badge: 'Classroom & Learning',
      image: INSTITUTE_CONFIG.images.classroomLectureHall,
      description: 'Spacious technical lecture hall equipped with dual high-resolution projection screens, ergonomic tiered seating, student laptop stations, and interactive coding environments.',
      highlights: [
        'Dual overhead projection screens for simultaneous theory and practical coding',
        'Individual laptop desks equipped with power and network access',
        'Interactive live coding demonstrations (JupyterLab, web programming, algorithms)',
        'Acoustically treated ceiling and climate-controlled comfortable environment'
      ],
      equipment: ['Dual Digital Projectors', 'Student Laptop Desks', 'Audio Sound System', 'Air Conditioning']
    },
    {
      id: 'office',
      category: 'office',
      title: 'Director & Administration Office',
      subtitle: 'Admissions Desk, Student Guidance & Verification Area',
      badge: 'Admin Office',
      image: INSTITUTE_CONFIG.images.officeRoom,
      description: 'The administration and counselor office displaying the golden sun-over-book academy emblem, executive workstation, student records, and guidance desk.',
      highlights: [
        'Central student admission desk and counselor workstation',
        'Official certificate verification & document dispatch counter',
        'Organized student archives, academic dossiers & course prospectuses',
        'Naturally lit executive interior with visitor seating'
      ],
      equipment: ['Registration Terminal', 'Certificate Dispatch Files', 'Meeting Desk', 'Student Archives']
    },
    {
      id: 'building',
      category: 'building',
      title: 'Main Academic & Training Building',
      subtitle: 'Modern Technical Lab Wings & Classrooms',
      badge: 'Main Building',
      image: INSTITUTE_CONFIG.images.mainBuilding,
      description: 'Modern two-storey technical training academy facility housing specialized computer labs, electronics workshop benches, and practical instructional classrooms.',
      highlights: [
        'Spacious classrooms with modern instructional displays',
        'Dedicated labs for software, accounting, and spoken English',
        'Clean paved student courtyard and green landscaping',
        'Ventilated architecture designed for technical learning'
      ],
      equipment: ['Classroom Wings', 'Technical Labs', 'Rest Areas', 'Power Backup']
    },
    {
      id: 'notice',
      category: 'notice',
      title: 'Institute Notice Board & Information Center',
      subtitle: 'Live Schedules, Class Routines & Vision Statement',
      badge: 'Notice Board',
      image: INSTITUTE_CONFIG.images.noticeBoard,
      description: 'Central student information board located outside the admin office displaying official notices, fee schedules, class routines, and the academy vision.',
      highlights: [
        'Real-time class routines and batch schedule updates',
        'Transparent fee structure and syllabus breakdown notices',
        'Institutional vision statement for practical skill development',
        'Directly adjacent to the Admin Office inquiry window'
      ],
      equipment: ['Class Routine Board', 'Fee Structure Notice', 'Admission Bulletin', 'Vision Display']
    }
  ];

  const filtered = activeTab === 'all' ? facilities : facilities.filter((f) => f.category === activeTab);

  return (
    <section id="facilities" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] mb-2 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
              <Building2 className="w-3.5 h-3.5 text-[#c99b2e]" />
              <span>CAMPUS INFRASTRUCTURE & LAB FACILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0a2240] tracking-tight">
              Institute Facilities & Campus
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            Explore the training campus of Bright Future Technical Academy including the new Main Gate, dual-display computer lab, smart interactive classroom, and administrative facilities.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-200/70 rounded-xl max-w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#0a2240] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 6 Facilities ({facilities.length})
          </button>
          <button
            onClick={() => setActiveTab('gate')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'gate'
                ? 'bg-white text-[#0a2240] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Main Gate
          </button>
          <button
            onClick={() => setActiveTab('computer')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'computer'
                ? 'bg-white text-[#0a2240] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Computer Lab & Practical Training
          </button>
          <button
            onClick={() => setActiveTab('classroom')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'classroom'
                ? 'bg-white text-[#0a2240] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Classroom & Learning
          </button>
          <button
            onClick={() => setActiveTab('office')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'office'
                ? 'bg-white text-[#0a2240] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin Office
          </button>
          <button
            onClick={() => setActiveTab('building')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'building'
                ? 'bg-white text-[#0a2240] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Main Building
          </button>
          <button
            onClick={() => setActiveTab('notice')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'notice'
                ? 'bg-white text-[#0a2240] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Notice Board
          </button>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Photo Frame with real supplied photo */}
                <div className="relative aspect-16/10 bg-slate-900 overflow-hidden border-b border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-[#e5c46d] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/20">
                    {item.badge}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-[11px] font-semibold text-[#145da0] mb-0.5">
                      {item.subtitle}
                    </div>
                    <h3 className="text-base font-bold font-serif-title text-[#0a2240] mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    {item.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Equipment / Specs Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1 text-[10px]">
                {item.equipment.map((eq, i) => (
                  <span key={i} className="bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
