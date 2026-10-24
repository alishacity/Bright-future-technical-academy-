import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, HelpCircle, Info, Lock, LogIn, Mail, ShieldAlert, ShieldCheck, UserPlus } from 'lucide-react';
import { authService } from '../services/authService';
import { StudentUser } from '../types/auth';
import { InstituteLogo } from '../components/InstituteLogo';

interface LoginPageProps {
  onLoginSuccess: (user: StudentUser) => void;
  onNavigateToSignUp: () => void;
  onNavigateToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToSignUp,
  onNavigateToHome
}) => {
  const [email, setEmail] = useState<string>('student@brightfuture.example');
  const [password, setPassword] = useState<string>('Password@123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showFirebaseInfo, setShowFirebaseInfo] = useState<boolean>(false);

  const firebaseStatus = authService.checkFirebaseStatus();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = authService.login(email, password);
      setIsSubmitting(false);

      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Authentication failed. Please verify your credentials.');
      }
    }, 300);
  };

  const handleFillDemo = () => {
    setEmail('student@brightfuture.example');
    setPassword('Password@123');
    setError('');
  };

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

      {/* Main Login Card Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8">
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#145da0] mb-3 shadow-xs">
              <LogIn className="w-6 h-6 text-[#0a2240]" />
            </div>
            <h1 className="text-2xl font-bold font-serif-title text-[#0a2240]">
              Student Portal Login
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to manage your technical coursework, admission applications, and credentials.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Credentials Banner */}
          <div className="mb-5 p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-[#0a2240] block">Pre-Configured Demo Account:</span>
              <span className="text-[11px] text-slate-600 font-mono">student@brightfuture.example</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 text-[11px] font-bold text-[#0a2240] bg-white hover:bg-blue-100 rounded border border-blue-300 transition-colors cursor-pointer shrink-0"
            >
              Fill Demo
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#145da0] focus:bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
            </div>

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
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#e5c46d]" />
                  <span>Sign In to Student Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Navigation to Sign Up */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-3">
            <p className="text-xs text-slate-600">
              Don't have a registered student account?{' '}
              <button
                type="button"
                onClick={onNavigateToSignUp}
                className="font-bold text-[#145da0] hover:text-[#0a2240] underline cursor-pointer ml-1"
              >
                Sign Up for an Account
              </button>
            </p>
          </div>

          {/* Firebase Configuration Info Accordion */}
          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            <button
              type="button"
              onClick={() => setShowFirebaseInfo(!showFirebaseInfo)}
              className="w-full flex items-center justify-between text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#c99b2e]" />
                <span>Cloud Authentication (Firebase) Status</span>
              </span>
              <span className="text-[10px] text-slate-400">{showFirebaseInfo ? 'Hide' : 'Inspect'}</span>
            </button>

            {showFirebaseInfo && (
              <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-[10.5px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className={`w-2 h-2 rounded-full ${firebaseStatus.isConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>{firebaseStatus.isConfigured ? 'Firebase Auth Connected' : 'Local Verified Auth Active (Firebase Not Configured)'}</span>
                </div>
                <p className="text-slate-600">
                  Authentication is currently running securely using student registry storage with individual student credential isolation.
                </p>
                {!firebaseStatus.isConfigured && (
                  <div className="pt-1 text-slate-500">
                    <span className="font-semibold block">Missing Cloud Keys:</span>
                    <ul className="list-disc pl-4 space-y-0.5 font-mono text-[9.5px]">
                      {firebaseStatus.missingVariables.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} Bright Future Technical Academy · Secure Student Authentication
      </footer>
    </div>
  );
};
