import React, { useState } from 'react';
import { Camera, Eye, Info, Maximize2, Sparkles, X, IdCard, Laptop, GraduationCap, Building2 } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'all' | 'id-card' | 'computer-lab' | 'classroom' | 'campus' | 'admin';
  categoryLabel: string;
  badge: string;
  description: string;
}

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryPhotos: GalleryItem[] = [
    // 1. Featured Student Banner
    {
      id: 'gallery-banner',
      image: INSTITUTE_CONFIG.images.studentBanner,
      title: 'Academy Students & Course Highlights Banner',
      category: 'campus',
      categoryLabel: 'Student Life & Branding',
      badge: 'Featured Student Banner',
      description: 'Official student promotional banner featuring Bright Future Technical Academy trainees in uniform, institute logo, and key course specialties.'
    },
    // 2. Newly Supplied Main Gate (replaces old Main Gate completely)
    {
      id: 'gallery-gate',
      image: INSTITUTE_CONFIG.images.mainGate,
      title: 'Institute Main Gate & Entrance Structure',
      category: 'campus',
      categoryLabel: 'Campus & Main Gate',
      badge: 'New Main Gate',
      description: 'The front entrance gate displaying the newly updated Bright Future Technical Academy signboard with vocational trade specializations and Camac Street, Kolkata address.'
    },
    // 3. Newly Supplied Student ID Card (Close-up with Lanyard)
    {
      id: 'gallery-id-close',
      image: INSTITUTE_CONFIG.images.studentIdCardClose,
      title: 'Official Student Identity Card (Close-up View)',
      category: 'id-card',
      categoryLabel: 'Student Identity Card',
      badge: 'Student Identity Card',
      description: 'Physical hanging student identity card featuring candidate photograph, student ID number, course title, and institute logo with royal blue lanyard.'
    },
    // 4. Newly Supplied Student ID Card (Desk with Workstation)
    {
      id: 'gallery-id-desk',
      image: INSTITUTE_CONFIG.images.studentIdCardDesk,
      title: 'Student Identity Card at Academic Workstation',
      category: 'id-card',
      categoryLabel: 'Student Identity Card',
      badge: 'Student Identity Card',
      description: 'Student identity credential badge resting on student study notebook beside the computer training workstation and study lamp.'
    },
    // 5. Newly Supplied Computer Editing / Workstation Setup
    {
      id: 'gallery-computer-lab',
      image: INSTITUTE_CONFIG.images.computerLabWorkstation,
      title: 'High-Performance Video Editing & Computer Training Suite',
      category: 'computer-lab',
      categoryLabel: 'Computer Lab & Practical Training',
      badge: 'Computer Lab & Practical Training',
      description: 'Professional multi-display computer workstation equipped with timeline video editing, graphic design, and audio-visual post-production software.'
    },
    // 6. Newly Supplied Smart Classroom
    {
      id: 'gallery-classroom',
      image: INSTITUTE_CONFIG.images.classroomLectureHall,
      title: 'Smart Interactive Classroom & Lecture Hall',
      category: 'classroom',
      categoryLabel: 'Classroom & Learning',
      badge: 'Classroom & Learning',
      description: 'Spacious technical lecture classroom with dual interactive projector screens, student laptops, and hands-on coding and data analysis instruction.'
    },
    // 7. Director & Administration Office
    {
      id: 'gallery-office',
      image: INSTITUTE_CONFIG.images.officeRoom,
      title: 'Director & Administrative Reception Office',
      category: 'admin',
      categoryLabel: 'Administration & Notice Board',
      badge: 'Director Office',
      description: 'Executive administration office with the academy sun-and-book emblem backdrop, student counseling desk, and academic records.'
    },
    // 8. Academic Main Building
    {
      id: 'gallery-building',
      image: INSTITUTE_CONFIG.images.mainBuilding,
      title: 'Campus Academic Main Building',
      category: 'campus',
      categoryLabel: 'Campus Infrastructure',
      badge: 'Main Building',
      description: 'Modern institutional training facility housing technical laboratories, lecture rooms, and practical workshop bays.'
    },
    // 9. Notice Board
    {
      id: 'gallery-notice',
      image: INSTITUTE_CONFIG.images.noticeBoard,
      title: 'Central Notice Board & Admission Bulletin',
      category: 'admin',
      categoryLabel: 'Administration & Notice Board',
      badge: 'Notice Board',
      description: 'Institutional bulletin board displaying class routines, fee structures, admissions notices, and the academy vision statement.'
    }
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] mb-2 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
              <Camera className="w-3.5 h-3.5 text-[#c99b2e]" />
              <span>INSTITUTIONAL PHOTOGRAPHIC ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0a2240] tracking-tight">
              Institute Photo Gallery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            Browse authentic photographs of Bright Future Technical Academy including the new Main Gate, student identity cards, modern computer lab, smart classroom, and campus facilities.
          </p>
        </div>

        {/* Dedicated Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8 p-1.5 bg-slate-200/70 rounded-2xl max-w-fit">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-[#0a2240] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Photos ({galleryPhotos.length})
          </button>

          <button
            onClick={() => setSelectedCategory('id-card')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'id-card'
                ? 'bg-white text-[#0a2240] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <IdCard className="w-3.5 h-3.5 text-[#c99b2e]" />
            <span>Student Identity Card</span>
          </button>

          <button
            onClick={() => setSelectedCategory('computer-lab')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'computer-lab'
                ? 'bg-white text-[#0a2240] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-[#145da0]" />
            <span>Computer Lab & Practical Training</span>
          </button>

          <button
            onClick={() => setSelectedCategory('classroom')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'classroom'
                ? 'bg-white text-[#0a2240] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Classroom & Learning</span>
          </button>

          <button
            onClick={() => setSelectedCategory('campus')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'campus'
                ? 'bg-white text-[#0a2240] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Campus & Main Gate</span>
          </button>

          <button
            onClick={() => setSelectedCategory('admin')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              selectedCategory === 'admin'
                ? 'bg-white text-[#0a2240] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Administration & Notice Board
          </button>
        </div>

        {/* Gallery Grid (Responsive Bento layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isWide = index === 0 && selectedCategory === 'all';
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className={`group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col ${
                  isWide ? 'md:col-span-2' : ''
                }`}
              >
                {/* Photo Frame */}
                <div className={`relative overflow-hidden bg-slate-900 ${isWide ? 'aspect-16/9' : 'aspect-4/3'}`}>
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Scrim on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-[#e5c46d] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/20">
                    {photo.badge}
                  </div>

                  {/* Click to Zoom indicator */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#e5c46d]" />
                  </div>

                  {/* Overlay Title on Image Bottom */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-semibold text-[#e5c46d] block mb-0.5">
                      {photo.categoryLabel}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-serif-title drop-shadow-sm leading-snug">
                      {photo.title}
                    </h3>
                  </div>
                </div>

                {/* Caption Description Below */}
                <div className="p-4 bg-white flex-1 flex items-center justify-between gap-3 text-xs text-slate-600">
                  <p className="line-clamp-2 leading-relaxed">{photo.description}</p>
                  <span className="text-[11px] font-bold text-[#145da0] group-hover:underline shrink-0 flex items-center gap-1">
                    <span>View</span>
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Transparency Disclaimer */}
        <div className="mt-8 p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 text-[11px] flex items-start gap-2.5 leading-relaxed">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Asset Transparency Notice: </strong>
            Supplied photographs represent institute visual assets and concept photography. Visual assets do not imply statutory government accreditation, university affiliation, or official government board registration.
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:text-[#e5c46d] hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white space-y-1.5 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#145da0] text-white px-2 py-0.5 rounded">
                  {activePhoto.badge}
                </span>
                <span className="text-xs text-slate-400">{activePhoto.categoryLabel}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif-title text-[#e5c46d]">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
