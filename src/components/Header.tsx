import React, { useState } from 'react';
import { ChevronRight, LogIn, LogOut, Menu, ShieldCheck, UserCheck, UserPlus, X } from 'lucide-react';
import { StudentUser } from '../types/auth';
import { InstituteLogo } from './InstituteLogo';

interface HeaderProps {
  onOpenVerify: () => void;
  onNavigateToApply: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignUp: () => void;
  onNavigateToPortal: () => void;
  onLogout: () => void;
  currentUser: StudentUser | null;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVerify,
  onNavigateToApply,
  onNavigateToLogin,
  onNavigateToSignUp,
  onNavigateToPortal,
  onLogout,
  currentUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs no-print">
      {/* 
        TASK 1: Completely removed the separate top blue strip/banner containing 
        location and phone contact details. Contact details are placed in the Contact section and footer.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Academy Brand Logo & Institute Name */}
        <a
          href="#home"
          className="flex items-center gap-3 group text-decoration-none shrink-0"
          title="Bright Future Technical Academy - Home"
        >
          <InstituteLogo size="md" showText={true} />
        </a>

        {/* Center: Clean Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13.5px] font-semibold text-slate-700">
          <a
            href="#home"
            className="hover:text-[#0a2240] transition-colors py-1 hover:border-b-2 hover:border-[#c99b2e]"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-[#0a2240] transition-colors py-1 hover:border-b-2 hover:border-[#c99b2e]"
          >
            About
          </a>
          <a
            href="#courses"
            className="hover:text-[#0a2240] transition-colors py-1 hover:border-b-2 hover:border-[#c99b2e]"
          >
            Courses
          </a>
          <a
            href="#apply"
            className="hover:text-[#0a2240] transition-colors py-1 hover:border-b-2 hover:border-[#c99b2e]"
          >
            Admission
          </a>
          <a
            href="#certificate"
            className="hover:text-[#0a2240] transition-colors py-1 hover:border-b-2 hover:border-[#c99b2e]"
          >
            Certificates
          </a>
          <a
            href="#contact"
            className="hover:text-[#0a2240] transition-colors py-1 hover:border-b-2 hover:border-[#c99b2e]"
          >
            Contact
          </a>
        </nav>

        {/* Right: Auth Buttons (Login & Sign Up) & Quick Actions */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {currentUser ? (
            /* Logged-In Student State */
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNavigateToPortal}
                className="px-3.5 py-2 text-xs font-bold text-[#0a2240] bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-300 flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                title="Open Student Portal"
              >
                <div className="w-5 h-5 rounded-full bg-[#0a2240] text-[#e5c46d] flex items-center justify-center text-[10px]">
                  <UserCheck className="w-3 h-3" />
                </div>
                <span>Portal: {currentUser.fullName.split(' ')[0]}</span>
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                title="Log out of your student account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Logged-Out State: Prominently Visible Login & Sign Up */
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="px-4 py-2 text-xs font-bold text-[#0a2240] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#145da0]" />
                <span>Login</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToSignUp}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0a2240] via-[#0f3d6c] to-[#145da0] hover:from-[#081a30] hover:to-[#104b82] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 border border-[#0a2240]/20"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#e5c46d]" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Quick Certificate Verify ID button */}
          <button
            type="button"
            onClick={onOpenVerify}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0a2240] hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200 cursor-pointer flex items-center gap-1"
            title="Online Certificate Verification Archive"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#c99b2e]" />
            <span className="hidden xl:inline">Verify ID</span>
          </button>
        </div>

        {/* Mobile Header Elements */}
        <div className="lg:hidden flex items-center gap-2">
          {currentUser ? (
            <button
              type="button"
              onClick={onNavigateToPortal}
              className="px-2.5 py-1.5 text-xs font-bold text-[#0a2240] bg-amber-50 border border-amber-300 rounded-lg flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#0a2240]" />
              <span>Portal</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="px-3 py-1.5 text-xs font-bold text-[#0a2240] bg-slate-100 border border-slate-300 rounded-lg"
              >
                Login
              </button>
              <button
                type="button"
                onClick={onNavigateToSignUp}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#0a2240] rounded-lg"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0a2240] border-b border-slate-100"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0a2240] border-b border-slate-100"
            >
              About Institute
            </a>
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0a2240] border-b border-slate-100"
            >
              Vocational Courses
            </a>
            <a
              href="#apply"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0a2240] border-b border-slate-100"
            >
              Admission Application
            </a>
            <a
              href="#certificate"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0a2240] border-b border-slate-100"
            >
              Certificate Services
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0a2240]"
            >
              Contact Us
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            {currentUser ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToPortal();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-[#0a2240] bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#0a2240]" />
                  <span>Open Student Portal ({currentUser.fullName})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToLogin();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-[#0a2240] bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-[#145da0]" />
                  <span>Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToSignUp();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#0a2240] rounded-xl flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4 text-[#e5c46d]" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVerify();
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#c99b2e]" />
              <span>Verify ID Archive</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToApply();
              }}
              className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0a2240] to-[#145da0] rounded-xl shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Apply for Admission</span>
              <ChevronRight className="w-4 h-4 text-[#e5c46d]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
