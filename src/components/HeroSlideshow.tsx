import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, BookOpen, Award } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';

interface HeroSlideshowProps {
  onApplyNow: () => void;
  onExploreCourses: () => void;
}

interface SlideItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  badge: string;
  objectPosition?: string;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  onApplyNow,
  onExploreCourses
}) => {
  const slides: SlideItem[] = [
    {
      id: 'banner',
      image: INSTITUTE_CONFIG.images.studentBanner,
      title: 'Welcome to Bright Future Technical Academy',
      caption: 'An Institute for Skill Development & Better Career · Admissions Open',
      badge: 'Featured Student Banner',
      objectPosition: 'center 20%'
    },
    {
      id: 'gate',
      image: INSTITUTE_CONFIG.images.mainGate,
      title: 'Main Campus Entrance Gate',
      caption: 'Direct campus access with prominent Bright Future Technical Academy signboard',
      badge: 'Main Entrance Gate',
      objectPosition: 'center 35%'
    },
    {
      id: 'computer-lab',
      image: INSTITUTE_CONFIG.images.computerLabWorkstation,
      title: 'Computer Lab & Practical Training Workstation',
      caption: 'Dual-monitor digital workstation for video editing, graphics design, and IT skills',
      badge: 'Computer Lab & Practical Training',
      objectPosition: 'center center'
    },
    {
      id: 'classroom',
      image: INSTITUTE_CONFIG.images.classroomLectureHall,
      title: 'Smart Classroom & Interactive Learning Hall',
      caption: 'Dual projection displays, student laptops, and hands-on technical instruction',
      badge: 'Classroom & Learning',
      objectPosition: 'center 30%'
    },
    {
      id: 'id-card',
      image: INSTITUTE_CONFIG.images.studentIdCardDesk,
      title: 'Official Student Identity Card System',
      caption: 'Physical hanging student identity card with lanyard, issued upon admission',
      badge: 'Student Identity Card',
      objectPosition: 'center center'
    },
    {
      id: 'office',
      image: INSTITUTE_CONFIG.images.officeRoom,
      title: 'Administration & Counseling Office',
      caption: 'Student admission guidance, career counseling desk, and academic records',
      badge: 'Director & Admin Office',
      objectPosition: 'center center'
    },
    {
      id: 'building',
      image: INSTITUTE_CONFIG.images.mainBuilding,
      title: 'Modern Technical Academic Building',
      caption: 'Equipped with spacious practical training labs and theoretical classrooms',
      badge: 'Campus Main Building',
      objectPosition: 'center center'
    },
    {
      id: 'notice',
      image: INSTITUTE_CONFIG.images.noticeBoard,
      title: 'Institute Notice Board & Information Desk',
      caption: 'Live class routines, fee schedules, batch timings, and examination notices',
      badge: 'Student Notice Board',
      objectPosition: 'center 25%'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance every 5 seconds when playing
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative w-full bg-slate-950 overflow-hidden no-print select-none border-b border-slate-800">
      {/* Slideshow Display Frame with 16:9 or Cinema aspect ratio */}
      <div className="relative w-full h-[340px] sm:h-[460px] md:h-[540px] lg:h-[640px]">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Image Frame with proper object-fit and position */}
              <img
                src={slide.image}
                alt={`${slide.title} – ${slide.caption}`}
                className="w-full h-full object-cover"
                style={{ objectPosition: slide.objectPosition || 'center center' }}
                loading={idx === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
              />

              {/* Measured contrast scrim gradient (top & bottom only to leave banner center legible) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />

              {/* Non-obscuring Slide Caption Bar (Docked at Bottom-Left) */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-20 sm:right-auto max-w-xl z-20 text-white pointer-events-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#e5c46d] border border-white/20 mb-2">
                  <Sparkles className="w-3 h-3 text-[#f59e0b]" />
                  <span>{slide.badge}</span>
                </div>
                {idx === 0 ? (
                  <h1 className="text-lg sm:text-2xl md:text-3xl font-bold font-serif-title drop-shadow-md text-white tracking-tight leading-snug">
                    {slide.title}
                  </h1>
                ) : (
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-serif-title drop-shadow-md text-white tracking-tight leading-snug">
                    {slide.title}
                  </h2>
                )}
                <p className="text-xs sm:text-sm text-slate-200 drop-shadow-sm mt-1 line-clamp-2 max-w-lg">
                  {slide.caption}
                </p>

                {/* Quick Call to Action buttons on first slide */}
                {idx === 0 && (
                  <div className="flex flex-wrap items-center gap-2.5 mt-3 pt-1">
                    <button
                      onClick={onApplyNow}
                      className="px-4 py-2 text-xs font-bold text-[#0a2240] bg-[#e5c46d] hover:bg-[#c99b2e] rounded-lg shadow-md transition-colors cursor-pointer"
                    >
                      Apply for Admission
                    </button>
                    <button
                      onClick={onExploreCourses}
                      className="px-4 py-2 text-xs font-semibold text-white bg-black/50 hover:bg-black/70 backdrop-blur-xs border border-white/30 rounded-lg transition-colors cursor-pointer"
                    >
                      View All 7 Trade Courses
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous institute photograph"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next institute photograph"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Play / Pause Toggle & Slide Indicators (Bottom Right) */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-30 flex items-center gap-2 sm:gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="text-white hover:text-[#e5c46d] p-1 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="w-px h-3.5 bg-white/30" />

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-6 bg-[#e5c46d]' : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono font-medium text-slate-300 ml-1">
            {currentIndex + 1}/{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
};
