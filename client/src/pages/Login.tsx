import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";
import TEXTS from "../consts/texts";
import APP_ROUTES from "../consts/appRoutes";

/**
 * Component for user login.
 *
 * Features:
 * - Collects username and password inputs.
 * - Sends login credentials to the backend.
 * - Updates the authentication state upon successful login.
 * - Navigates the user to the appropriate route based on their role.
 * - Displays error messages for failed login attempts.
 */
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Username input state
  const [password, setPassword] = useState<string>(""); // Password input state
  const [error, setError] = useState<string | null>(null); // Error state for login failures
  const { setAuth } = useAuth(); // Access authentication context
  const navigate = useNavigate(); // React Router navigation hook

  /**
   * Handles the login process.
   * - Sends username and password to the login API.
   * - Updates the `AuthContext` with the user's authentication data.
   * - Redirects the user to the admin or attendance page based on their role.
   * - Displays an error message if the login fails.
   */
  const handleLogin = async () => {
    try {
      // Perform the login request
      const { token, role, id } = await login(username, password);

      // Update the authentication context with login data
      setAuth({ token, role, username, id });

      setError(null); // Clear any previous error

      // Navigate the user based on their role
      navigate(role === "admin" ? APP_ROUTES.ADMIN : APP_ROUTES.ATTENDANCE);
    } catch {
      // Handle login errors
      setError(TEXTS.LOGIN.ERROR_MESSAGE);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="auto"
      width="90%"
      maxWidth="400px"
      margin="auto"
    >
      {/* Login page title */}
      <Typography variant="h4" gutterBottom>
        {TEXTS.LOGIN.TITLE}
      </Typography>

      {/* Display error message if login fails */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Username input field */}
      <TextField
        label={TEXTS.LOGIN.USERNAME_LABEL}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        fullWidth
      />

      {/* Password input field */}
      <TextField
        label={TEXTS.LOGIN.PASSWORD_LABEL}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />

      {/* Login button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
        fullWidth
      >
        {TEXTS.LOGIN.BUTTON_TEXT}
      </Button>
    </Box>
  );
};

export default Login;
