export interface User {
  id: string;
  email: string;
  name: string;
  role: 'sacrificer' | 'donor';
  phone?: string;
  region?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'sacrificer' | 'donor';
  phone?: string;
  region?: string;
}