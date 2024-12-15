import express from "express";
import { login, logout } from "../controllers/authController";

const router = express.Router();

/**
 * Authentication Routes.
 *
 * Features:
 * - POST `/login`: Authenticates a user and issues a JWT token.
 * - POST `/logout`: Logs out the user and invalidates their session.
 *
 * Middleware/Handlers:
 * - `login`: Handles user login and token generation.
 * - `logout`: Handles user logout and optional token verification.
 */

// Login route: Authenticate user and issue a token
router.post("/login", login);

// Logout route: Invalidate the user's session
router.post("/logout", logout);

export default router;
