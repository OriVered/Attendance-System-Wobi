import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";
import TEXTS from "../consts/texts";
import APP_ROUTES from "../consts/appRoutes";

/**
 * Login Component:
 * Provides a form for users to authenticate by entering their username and password.
 *
 * Features:
 * - Validates credentials by sending a request to the backend.
 * - Stores authentication token and user information using `AuthContext`.
 * - Redirects users to appropriate routes based on their role (`admin` or `user`).
 * - Displays error messages if login fails.
 *
 * Hooks:
 * - `useAuth`: To access and set authentication state.
 * - `useNavigate`: To programmatically navigate users after successful login.
 *
 * State:
 * - `username`: Stores the entered username.
 * - `password`: Stores the entered password.
 * - `error`: Stores the error message if login fails.
 */
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token, role } = await login(username, password);
      setAuth({ token, role, username });
      setError(null);
      navigate(role === "admin" ? APP_ROUTES.ADMIN : APP_ROUTES.ATTENDANCE);
    } catch {
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
      <Typography variant="h4" gutterBottom>
        {TEXTS.LOGIN.TITLE}
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label={TEXTS.LOGIN.USERNAME_LABEL}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label={TEXTS.LOGIN.PASSWORD_LABEL}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
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
