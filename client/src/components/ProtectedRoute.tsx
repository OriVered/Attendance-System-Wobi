import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";
import { Box, Button } from "@mui/material";

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
      if (auth.token) {
        await logout(auth.token);
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"

      padding="16px"
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
   
      >
        Logout
      </Button>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ProtectedRoute;
