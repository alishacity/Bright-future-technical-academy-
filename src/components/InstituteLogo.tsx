import React from 'react';

interface InstituteLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  className?: string;
}

export const InstituteLogo: React.FC<InstituteLogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'text-[#0a2240]',
  className = ''
}) => {
  const dimensions = {
    sm: { icon: 'w-8 h-8', textTitle: 'text-sm', textSubtitle: 'text-[9px]' },
    md: { icon: 'w-11 h-11', textTitle: 'text-base sm:text-lg', textSubtitle: 'text-[10px] sm:text-[11px]' },
    lg: { icon: 'w-14 h-14', textTitle: 'text-xl sm:text-2xl', textSubtitle: 'text-xs' },
    xl: { icon: 'w-20 h-20', textTitle: 'text-2xl sm:text-3xl', textSubtitle: 'text-sm' }
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Official Emblem: Golden Rising Sun over Open Navy Book */}
      <div className={`${dimensions.icon} shrink-0 relative flex items-center justify-center`}>
        <svg viewBox="0 0 100 85" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Sun Gold Gradient */}
            <linearGradient id="logoSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            {/* Open Book Navy Gradient */}
            <linearGradient id="logoBookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082746" />
              <stop offset="50%" stopColor="#0f3d6c" />
              <stop offset="100%" stopColor="#145da0" />
            </linearGradient>
          </defs>

          {/* Golden Sun Semi-Circle */}
          <circle cx="50" cy="40" r="18" fill="url(#logoSunGrad)" />

          {/* Radiating Sun Rays (as in supplied logo) */}
          <line x1="50" y1="12" x2="50" y2="4" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="62" y1="15" x2="68" y2="9" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="38" y1="15" x2="32" y2="9" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="72" y1="24" x2="80" y2="20" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="28" y1="24" x2="20" y2="20" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="78" y1="36" x2="86" y2="35" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="22" y1="36" x2="14" y2="35" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />

          {/* Open Book Wings */}
          {/* Left Page Wing */}
          <path
            d="M 50 56 Q 32 40 10 45 L 14 62 Q 32 57 50 72 Z"
            fill="url(#logoBookGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Right Page Wing */}
          <path
            d="M 50 56 Q 68 40 90 45 L 86 62 Q 68 57 50 72 Z"
            fill="url(#logoBookGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Lower Page Underlay Layers for Depth */}
          <path
            d="M 50 63 Q 32 48 14 52 L 16 67 Q 34 63 50 78 Z"
            fill="#082746"
            opacity="0.85"
          />
          <path
            d="M 50 63 Q 68 48 86 52 L 84 67 Q 66 63 50 78 Z"
            fill="#082746"
            opacity="0.85"
          />
          {/* Center Spine highlight */}
          <line x1="50" y1="56" x2="50" y2="78" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-serif-title font-bold ${dimensions.textTitle} ${textColor} tracking-tight`}>
            Bright Future
          </span>
          <span className={`font-sans font-bold tracking-[0.14em] text-[10px] sm:text-xs text-[#0f3d6c] uppercase`}>
            Technical Academy
          </span>
          <span className="text-[9px] text-slate-500 font-medium hidden sm:block">
            Skill Development & Career Building
          </span>
        </div>
      )}
    </div>
  );
};
