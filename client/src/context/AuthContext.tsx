import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthState } from "../types/authTypes";


interface AuthContextProps {
  auth: AuthState;
  setAuth: (authState: AuthState) => void; // Custom setter
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  const updateAuth = (authState: AuthState) => {
    if (authState.token) {
      const updatedAuthState = authState
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

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
 