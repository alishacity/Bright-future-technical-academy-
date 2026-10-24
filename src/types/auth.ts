export interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: string;
  enrolledCourseId?: string;
  applicationId?: string;
}

export interface AuthSession {
  user: StudentUser | null;
  isAuthenticated: boolean;
}

export interface FirebaseConfigStatus {
  isConfigured: boolean;
  missingVariables: string[];
  setupInstructions: string[];
}
