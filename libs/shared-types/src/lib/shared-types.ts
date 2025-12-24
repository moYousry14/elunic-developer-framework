// Shared Types for Elunic Framework POC

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'consultant' | 'operator';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: UserProfile;
  accessToken?: string;
}

export interface LoginPayload {
  username: string;
  password?: string;
}