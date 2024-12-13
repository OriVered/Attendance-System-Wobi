import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthState } from "../types/authTypes";

/**
 * Context properties interface.
 */
interface AuthContextProps {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

/**
 * Context to manage authentication state across the application.
 *
 * Features:
 * - Provides `auth` state containing the token, role, and username.
 * - Allows updating the `auth` state via `setAuth`.
 */
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * Provider for Authentication Context.
 * - Manages authentication state for its children.
 *
 * @param {ReactNode} children - The child components to render within the provider.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null, username: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use Authentication Context.
 * @throws {Error} if used outside of AuthProvider.
 * @returns {AuthContextProps} The authentication state and updater function.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
