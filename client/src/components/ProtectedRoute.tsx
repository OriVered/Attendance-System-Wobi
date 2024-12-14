import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";

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
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      if (auth.token) { // Ensure the token is not null
        logout(auth.token);
  
        // Clear the token from the context
        setAuth({ token: null, role: null, username: null });
      } else {
        console.error("No token found for logout.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!auth.token || !allowedRoles.includes(auth.role || "")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>{children}</div>
        <button onClick={handleLogout} style={{ margin: "10px", padding: "5px 10px" }}>
          Logout
        </button>
      </div>
    </>
  );
};
export default ProtectedRoute;
