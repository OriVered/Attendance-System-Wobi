import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes"; // Routes for authentication (login, logout)
import attendanceRoutes from "./routes/attendanceRoutes"; // Routes for attendance management

const app = express();

/**
 * Express application setup and configuration.
 *
 * Features:
 * - Configures middlewares for JSON parsing and Cross-Origin Resource Sharing (CORS).
 * - Registers route handlers for authentication and attendance APIs.
 */

// Middleware: Parses JSON request bodies
app.use(bodyParser.json());

// Middleware: Enables Cross-Origin Resource Sharing
app.use(cors());

// Middleware: Built-in Express JSON parser
app.use(express.json());

// Route: Authentication API
app.use("/api/auth", authRoutes);

// Route: Attendance API
app.use("/api/attendance", attendanceRoutes);

export default app;
