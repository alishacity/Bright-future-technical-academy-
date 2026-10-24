import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldAlert, ShieldCheck, User, UserPlus } from 'lucide-react';
import { authService } from '../services/authService';
import { StudentUser } from '../types/auth';
import { InstituteLogo } from '../components/InstituteLogo';

interface SignUpPageProps {
  onSignUpSuccess: (user: StudentUser) => void;
  onNavigateToLogin: () => void;
  onNavigateToHome: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSignUpSuccess,
  onNavigateToLogin,
  onNavigateToHome
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!termsAccepted) {
      setError('Please accept the student enrollment terms to register your account.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = authService.register(fullName, email, password, confirmPassword);
      setIsSubmitting(false);

      if (result.success && result.user) {
        onSignUpSuccess(result.user);
      } else {
        setError(result.error || 'Registration failed. Please check your details and try again.');
      }
    }, 300);
  };

  const isPasswordLongEnough = password.length >= 6;
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 flex flex-col justify-between selection:bg-[#c99b2e]/20 selection:text-[#0a2240]">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateToHome}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <InstituteLogo size="sm" />
          </button>

          <button
            type="button"
            onClick={onNavigateToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0a2240] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Academy Website</span>
          </button>
        </div>
      </header>

      {/* Main Sign Up Card Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8">
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#0a2240] mb-3 shadow-xs">
              <UserPlus className="w-6 h-6 text-[#c99b2e]" />
            </div>
            <h1 className="text-2xl font-bold font-serif-title text-[#0a2240]">
              Create Student Account
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Register for course admissions, personal credential archives, and technical certifications.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Student's Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#145da0] focus:bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#145da0] focus:bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password (Min. 6 Characters) *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#145da0] focus:bg-white text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-1.5 text-[10.5px] pt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPasswordLongEnough ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className={isPasswordLongEnough ? 'text-emerald-700 font-medium' : 'text-amber-700'}>
                    {isPasswordLongEnough ? 'Password length meets requirements' : 'At least 6 characters required'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#145da0] focus:bg-white text-slate-900"
                />
              </div>
              {confirmPassword && (
                <div className="flex items-center gap-1.5 text-[10.5px] pt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${doPasswordsMatch ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className={doPasswordsMatch ? 'text-emerald-700 font-medium' : 'text-red-700'}>
                    {doPasswordsMatch ? 'Passwords match' : 'Passwords do not match yet'}
                  </span>
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer pt-1 select-none">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#145da0] focus:ring-[#145da0] cursor-pointer"
              />
              <span className="leading-tight">
                I agree to the Academy's private vocational skill training guidelines and acknowledge that credential verification is performed institutional-only.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 text-xs font-bold text-white rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#0a2240] via-[#0f3d6c] to-[#145da0] hover:from-[#081a30] hover:to-[#104b82]'
              }`}
            >
              {isSubmitting ? (
                <span>Registering Student Account...</span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-[#e5c46d]" />
                  <span>Create Account & Continue</span>
                </>
              )}
            </button>
          </form>

          {/* Navigation to Login */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already have a registered student account?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="font-bold text-[#145da0] hover:text-[#0a2240] underline cursor-pointer ml-1"
              >
                Log In to Your Account
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} Bright Future Technical Academy · Student Registration
      </footer>
    </div>
  );
};
