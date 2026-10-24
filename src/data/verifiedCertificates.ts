import { CertificateRecord } from '../types';

export const INITIAL_VERIFIED_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'BFTA-2024-CADE-8812',
    studentName: 'Amitava Mukherjee',
    courseName: 'Computer Application & Data Entry',
    issueDate: '15 Jan 2024',
    completionDate: '2024-01-10',
    skills: ['MS Word', 'Advanced MS Excel', 'Touch Typing 38 WPM', 'Data Entry', 'Internet & Email', 'Office MIS'],
    achievement: 'Demonstrated exceptional accuracy in spreadsheet modeling and corporate document preparation.',
    experience: '1 year clerical trainee',
    directorName: 'Rahul Kumar',
    instituteName: 'Bright Future Technical Academy',
    status: 'Verified'
  },
  {
    id: 'BFTA-2024-MPRD-4921',
    studentName: 'Farhan Akhtar',
    courseName: 'Mobile Phone Repairing & Diagnostics',
    issueDate: '28 Feb 2024',
    completionDate: '2024-02-25',
    skills: ['SMD Rework Station', 'PCB Diagnostics', 'Display Replacement', 'Firmware Flashing', 'Multimeter Testing'],
    achievement: 'Excellence in component-level PCB soldering and smartphone troubleshooting.',
    experience: '6 months service center intern',
    directorName: 'Rahul Kumar',
    instituteName: 'Bright Future Technical Academy',
    status: 'Verified'
  },
  {
    id: 'BFTA-2024-TALL-7310',
    studentName: 'Pooja Agarwal',
    courseName: 'Tally Prime with GST & Accounting',
    issueDate: '10 Apr 2024',
    completionDate: '2024-04-05',
    skills: ['Tally Prime', 'Voucher Entry', 'GST Invoicing', 'Bank Reconciliation', 'Financial Statements'],
    achievement: 'High proficiency in ledger management and commercial tax compliance procedures.',
    experience: '1 year store assistant',
    directorName: 'Rahul Kumar',
    instituteName: 'Bright Future Technical Academy',
    status: 'Verified'
  }
];
