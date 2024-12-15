import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthState } from "../types/authTypes";
import TEXTS from "../consts/texts";

/**
 * Context for managing and providing authentication state throughout the app.
 *
 * Features:
 * - Initializes authentication state from localStorage.
 * - Updates authentication state and persists it to localStorage.
 * - Provides context consumers with the `auth` state and a setter function.
 *
 * Auth State:
 * - `token`: Authentication token for the user.
 * - `role`: User role (e.g., admin, user).
 * - `username`: The username of the authenticated user.
 * - `id`: Unique identifier for the user.
 *
 * Props:
 * @param {ReactNode} children - Components that will have access to the authentication context.
 */

interface AuthContextProps {
  auth: AuthState;
  setAuth: (authState: AuthState) => void; // Function to update the auth state
}

// Create the authentication context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * AuthProvider component to wrap parts of the app that require access to authentication.
 *
 * Features:
 * - Reads the initial auth state from localStorage.
 * - Provides `auth` and `setAuth` to all children components via context.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize auth state from localStorage
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth);
      return {
        token: parsedAuth.token,
        role: parsedAuth.role,
        username: parsedAuth.username,
        id: parsedAuth.id,
      };
    }
    return { token: null, role: null, username: null, id: null };
  });

  /**
   * Updates the authentication state and persists it to localStorage.
   * 
   * Features:
   * - If a valid token is provided, updates the state and saves it to localStorage.
   * - If no token is provided, clears the auth state and removes it from localStorage.
   *
   * @param {AuthState} authState - The new authentication state.
   */
  const updateAuth = (authState: AuthState) => {
    if (authState.token) {
      const updatedAuthState = authState;
      localStorage.setItem("auth", JSON.stringify(updatedAuthState));
      setAuth(updatedAuthState);
    } else {
      localStorage.removeItem("auth");
      setAuth({ token: null, role: null, username: null, id: null });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 * 
 * Features:
 * - Provides access to the `auth` state and `setAuth` function.
 * - Throws an error if used outside the `AuthProvider`.
 * 
 * @returns {AuthContextProps} - The authentication state and setter function.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(TEXTS.AUTH.INIT_ERROR); // Use centralized error message
  }
  return context;
};
