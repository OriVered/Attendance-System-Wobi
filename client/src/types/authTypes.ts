/**
 * Authentication state to be used in the application.
 */
export interface AuthState {
  token: string | null;    
  role: string | null;     
  username: string | null;  
  id?: number | null;       
}

/**
 * The response returned by the server during login or authentication.
 */
export interface AuthResponse {
  token: string;
  role: string;
  username?: string;
  id?: number;
}
