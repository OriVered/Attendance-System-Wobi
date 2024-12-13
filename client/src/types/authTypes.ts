/**
 * Authentication-related types for.
 */
export interface AuthState {
  token: string | null;
  role: string | null;
  username: string | null;
}

  
  export interface AuthResponse {
    token: string;
    role: string;
  }
  