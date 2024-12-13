import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
/**
 * A route protection component that restricts access to certain routes
 * based on user roles and authentication status.
 *
 * Features:
 * - Checks if the user is authenticated.
 * - Verifies the user's role against a list of allowed roles.
 * - Redirects unauthenticated or unauthorized users to the home page.
 *
 * Props:
 * @param {React.ReactNode} children - The child components to render if the user is authorized.
 * @param {string[]} allowedRoles - The roles allowed to access this route.
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth.token || !allowedRoles.includes(auth.role || "")) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
