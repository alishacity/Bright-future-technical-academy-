export interface Course {
  id: string;
  name: string;
  category: 'it' | 'electronics' | 'electrical' | 'business' | 'vocational';
  duration: string;
  eligibility: string;
  price: number;
  icon: string;
  tagline: string;
  skills: string[];
  achievement: string;
  modules: string[];
  curriculum: string[];
  admissionStatus: 'Open' | 'Filling Fast' | 'Upcoming Batch';
}

export interface StudentApplication {
  // A. Student Details
  fullName: string;
  fatherName: string;
  motherName?: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  mobile: string;
  email?: string;
  address: string;
  state: string;
  district: string;
  pincode: string;

  // B. Academic Details
  highestQualification: string;
  institutionName: string;
  academicRegNumber?: string;
  marksOrPercentage?: string;
  courseId: string;
  courseName: string;
  preferredBatch: 'Morning (09:00 - 11:00 AM)' | 'Afternoon (12:00 - 02:00 PM)' | 'Evening (04:00 - 06:00 PM)' | 'Weekend Batch (Sat & Sun)';

  // C. Identity Information (Optional by default)
  voterId?: string;
  aadhaarMasked?: string;

  // D. Document Upload (Marksheet)
  marksheetDoc?: {
    name: string;
    size: number;
    type: string;
    previewUrl?: string;
  };

  // E. Completion, Skills & Certificate Fields
  completionDate: string;
  experience?: string;
  skills: string[];
  achievement: string;
  certificateId: string;
  issueDate: string;
  studentPhoto?: string;
  consentAccepted: boolean;

  // Security & Payment Verification Fields
  applicationId: string;
  paymentStatus: 'Payment Pending' | 'Verified Paid' | 'Exempt';
  feePayable: number;
  isSamplePreview: boolean;
  isArchiveRecord?: boolean;
}

export interface Testimonial {
  id: string;
  studentName: string;
  courseName: string;
  rating: number;
  reviewText: string;
  year: string;
  location: string;
  isDemo: boolean;
}

export interface CertificateRecord {
  id: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  completionDate: string;
  skills: string[];
  achievement: string;
  experience?: string;
  directorName: string;
  instituteName: string;
  status: 'Verified' | 'Pending Review' | 'Not Found';
}
