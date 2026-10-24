import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/instituteConfig';

interface AnimatedPromotionalTextProps {
  onApplyClick?: () => void;
}

export const AnimatedPromotionalText: React.FC<AnimatedPromotionalTextProps> = ({ onApplyClick }) => {
  const phrases = [
    'Learn Practical Skills.',
    'Build Your Career.',
    'Discover New Opportunities.',
    'Take the Next Step Towards Your Future.',
    'Learn Skill | Build Career | Grow Success'
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phrases.length);
    }, 3600);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="bg-gradient-to-r from-[#071d36] via-[#0a274a] to-[#0f3d6c] text-white py-3.5 px-4 sm:px-6 border-b border-slate-700/80 shadow-inner no-print select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Animated Text Display */}
        <div className="flex items-center gap-3 overflow-hidden h-8">
          <div className="flex items-center gap-1.5 text-[#e5c46d] shrink-0 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#f59e0b] animate-pulse" />
            <span className="hidden md:inline">TRAINING MISSION:</span>
          </div>

          {/* Smooth Vertical Fade Transition */}
          <div className="relative h-8 flex items-center min-w-[280px] sm:min-w-[360px]">
            {phrases.map((phrase, idx) => {
              const isActive = idx === activeIndex;
              return (
                <span
                  key={idx}
                  className={`absolute left-0 text-sm sm:text-base font-serif-title font-medium transition-all duration-700 ease-out ${
                    isActive
                      ? 'opacity-100 transform translate-y-0 text-white'
                      : 'opacity-0 transform -translate-y-3 pointer-events-none text-slate-400'
                  }`}
                >
                  {phrase}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right Quick Link */}
        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-300 hidden lg:inline">
            Admissions open for new technical batches
          </span>
          {onApplyClick && (
            <button
              onClick={onApplyClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e5c46d] hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore Admissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
