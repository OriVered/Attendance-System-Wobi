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
 * Authentication Context.
 */
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * Provider for Authentication Context.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use Authentication Context.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
