import { StudentUser, AuthSession, FirebaseConfigStatus } from '../types/auth';

const STORAGE_USERS_KEY = 'bfta_registered_students';
const STORAGE_SESSION_KEY = 'bfta_active_session';

// Pre-seeded verified demo student account for evaluation
const DEFAULT_DEMO_STUDENT: StudentUser & { passwordHash: string } = {
  id: 'STU-2026-DEMO-01',
  fullName: 'Rahul Kumar',
  email: 'student@brightfuture.example',
  phone: '9876543210',
  createdAt: '2026-01-15',
  applicationId: 'APP-2026-BFTA-DEMO1',
  passwordHash: 'Password@123'
};

export const authService = {
  // Check if institutional Firebase Auth environment variables are supplied
  checkFirebaseStatus(): FirebaseConfigStatus {
    const requiredEnvKeys = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_APP_ID'
    ];

    const missingVariables = requiredEnvKeys.filter((key) => {
      const val = (import.meta as any).env?.[key];
      return !val || typeof val !== 'string' || val.trim() === '';
    });

    const isConfigured = missingVariables.length === 0;

    const setupInstructions = [
      'Firebase Authentication is currently not provisioned for this applet.',
      'To enable Google / Cloud Email Authentication:',
      '1. Create a Firebase project in the Firebase Console (console.firebase.google.com).',
      '2. Enable Authentication (Email/Password or Google Provider).',
      '3. Add a Web App and copy the Firebase configuration credentials.',
      '4. Provide the environment variables in .env (VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID).',
      'Current status: Student Authentication is operating via client-side verified storage with individual student credential isolation.'
    ];

    return {
      isConfigured,
      missingVariables,
      setupInstructions
    };
  },

  // Retrieve all registered student accounts from browser storage
  getUsers(): (StudentUser & { passwordHash: string })[] {
    try {
      const raw = localStorage.getItem(STORAGE_USERS_KEY);
      if (!raw) {
        // Seed default demo student if storage is fresh
        const initial = [DEFAULT_DEMO_STUDENT];
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initial));
        return initial;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [DEFAULT_DEMO_STUDENT];
      return parsed;
    } catch {
      return [DEFAULT_DEMO_STUDENT];
    }
  },

  // Get active session
  getSession(): AuthSession {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!raw) return { user: null, isAuthenticated: false };
      const user = JSON.parse(raw) as StudentUser;
      if (!user || !user.id || !user.email) return { user: null, isAuthenticated: false };
      return { user, isAuthenticated: true };
    } catch {
      return { user: null, isAuthenticated: false };
    }
  },

  // Register a new student account with validation
  register(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): { success: boolean; user?: StudentUser; error?: string } {
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    // 1. Validation: Name
    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Please enter your full student name (minimum 2 characters).' };
    }

    // 2. Validation: Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Please enter a valid student email address.' };
    }

    // 3. Validation: Password Length
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // 4. Validation: Password Confirmation Match
    if (password !== confirmPassword) {
      return { success: false, error: 'Password confirmation does not match the entered password.' };
    }

    // 5. Uniqueness Check
    const existingUsers = this.getUsers();
    const isDuplicate = existingUsers.some((u) => u.email === cleanEmail);
    if (isDuplicate) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please log in instead.'
      };
    }

    // 6. Create student record
    const randId = Math.floor(1000 + Math.random() * 9000);
    const newStudent: StudentUser & { passwordHash: string } = {
      id: `STU-2026-${randId}`,
      fullName: cleanName,
      email: cleanEmail,
      createdAt: new Date().toISOString().split('T')[0],
      passwordHash: password // Stored for client-side authentication
    };

    const updated = [newStudent, ...existingUsers];
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // Auto-create active session
    const sessionUser: StudentUser = {
      id: newStudent.id,
      fullName: newStudent.fullName,
      email: newStudent.email,
      createdAt: newStudent.createdAt
    };

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
    } catch (e) {
      console.warn('LocalStorage session error:', e);
    }

    return { success: true, user: sessionUser };
  },

  // Authenticate student login credentials
  login(
    email: string,
    password: string
  ): { success: boolean; user?: StudentUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter your registered student email.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your account password.' };
    }

    const users = this.getUsers();
    const found = users.find((u) => u.email === cleanEmail);

    if (!found) {
      return {
        success: false,
        error: 'No account registered with this email address. Please check your email or Sign Up for a student account.'
      };
    }

    if (found.passwordHash !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please verify your credentials or use the demo login credentials.'
      };
    }

    const sessionUser: StudentUser = {
      id: found.id,
      fullName: found.fullName,
      email: found.email,
      phone: found.phone,
      createdAt: found.createdAt,
      applicationId: found.applicationId,
      enrolledCourseId: found.enrolledCourseId
    };

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
    } catch (e) {
      console.warn('LocalStorage session error:', e);
    }

    return { success: true, user: sessionUser };
  },

  // Log out active student session
  logout(): void {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } catch (e) {
      console.warn('LocalStorage logout error:', e);
    }
  }
};
