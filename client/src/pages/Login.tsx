import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";
import TEXTS from "../consts/texts";
import APP_ROUTES from "../consts/appRoutes";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token, role } = await login(username, password);
      setAuth({ token, role });
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
