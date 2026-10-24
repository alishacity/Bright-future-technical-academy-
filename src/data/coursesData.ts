import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'course-computer-training',
    name: 'Computer Training (Basic to Advanced)',
    category: 'it',
    duration: '3 Months (90 Hours)',
    eligibility: '10th Standard / Matriculation or equivalent',
    price: 3500,
    icon: '💻',
    tagline: 'MS Office automation, spreadsheet analysis, internet essentials & touch typing.',
    skills: [
      'Computer Fundamentals & Windows OS',
      'MS Word Document Formatting',
      'Advanced MS Excel & Formulas',
      'PowerPoint Presentations',
      'Email & Internet Communications',
      'Typing Speed & Data Entry Basics',
      'Office File Management'
    ],
    curriculum: [
      'Module 1: Operating System & Computer Architecture',
      'Module 2: Professional Documentation in Microsoft Word',
      'Module 3: Advanced Spreadsheets, Pivot Tables & Charts in Excel',
      'Module 4: Business Presentations & Slideshow Creation',
      'Module 5: Digital Communication, Cloud Drives & Office Utilities'
    ],
    achievement: 'The student demonstrated dependable computer literacy, accurate office-document handling, and practical spreadsheet competencies for commercial office operations.',
    modules: ['Digital Literacy', 'Office Automation', 'Data Processing', 'Fast Touch Typing'],
    admissionStatus: 'Open'
  },
  {
    id: 'course-mobile-repairing',
    name: 'Mobile Repairing & Smartphone Servicing',
    category: 'electronics',
    duration: '4 Months (120 Hours)',
    eligibility: '10th Standard / Basic technical aptitude',
    price: 4800,
    icon: '📱',
    tagline: 'SMD soldering, circuit tracing, hardware rework & Android/iOS software flashing.',
    skills: [
      'PCB Circuit Tracing & Schematics',
      'Hot Air SMD Soldering & Desoldering',
      'Multimeter Hardware Diagnostics',
      'Display Glass, Touch & Folder Replacement',
      'Charging Connector & Battery Servicing',
      'Software Flashing, Pattern & FRP Unlocking',
      'Component-Level Fault Isolation'
    ],
    curriculum: [
      'Module 1: Electronics Fundamentals, Resistors, Capacitors & Diodes',
      'Module 2: Mobile PCB Architecture, Power IC, CPU & Network Sections',
      'Module 3: Hands-on Soldering Practice & Jumper Wire Techniques',
      'Module 4: Glass Rework, Polarizer Replacement & OCA Machine Work',
      'Module 5: Software Flashing Tools, Boot Repair & Driver Setup'
    ],
    achievement: 'The student successfully mastered hardware diagnostic procedures, precision soldering on smartphone logic boards, and systematic firmware troubleshooting.',
    modules: ['Basic Electronics', 'Hardware Troubleshooting', 'Micro Soldering', 'Software Flashing'],
    admissionStatus: 'Filling Fast'
  },
  {
    id: 'course-electrical-work',
    name: 'Electrical Work & Domestic Technician',
    category: 'electrical',
    duration: '6 Months (180 Hours)',
    eligibility: '8th / 10th Standard or trade interest',
    price: 5200,
    icon: '⚡',
    tagline: 'Domestic & commercial wiring, switchgears, motor maintenance & inverter battery setups.',
    skills: [
      'Single-Phase & 3-Phase Domestic Wiring',
      'Conduit Pipe Installation & Concealed Wiring',
      'MCB, RCCB & Distribution Box Wiring',
      'Ceiling Fan & Single-Phase Motor Rewinding',
      'Inverter, UPS & Battery Charging Connections',
      'Earth Pit Resistance & Safety Protections',
      'Electrical Tool Safety & Indian Electricity Codes'
    ],
    curriculum: [
      'Module 1: Electrical Current Fundamentals, AC/DC & Ohms Law',
      'Module 2: Domestic Electrical Circuit Design & Cable Sizing',
      'Module 3: Protective Switchgear, Earthing & Shock Prevention',
      'Module 4: Inverter & Backup Power Installation & Testing',
      'Module 5: Practical Field Wiring & Industrial Safety Standards'
    ],
    achievement: 'The student demonstrated thorough comprehension of residential and commercial electrical installation, safe switchgear troubleshooting, and motor servicing.',
    modules: ['Electrical Basics', 'Building Wiring', 'Motors & Transformers', 'Power Backups'],
    admissionStatus: 'Open'
  },
  {
    id: 'course-hardware-networking',
    name: 'Hardware & Networking (PC Assembly & LAN)',
    category: 'it',
    duration: '4 Months (120 Hours)',
    eligibility: '10th / 12th Standard or basic IT knowledge',
    price: 4600,
    icon: '🖥️',
    tagline: 'Custom PC building, component diagnostics, LAN cabling, Wi-Fi router setup & OS installation.',
    skills: [
      'PC Assembly, Disassembly & Motherboard Architecture',
      'BIOS & UEFI Setup, Storage Partitioning',
      'Windows & Linux OS Installation',
      'RAM, Hard Drive, SSD & SMPS Testing',
      'Crimping RJ45 Cables & Network Punching',
      'LAN, Wi-Fi Router, Switch & Access Point Setup',
      'Network Printer Sharing & Troubleshooting'
    ],
    curriculum: [
      'Module 1: Computer Hardware Subsystems & Motherboard Layout',
      'Module 2: Troubleshooting Boot Errors, Blue Screens & Hardware Hangs',
      'Module 3: Networking Concepts, IPv4 Addressing & Subnets',
      'Module 4: Router, Switch & Wi-Fi Configuration for Small Offices',
      'Module 5: Preventive Maintenance & Service Center Practices'
    ],
    achievement: 'The student demonstrated systematic hardware fault diagnosis, custom PC assembly, and stable local area network implementation with router security configurations.',
    modules: ['PC Hardware', 'Operating Systems', 'Networking & LAN', 'System Security'],
    admissionStatus: 'Open'
  },
  {
    id: 'course-tally-accounting',
    name: 'Tally & Accounting (Tally Prime with GST)',
    category: 'business',
    duration: '3 Months (90 Hours)',
    eligibility: '10+2 / Commerce or any stream with basic math',
    price: 4000,
    icon: '🧾',
    tagline: 'Financial bookkeeping, GST voucher entries, e-Way bills, bank reconciliations & balance sheets.',
    skills: [
      'Tally Prime Interface & Master Configuration',
      'Ledger & Group Creation, Chart of Accounts',
      'GST Rates & Invoicing Standards',
      'Purchase, Sales, Receipt & Payment Vouchers',
      'Bank Reconciliation Statement (BRS)',
      'Basic Payroll & TDS Processing',
      'Balance Sheet, Profit & Loss and Trial Balance'
    ],
    curriculum: [
      'Module 1: Accounting Principles, Golden Rules & Debit-Credit Rules',
      'Module 2: Tally Prime Company Setup & Inventory Management',
      'Module 3: GST Configuration, Tax Ledgers & Invoice Generation',
      'Module 4: Banking Transactions, Cheque Registers & BRS',
      'Module 5: Financial Finalization & Management Information Reports'
    ],
    achievement: 'The student demonstrated meticulous record-keeping, accurate GST tax voucher entries, and practical understanding of day-to-day commercial bookkeeping workflows.',
    modules: ['Bookkeeping Basics', 'Tally Prime Masters', 'GST Accounting', 'Financial Statements'],
    admissionStatus: 'Open'
  },
  {
    id: 'course-spoken-english',
    name: 'Spoken English & Professional Communication',
    category: 'business',
    duration: '2 Months (60 Hours)',
    eligibility: 'Open to all candidates seeking communication fluency',
    price: 3200,
    icon: '🗣️',
    tagline: 'Conversation practice, vocabulary building, interview preparation & soft skills.',
    skills: [
      'Daily Conversation Fluency & Pronunciation',
      'Functional English Grammar & Tenses',
      'Job Interview Question & Answer Practice',
      'Telephone & Customer Service Etiquette',
      'Formal Email Writing & Professional Messages',
      'Public Speaking & Self-Presentation',
      'Active Listening & Accent Neutralization'
    ],
    curriculum: [
      'Module 1: Overcoming Hesitation & Basic Sentence Structures',
      'Module 2: Expanding Everyday Vocabulary & Natural Idioms',
      'Module 3: Roleplay Dialogues in Office & Customer Scenarios',
      'Module 4: Resume Writing & Mock Personal Interviews',
      'Module 5: Professional Business Etiquette & Workplace Confidence'
    ],
    achievement: 'The student demonstrated active participation in conversational drills and showed consistent progress in English communication confidence, vocabulary, and professional presentation.',
    modules: ['Grammar Essentials', 'Conversational English', 'Workplace Communication', 'Interview Skills'],
    admissionStatus: 'Open'
  },
  {
    id: 'course-other-technical',
    name: 'Other Technical Courses (DTP, Web & Vocational)',
    category: 'vocational',
    duration: 'Contact institute for details',
    eligibility: 'Contact institute for trade-specific prerequisites',
    price: 4200,
    icon: '⚙️',
    tagline: 'Graphic Design (Photoshop/CorelDRAW), Web Design & Industrial Tailoring.',
    skills: [
      'Graphic Design with Adobe Photoshop & CorelDRAW',
      'Web Design with HTML5, CSS3 & Responsive UI',
      'Industrial Tailoring & Pattern Making',
      'Practical Workshop Equipment Operation',
      'Commercial Print Design & Banner Layouts'
    ],
    curriculum: [
      'Track A: Graphic Design & Commercial DTP Publishing',
      'Track B: Web Design & Frontend Development Essentials',
      'Track C: Garment Construction & Industrial Sewing Machine Practice',
      'Track D: Specialized Skill Development Workshops'
    ],
    achievement: 'The student completed practical hands-on training in specialized vocational technical applications with demonstrated trade competencies.',
    modules: ['Specialized Trade Skills', 'Practical Lab Work', 'Commercial Projects', 'Trade Portfolio'],
    admissionStatus: 'Open'
  }
];

export const DISCOUNT_RATE = 0.12; // 12% promotional discount

export function calculateCourseFee(basePrice: number) {
  const discountAmount = Math.round(basePrice * DISCOUNT_RATE);
  const payableAmount = basePrice - discountAmount;
  return {
    basePrice,
    discountAmount,
    payableAmount
  };
}

export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
}
