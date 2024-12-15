/**
 * Represents the authentication state in the application.
 *
 * Fields:
 * - `token`: The authentication token for the user.
 * - `role`: The user's role (e.g., admin, user).
 * - `username`: The username of the authenticated user.
 * - `id`: (Optional-created on the server) A unique identifier for the user.
 */
export interface AuthState {
  token: string | null;
  role: string | null;
  username: string | null;
  id?: number | null;
}

/**
 * Structure of the authentication response from the server.
 *
 * Fields:
 * - `token`: The authentication token provided by the server.
 * - `role`: The role of the user (e.g., admin, user).
 * - `username`: The username of the authenticated user.
 * - `id`: A unique identifier for the user.
 */
export interface AuthResponse {
  token: string;
  role: string;
  username: string;
  id: number;
}