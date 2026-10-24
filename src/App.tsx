import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSlideshow } from './components/HeroSlideshow';
import { AnimatedPromotionalText } from './components/AnimatedPromotionalText';
import { FacilitiesShowcase } from './components/FacilitiesShowcase';
import { GallerySection } from './components/GallerySection';
import { CoursesSection } from './components/CoursesSection';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ApplicationForm } from './components/ApplicationForm';
import { CertificateView } from './components/CertificateView';
import { StudentIdCard } from './components/StudentIdCard';
import { ReviewsSection } from './components/ReviewsSection';
import { TransparencyNotice } from './components/TransparencyNotice';
import { AboutAndContact } from './components/AboutAndContact';
import { Footer } from './components/Footer';
import { VerifyCertificateModal } from './components/VerifyCertificateModal';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { authService } from './services/authService';
import { StudentUser } from './types/auth';
import { COURSES } from './data/coursesData';
import { INITIAL_VERIFIED_CERTIFICATES } from './data/verifiedCertificates';
import { CertificateRecord, Course, StudentApplication } from './types';
import { INSTITUTE_CONFIG } from './config/instituteConfig';

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-computer-training');
  const [phone, setPhone] = useState<string>(INSTITUTE_CONFIG.phone);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);
  const [allCertificates, setAllCertificates] = useState<CertificateRecord[]>(INITIAL_VERIFIED_CERTIFICATES);

  // Authentication State & Session
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => authService.getSession().user);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'login' | 'signup' | 'portal'>('home');

  // Synchronize routing state with URL hash
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#login' || hash === '#/login') {
        setCurrentRoute('login');
      } else if (hash === '#signup' || hash === '#/signup') {
        setCurrentRoute('signup');
      } else if (hash === '#portal' || hash === '#/portal') {
        const session = authService.getSession();
        if (session.isAuthenticated) {
          setCurrentRoute('portal');
        } else {
          setCurrentRoute('login');
        }
      } else {
        setCurrentRoute('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToLogin = () => {
    window.location.hash = '#/login';
    setCurrentRoute('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSignUp = () => {
    window.location.hash = '#/signup';
    setCurrentRoute('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortal = () => {
    const session = authService.getSession();
    if (!session.isAuthenticated) {
      navigateToLogin();
      return;
    }
    window.location.hash = '#/portal';
    setCurrentRoute('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '#home';
    setCurrentRoute('home');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigateToHome();
  };

  const handleAuthSuccess = (user: StudentUser) => {
    setCurrentUser(user);
    // Update active student application name with registered account name
    setActiveUserApplication((prev) => ({
      ...prev,
      fullName: user.fullName,
      email: user.email
    }));
    setCurrentApplication((prev) => ({
      ...prev,
      fullName: user.fullName,
      email: user.email
    }));
    window.location.hash = '#/portal';
    setCurrentRoute('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active student application (starts with default demo student, updated whenever user submits form or edits)
  const initialCourse = COURSES[0];
  const [activeUserApplication, setActiveUserApplication] = useState<StudentApplication>({
    fullName: currentUser?.fullName || 'Rahul Kumar',
    fatherName: 'Suresh Kumar',
    motherName: 'Sunita Devi',
    dob: '2002-05-14',
    gender: 'Male',
    mobile: '9876543210',
    email: currentUser?.email || 'student@example.com',
    address: '14/B Central Avenue',
    state: 'West Bengal',
    district: 'Kolkata',
    pincode: '700017',
    highestQualification: '12th Standard / Higher Secondary',
    institutionName: 'City Academy High School',
    academicRegNumber: 'WB-2021-98442',
    marksOrPercentage: '74.5%',
    courseId: initialCourse.id,
    courseName: initialCourse.name,
    preferredBatch: 'Morning (09:00 - 11:00 AM)',
    completionDate: '2026-03-15',
    experience: 'Practical technical training in computer operations and office automation',
    skills: initialCourse.skills,
    achievement: initialCourse.achievement,
    certificateId: 'SAMPLE-PREVIEW-ONLY',
    issueDate: '15 Mar 2026',
    consentAccepted: true,
    applicationId: 'APP-2026-BFTA-DEMO1',
    paymentStatus: 'Payment Pending',
    feePayable: 4312,
    isSamplePreview: true,
    isArchiveRecord: false
  });

  // Currently displayed application (defaults to active user application)
  const [currentApplication, setCurrentApplication] = useState<StudentApplication>(activeUserApplication);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseId(course.id);
    const applyEl = document.getElementById('apply');
    if (applyEl) {
      applyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToApply = () => {
    const applyEl = document.getElementById('apply');
    if (applyEl) {
      applyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreCourses = () => {
    const coursesEl = document.getElementById('courses');
    if (coursesEl) {
      coursesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGenerateCertificate = (app: StudentApplication) => {
    setActiveUserApplication(app);
    setCurrentApplication(app);

    // Records with Payment Pending are strictly listed as 'Pending Review', never 'Verified'
    const newRecord: CertificateRecord = {
      id: app.applicationId,
      studentName: app.fullName,
      courseName: app.courseName,
      issueDate: app.issueDate,
      completionDate: app.completionDate,
      skills: app.skills,
      achievement: app.achievement,
      experience: app.experience,
      directorName: INSTITUTE_CONFIG.directorName,
      instituteName: INSTITUTE_CONFIG.name,
      status: app.paymentStatus === 'Verified Paid' ? 'Verified' : 'Pending Review'
    };

    setAllCertificates((prev) => [newRecord, ...prev.filter(r => r.id !== newRecord.id)]);
  };

  // Verifies payment specifically for the CURRENT student application, preserving student's entered data!
  const handleVerifyCurrentApplicationPayment = () => {
    const courseCode = currentApplication.courseId.includes('computer')
      ? 'CADE'
      : currentApplication.courseId.includes('tally')
      ? 'TALL'
      : currentApplication.courseId.includes('mobile')
      ? 'MPRD'
      : currentApplication.courseId.includes('web')
      ? 'WD'
      : 'TECH';
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const verifiedCertId = `BFTA-${new Date().getFullYear()}-${courseCode}-${randDigits}`;

    const verifiedApp: StudentApplication = {
      ...currentApplication,
      certificateId: verifiedCertId,
      paymentStatus: 'Verified Paid',
      isSamplePreview: false,
      isArchiveRecord: false
    };

    setActiveUserApplication(verifiedApp);
    setCurrentApplication(verifiedApp);

    // Register this verified credential into institutional records under candidate's real name
    const newVerifiedRecord: CertificateRecord = {
      id: verifiedCertId,
      studentName: verifiedApp.fullName,
      courseName: verifiedApp.courseName,
      issueDate: verifiedApp.issueDate,
      completionDate: verifiedApp.completionDate,
      skills: verifiedApp.skills,
      achievement: verifiedApp.achievement,
      experience: verifiedApp.experience,
      directorName: INSTITUTE_CONFIG.directorName,
      instituteName: INSTITUTE_CONFIG.name,
      status: 'Verified'
    };

    setAllCertificates((prev) => [newVerifiedRecord, ...prev.filter(c => c.id !== verifiedCertId)]);
  };

  // Re-locks certificate to unpaid sample mode while preserving student's entered data
  const handleResetCurrentPaymentToPending = () => {
    const pendingApp: StudentApplication = {
      ...currentApplication,
      certificateId: 'SAMPLE-PREVIEW-ONLY',
      paymentStatus: 'Payment Pending',
      isSamplePreview: true,
      isArchiveRecord: false
    };

    setActiveUserApplication(pendingApp);
    setCurrentApplication(pendingApp);
  };

  // Historical archive record inspector (does NOT erase the active student application)
  const handleLoadArchiveRecord = (record: CertificateRecord) => {
    setCurrentApplication({
      fullName: record.studentName,
      fatherName: 'Suresh Kumar',
      dob: '2001-08-12',
      gender: 'Male',
      mobile: '9876543210',
      email: 'student@brightfuture.example',
      address: '14/B Central Avenue',
      state: 'West Bengal',
      district: 'Kolkata',
      pincode: '700017',
      highestQualification: '12th Standard / Graduate',
      institutionName: 'City College Kolkata',
      courseId: 'course-computer-training',
      courseName: record.courseName,
      preferredBatch: 'Morning (09:00 - 11:00 AM)',
      completionDate: record.completionDate,
      experience: record.experience || 'Completed technical training curriculum with practical distinction',
      skills: record.skills,
      achievement: record.achievement,
      certificateId: record.id,
      issueDate: record.issueDate,
      consentAccepted: true,
      applicationId: `APP-ARCHIVE-${record.id}`,
      paymentStatus: 'Verified Paid',
      feePayable: 4312,
      isSamplePreview: false,
      isArchiveRecord: true
    });
  };

  const handleReturnToActiveApplication = () => {
    setCurrentApplication(activeUserApplication);
  };

  // Route 1: Dedicated Student Login Page
  if (currentRoute === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleAuthSuccess}
        onNavigateToSignUp={navigateToSignUp}
        onNavigateToHome={navigateToHome}
      />
    );
  }

  // Route 2: Dedicated Student Sign Up Page
  if (currentRoute === 'signup') {
    return (
      <SignUpPage
        onSignUpSuccess={handleAuthSuccess}
        onNavigateToLogin={navigateToLogin}
        onNavigateToHome={navigateToHome}
      />
    );
  }

  // Route 3: Dedicated Student Portal Dashboard (Protected)
  if (currentRoute === 'portal' && currentUser) {
    return (
      <StudentPortalPage
        user={currentUser}
        onLogout={handleLogout}
        onNavigateToHome={navigateToHome}
        onNavigateToApply={() => {
          navigateToHome();
          setTimeout(handleNavigateToApply, 150);
        }}
        onViewCertificate={() => {
          navigateToHome();
          setTimeout(() => {
            const el = document.getElementById('certificate');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
        application={currentApplication}
      />
    );
  }

  // Route 0 / Default: Institute Homepage
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#c99b2e]/20 selection:text-[#0a2240]">
      {/* 1. Redesigned Premium Header without top strip; with prominent Login & Sign Up */}
      <Header
        onOpenVerify={() => setIsVerifyModalOpen(true)}
        onNavigateToApply={handleNavigateToApply}
        onNavigateToLogin={navigateToLogin}
        onNavigateToSignUp={navigateToSignUp}
        onNavigateToPortal={navigateToPortal}
        onLogout={handleLogout}
        currentUser={currentUser}
      />

      <main className="flex-1">
        {/* Screen-Only Sections (Excluded from Print / Save as PDF) */}
        <div className="no-print">
          {/* 2. Hero Section: Automatic Slideshow of supplied images starting with the Student Banner */}
          <HeroSlideshow
            onApplyNow={handleNavigateToApply}
            onExploreCourses={handleExploreCourses}
          />

          {/* 3. Smoothly Animated Promotional Text Ribbon */}
          <AnimatedPromotionalText onApplyClick={handleNavigateToApply} />

          {/* 4. About the Institute Section */}
          <AboutAndContact
            phone={phone}
            onUpdatePhone={setPhone}
            onNavigateToApply={handleNavigateToApply}
          />

          {/* 5. Vocational Training Course Section */}
          <CoursesSection onSelectCourse={handleSelectCourse} />

          {/* 6. Institute Facilities & Campus Section (Main Gate, Office, Building, Notice Board) */}
          <FacilitiesShowcase />

          {/* 7. Dedicated Institute Photo Gallery (Lightbox with 5 supplied photos) */}
          <GallerySection />

          {/* 8. Student Experiences & Star Reviews */}
          <ReviewsSection />

          {/* 9. Live Performance & Revenue Analytics Dashboard (Demo Data) */}
          <AnalyticsDashboard />

          {/* 10. Comprehensive Online Student Application Form (Sections A-E, 5MB marksheets, masked identity) */}
          <ApplicationForm
            selectedCourseId={selectedCourseId}
            onCourseChange={setSelectedCourseId}
            onGenerate={handleGenerateCertificate}
            currentApplication={activeUserApplication}
          />
        </div>

        {/* 11. Certificate Services: A4 Portrait Certificate View & Print Engine */}
        <CertificateView
          application={currentApplication}
          onEdit={handleNavigateToApply}
          onOpenVerify={() => setIsVerifyModalOpen(true)}
          onVerifyPayment={handleVerifyCurrentApplicationPayment}
          onResetPaymentToPending={handleResetCurrentPaymentToPending}
          onReturnToMyApplication={handleReturnToActiveApplication}
          activeStudentName={activeUserApplication.fullName}
        />

        {/* 12. Student Identity Card View & Print */}
        <StudentIdCard application={currentApplication} />

        {/* 13. Mandatory Transparency & Certificate Status Notice (Screen Only) */}
        <div className="no-print">
          <TransparencyNotice />
        </div>
      </main>

      {/* 14. Footer with central address configuration, links, and disclaimers */}
      <Footer
        onOpenVerify={() => setIsVerifyModalOpen(true)}
        phone={phone}
      />

      {/* 15. Real-Time Online Certificate Verification Modal */}
      <VerifyCertificateModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        allCertificates={allCertificates}
        onLoadCertificate={handleLoadArchiveRecord}
      />
    </div>
  );
}
