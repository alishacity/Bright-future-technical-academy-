import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  FileText,
  IdCard,
  Info,
  Lock,
  Paperclip,
  ShieldCheck,
  Trash2,
  Upload,
  UserCheck
} from 'lucide-react';
import { COURSES, calculateCourseFee, formatINR } from '../data/coursesData';
import { Course, StudentApplication } from '../types';

interface ApplicationFormProps {
  selectedCourseId: string;
  onCourseChange: (courseId: string) => void;
  onGenerate: (application: StudentApplication) => void;
  currentApplication?: StudentApplication;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  selectedCourseId,
  onCourseChange,
  onGenerate,
  currentApplication
}) => {
  const currentCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  // A. Student Details
  const [fullName, setFullName] = useState<string>(currentApplication?.fullName || 'Rahul Kumar');
  const [fatherName, setFatherName] = useState<string>(currentApplication?.fatherName || 'Suresh Kumar');
  const [motherName, setMotherName] = useState<string>(currentApplication?.motherName || 'Sunita Devi');
  const [dob, setDob] = useState<string>(currentApplication?.dob || '2002-05-14');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say'>(currentApplication?.gender || 'Male');
  const [mobile, setMobile] = useState<string>(currentApplication?.mobile || '9876543210');
  const [email, setEmail] = useState<string>(currentApplication?.email || 'student@example.com');
  const [address, setAddress] = useState<string>(currentApplication?.address || '14/B Central Avenue');
  const [state, setState] = useState<string>(currentApplication?.state || 'West Bengal');
  const [district, setDistrict] = useState<string>(currentApplication?.district || 'Kolkata');
  const [pincode, setPincode] = useState<string>(currentApplication?.pincode || '700017');

  // B. Academic Details
  const [highestQualification, setHighestQualification] = useState<string>('12th Standard / Higher Secondary');
  const [institutionName, setInstitutionName] = useState<string>('City Academy High School');
  const [academicRegNumber, setAcademicRegNumber] = useState<string>('WB-2021-98442');
  const [marksOrPercentage, setMarksOrPercentage] = useState<string>('74.5%');
  const [preferredBatch, setPreferredBatch] = useState<'Morning (09:00 - 11:00 AM)' | 'Afternoon (12:00 - 02:00 PM)' | 'Evening (04:00 - 06:00 PM)' | 'Weekend Batch (Sat & Sun)'>('Morning (09:00 - 11:00 AM)');

  // C. Identity Information (Optional by default)
  const [voterId, setVoterId] = useState<string>('');
  const [rawAadhaar, setRawAadhaar] = useState<string>('');

  // D. Document Upload
  const [uploadedDoc, setUploadedDoc] = useState<{
    name: string;
    size: number;
    type: string;
    previewUrl?: string;
  } | null>({
    name: 'Higher_Secondary_Marksheet.pdf',
    size: 1420000,
    type: 'application/pdf'
  });
  const [fileError, setFileError] = useState<string>('');

  // E. Skills, Experience & Certificate Fields
  const [completionDate, setCompletionDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [experience, setExperience] = useState<string>('Practical technical training & laboratory workshop practice');
  const [skillsText, setSkillsText] = useState<string>(currentCourse.skills.join(', '));
  const [achievement, setAchievement] = useState<string>(currentCourse.achievement);
  const [studentPhoto, setStudentPhoto] = useState<string>('');

  // Consent & Submission state
  const [consentAccepted, setConsentAccepted] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Auto-sync skills & achievement when course changes
  useEffect(() => {
    setSkillsText(currentCourse.skills.join(', '));
    setAchievement(currentCourse.achievement);
  }, [currentCourse]);

  // Auto-sync form if active application changes externally
  useEffect(() => {
    if (currentApplication && !currentApplication.isArchiveRecord) {
      setFullName(currentApplication.fullName);
      if (currentApplication.fatherName) setFatherName(currentApplication.fatherName);
      if (currentApplication.motherName) setMotherName(currentApplication.motherName);
      if (currentApplication.dob) setDob(currentApplication.dob);
      if (currentApplication.gender) setGender(currentApplication.gender);
      if (currentApplication.mobile) setMobile(currentApplication.mobile);
      if (currentApplication.email) setEmail(currentApplication.email);
      if (currentApplication.address) setAddress(currentApplication.address);
      if (currentApplication.state) setState(currentApplication.state);
      if (currentApplication.district) setDistrict(currentApplication.district);
      if (currentApplication.pincode) setPincode(currentApplication.pincode);
      if (currentApplication.highestQualification) setHighestQualification(currentApplication.highestQualification);
      if (currentApplication.institutionName) setInstitutionName(currentApplication.institutionName);
    }
  }, [currentApplication?.applicationId]);

  const fee = calculateCourseFee(currentCourse.price);

  // File Upload Handler with 5MB validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedMimeTypes.includes(file.type) && !allowedExtensions.includes(fileExt)) {
      setFileError('Invalid file format. Please upload PDF, JPG, JPEG, or PNG only.');
      return;
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeBytes) {
      setFileError(`File size exceeds 5 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select a smaller file.`);
      return;
    }

    setUploadedDoc({
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: URL.createObjectURL(file)
    });
  };

  const handleRemoveDoc = () => {
    setUploadedDoc(null);
    setFileError('');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStudentPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mask Aadhaar display for privacy
  const getMaskedAadhaar = (val: string): string => {
    const digits = val.replace(/\D/g, '');
    if (digits.length < 4) return digits ? 'XXXX-XXXX-' + digits : '';
    const lastFour = digits.slice(-4);
    return `XXXX-XXXX-${lastFour}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (isSubmitting) return; // Prevent duplicate submission

    // Form Validations
    if (!fullName.trim()) {
      setFormError('Please enter the student full name.');
      return;
    }

    if (!fatherName.trim()) {
      setFormError("Please enter the father's name.");
      return;
    }

    if (!dob) {
      setFormError('Please enter the date of birth.');
      return;
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!address.trim() || !district.trim() || !state.trim()) {
      setFormError('Please complete the full address, district, and state fields.');
      return;
    }

    const cleanPin = pincode.replace(/[^0-9]/g, '');
    if (cleanPin.length !== 6) {
      setFormError('Please enter a valid 6-digit postal PIN code.');
      return;
    }

    if (!institutionName.trim()) {
      setFormError('Please enter the school or institution name.');
      return;
    }

    if (!consentAccepted) {
      setFormError('Please accept the declaration confirming that submitted information is accurate.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable application processing delay
    setTimeout(() => {
      const parsedSkills = skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const appYear = new Date().getFullYear();
      const appRefNumber = Math.floor(10000 + Math.random() * 90000);
      const generatedAppId = `APP-${appYear}-BFTA-${appRefNumber}`;
      // In accordance with security policy: No final certificate ID is exposed before server payment verification
      const sampleCertId = `SAMPLE-PENDING-PAYMENT`;

      const applicationData: StudentApplication = {
        fullName: fullName.trim(),
        fatherName: fatherName.trim(),
        motherName: motherName.trim() || undefined,
        dob,
        gender,
        mobile: cleanMobile,
        email: email.trim() || undefined,
        address: address.trim(),
        state: state.trim(),
        district: district.trim(),
        pincode: cleanPin,
        highestQualification,
        institutionName: institutionName.trim(),
        academicRegNumber: academicRegNumber.trim() || undefined,
        marksOrPercentage: marksOrPercentage.trim() || undefined,
        courseId: currentCourse.id,
        courseName: currentCourse.name,
        preferredBatch,
        voterId: voterId.trim() || undefined,
        aadhaarMasked: rawAadhaar ? getMaskedAadhaar(rawAadhaar) : undefined,
        marksheetDoc: uploadedDoc || undefined,
        completionDate,
        experience: experience.trim() || undefined,
        skills: parsedSkills.length ? parsedSkills : currentCourse.skills,
        achievement: achievement.trim() || currentCourse.achievement,
        certificateId: sampleCertId,
        issueDate: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        studentPhoto: studentPhoto || undefined,
        consentAccepted: true,
        // Security & Payment Verification Fields
        applicationId: generatedAppId,
        paymentStatus: 'Payment Pending',
        feePayable: fee.payableAmount,
        isSamplePreview: true
      };

      setIsSubmitting(false);
      setSuccessMessage(
        `Application Submitted! Ref: ${generatedAppId} · Status: Payment Pending. A watermarked sample preview is displayed below. Official certificate issuance and printing are restricted until trusted server-side payment verification is completed.`
      );
      onGenerate(applicationData);

      // Smooth scroll to certificate preview
      setTimeout(() => {
        const certEl = document.getElementById('certificate');
        if (certEl) {
          certEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }, 600);
  };

  return (
    <section id="apply" className="py-16 sm:py-20 bg-slate-100/80 border-b border-slate-200/90 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] mb-2 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
            <UserCheck className="w-3.5 h-3.5 text-[#c99b2e]" />
            <span>ONLINE STUDENT REGISTRATION & CREDENTIAL PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0a2240] tracking-tight">
            Student Admission Application Form
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Complete the form below to register for vocational training. Upon submission, an official candidate profile, personalized A4 certificate, and hanging student ID card will be generated.
          </p>
        </div>

        {/* Application Form Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-medium">
              {formError}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SECTION A: Student Personal Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#0a2240] text-white flex items-center justify-center text-xs font-bold">
                  A
                </span>
                <h3 className="text-base font-bold font-serif-title text-[#0a2240]">
                  Student Personal Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Student's Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Kumar"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* Father's Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Father's Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* Mother's Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mother's Name (Optional)</label>
                  <input
                    type="text"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="e.g. Sunita Devi"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mobile Number (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. West Bengal"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">District *</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Kolkata / Murshidabad"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* PIN Code */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Postal PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 700017"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white font-mono"
                  />
                </div>

                {/* Full Address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Permanent Residential Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Street / Area / Landmark"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* SECTION B: Academic Details */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#0a2240] text-white flex items-center justify-center text-xs font-bold">
                  B
                </span>
                <h3 className="text-base font-bold font-serif-title text-[#0a2240]">
                  Academic Details & Course Selection
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Highest Qualification */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Highest Qualification *</label>
                  <select
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  >
                    <option value="10th Standard / Matriculation">10th Standard / Matriculation</option>
                    <option value="12th Standard / Higher Secondary">12th Standard / Higher Secondary</option>
                    <option value="Diploma in Engineering / IT">Diploma in Engineering / IT</option>
                    <option value="Graduate (BA / BSc / BCom / BTech / BCA)">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Other Technical Qualification">Other Technical Qualification</option>
                  </select>
                </div>

                {/* School or Institution Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">School / College / Institution Name *</label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="Name of last attended school or college"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* Academic Reg Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Board / Registration No. (Optional)</label>
                  <input
                    type="text"
                    value={academicRegNumber}
                    onChange={(e) => setAcademicRegNumber(e.target.value)}
                    placeholder="e.g. WB-2021-98442"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white font-mono"
                  />
                </div>

                {/* Marks or Percentage */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Marks or Percentage (Optional)</label>
                  <input
                    type="text"
                    value={marksOrPercentage}
                    onChange={(e) => setMarksOrPercentage(e.target.value)}
                    placeholder="e.g. 74.5% / Grade A"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>

                {/* Course Applied For */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Course Applied For *</label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => onCourseChange(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white font-semibold text-[#0a2240]"
                  >
                    {COURSES.map((c) => {
                      const cFee = calculateCourseFee(c.price);
                      return (
                        <option key={c.id} value={c.id}>
                          {c.name} — {formatINR(cFee.payableAmount)}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Preferred Batch */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Preferred Batch / Schedule *</label>
                  <select
                    value={preferredBatch}
                    onChange={(e) => setPreferredBatch(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  >
                    <option value="Morning (09:00 - 11:00 AM)">Morning (09:00 - 11:00 AM)</option>
                    <option value="Afternoon (12:00 - 02:00 PM)">Afternoon (12:00 - 02:00 PM)</option>
                    <option value="Evening (04:00 - 06:00 PM)">Evening (04:00 - 06:00 PM)</option>
                    <option value="Weekend Batch (Sat & Sun)">Weekend Batch (Saturday & Sunday Special)</option>
                  </select>
                </div>

                {/* Completion Date (for Certificate) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Target Completion Date *</label>
                  <input
                    type="date"
                    required
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* SECTION C: Identity Information (Optional by default with Privacy Notice) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                  C
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold font-serif-title text-[#0a2240]">
                    Identity Information
                  </h3>
                  <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium border border-slate-200">
                    Optional
                  </span>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#145da0] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Identity Privacy Notice: </strong>
                  Providing Voter ID or Aadhaar details is strictly optional and not required for basic application submission. These fields are available only if required for candidate identity verification. Full identity numbers are masked, never displayed publicly, and never recorded in application logs.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Voter ID */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">EPIC / Voter ID Number (Optional)</label>
                  <input
                    type="text"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                    placeholder="e.g. WBD1234567"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white font-mono"
                  />
                </div>

                {/* Aadhaar Number (Masked input) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Aadhaar Number (Optional & Masked)</label>
                  <input
                    type="text"
                    maxLength={14}
                    value={rawAadhaar}
                    onChange={(e) => setRawAadhaar(e.target.value)}
                    placeholder="XXXX-XXXX-1234"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0] focus:bg-white font-mono"
                  />
                  {rawAadhaar && (
                    <span className="text-[10px] text-slate-500 block">
                      Stored Masked: {getMaskedAadhaar(rawAadhaar)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION D: Document Upload (Academic Marksheet) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#0a2240] text-white flex items-center justify-center text-xs font-bold">
                  D
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold font-serif-title text-[#0a2240]">
                    Document Upload
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">
                    (PDF, JPG, JPEG, PNG up to 5 MB)
                  </span>
                </div>
              </div>

              {fileError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs">
                  {fileError}
                </div>
              )}

              {/* Upload Drop Zone / Display */}
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#145da0] shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Academic Marksheet / Certificate Copy
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Upload qualifying marksheet (Max: 5 MB · PDF / JPG / PNG)
                    </span>
                    {uploadedDoc && (
                      <div className="mt-1 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{uploadedDoc.name}</span>
                        <span className="text-slate-400">({(uploadedDoc.size / 1024).toFixed(0)} KB)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {uploadedDoc ? (
                    <button
                      type="button"
                      onClick={handleRemoveDoc}
                      className="px-3 py-1.5 text-xs text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  ) : null}

                  <label className="px-4 py-2 text-xs font-bold text-[#0a2240] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#145da0]" />
                    <span>{uploadedDoc ? 'Replace File' : 'Select File'}</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Student Photo for ID Card (Optional) */}
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-slate-100 rounded-md border border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                    {studentPhoto ? (
                      <img src={studentPhoto} alt="Student preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[8px] text-slate-400 text-center font-bold">PHOTO</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Candidate Passport Photo (Optional)</span>
                    <span className="text-[10px] text-slate-500">For the hanging Student Identity Card badge.</span>
                  </div>
                </div>
                <label className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer">
                  <span>{studentPhoto ? 'Change Photo' : 'Upload Photo'}</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Automatic Fee Calculation Box (Preserved 12% Discount) */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Standard Base Fee</span>
                <strong className="text-base sm:text-lg font-bold text-slate-700">{formatINR(fee.basePrice)}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">12% Promotional Off</span>
                <strong className="text-base sm:text-lg font-bold text-emerald-600">-{formatINR(fee.discountAmount)}</strong>
              </div>
              <div className="sm:border-l sm:border-slate-200 sm:pl-4">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Net Payable Fee</span>
                <strong className="text-xl sm:text-2xl font-black text-[#0a2240]">{formatINR(fee.payableAmount)}</strong>
              </div>
            </div>

            {/* Payment & Security Notice Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-[11.5px] text-amber-900 leading-relaxed">
                <strong>Payment & Certificate Security Notice:</strong> Online payment gateway integration (Razorpay / Cashfree webhook) is not currently connected. Applications are submitted with <strong>Payment Pending</strong> status. Final verifiable certificate generation and PDF printing/downloading are restricted until trusted server-side payment reconciliation is confirmed.
              </div>
            </div>

            {/* SECTION E: Consent & Submission */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#145da0] focus:ring-[#145da0] cursor-pointer"
                />
                <span className="leading-relaxed">
                  I hereby declare that all information provided in this application is truthful and accurate to the best of my knowledge. I understand that Bright Future Technical Academy is a <strong>private vocational training centre</strong>, and course completion certificates represent private vocational skill credentials.
                </span>
              </label>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                By submitting this form, you acknowledge our <a href="#transparency" className="text-[#145da0] underline">Transparency Terms</a> and understand that submitted records require verified payment before official credential issuance.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-sm font-bold text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#0a2240] via-[#0e3a6c] to-[#145da0] hover:from-[#0d2f59] hover:to-[#1a6ebd]'
                }`}
              >
                {isSubmitting ? (
                  <span>Processing Application & Credentials...</span>
                ) : (
                  <>
                    <Award className="w-5 h-5 text-[#e5c46d]" />
                    <span>Submit Application (Payment Pending — View Sample Preview)</span>
                    <ChevronRight className="w-4 h-4 text-[#e5c46d]" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
