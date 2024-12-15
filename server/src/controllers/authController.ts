import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticateUser } from "../services/authService";

const SECRET_KEY = "abcd"; // Secret key for JWT signing and verification

/**
 * Handles user login by verifying credentials and generating a JWT token.
 *
 * Features:
 * - Authenticates the user with the provided username and password.
 * - Issues a JWT token with user details upon successful authentication.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token, username, role: user.role, id: user.id });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

/**
 * Handles user logout.
 *
 * Features:
 * - Validates the JWT token.
 * - Returns a success message upon token validation.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
export const logout = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      jwt.verify(token, SECRET_KEY);
      res.json({ message: "Logout successful" });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};
