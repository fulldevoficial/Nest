export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
}
export type UserPermission = 'COURSE_CREATE' | 'COURSE_EDIT' | 'USER_VIEW' | 'DASHBOARD_ACCESS';

export type UserRole = 'admin' | 'user' | 'moderator';

export type AuthProvider = 'local' | 'google' | 'github';

export type ThemePreference = 'dark' | 'light' | 'system';

export interface UserStatus {
  isActive: boolean;
  isVerified: boolean;
  isBlocked: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio?: string;
  locale: string;
  timezone: string;
}

export interface UserNotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface UserPreferences {
  theme: ThemePreference;
  notifications: UserNotificationPreferences;
}

export interface UserAuth {
  provider: AuthProvider;
  lastLoginAt: string;
  tokenExpiresAt: string;
}

export interface UserLogged {
  id: string;
  name: string;
  username: string;
  email: string;

  avatar: string | null;
  role: UserRole;

  permissions: UserPermission[];

  status: UserStatus;
  profile: UserProfile;
  preferences: UserPreferences;
  auth: UserAuth;

  createdAt: string;
  updatedAt: string;
}