import React from "react";
import { Navigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";
import TEXTS from "../consts/texts";

/**
 * A route protection component that restricts access to certain routes
 * based on user roles and authentication status.
 *
 * Features:
 * - Checks if the user is authenticated.
 * - Verifies the user's role against a list of allowed roles.
 * - Redirects unauthenticated or unauthorized users to the home page.
 * - Includes a logout button to allow users to securely log out.
 *
 * Logout Button:
 * - Logs the user out by invalidating their session on the server.
 * - Clears the local authentication state to remove access tokens and user data.
 * - Provides consistent placement and behavior across all pages using this component.
 *
 * Props:
 * @param {React.ReactNode} children - The child components to render if the user is authorized.
 * @param {string[]} allowedRoles - The roles allowed to access this route.
 */
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { auth, setAuth } = useAuth();

  /**
   * Handles user logout.
   * - Calls the logout service to invalidate the session.
   * - Clears the authentication state in the context.
   */
  const handleLogout = async () => {
    try {
      if (auth.token) {
        await logout(auth.token);
        setAuth({ token: null, role: null, username: null });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Redirect unauthenticated or unauthorized users
  if (!auth.token || !allowedRoles.includes(auth.role || "")) {
    return <Navigate to="/" />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      {/* Logout Button */}
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        {TEXTS.LOGOUT.BUTTON_TEXT}
      </Button>

      {/* Render authorized child components */}
      <Box flexGrow={1} width="100%" mt={2}>
        {children}
      </Box>
    </Box>
  );
};

export default ProtectedRoute;
