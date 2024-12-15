import express from "express";
import { submitAttendance, fetchAttendance, fetchUserAttendance } from "../controllers/attendanceController";

const router = express.Router();

/**
 * Attendance Routes.
 *
 * Features:
 * - POST `/`: Allows users to submit their attendance (check-in or check-out).
 * - GET `/`: Allows admins to fetch all attendance records.
 * - GET `/user`: Allows admins to fetch attendance records for a specific user.
 *
 * Middleware/Handlers:
 * - `submitAttendance`: Handles user attendance submissions.
 * - `fetchAttendance`: Fetches all attendance records for admins.
 * - `fetchUserAttendance`: Fetches attendance records for a specific user (admins only).
 */

// Submit attendance (check-in or check-out)
router.post("/", submitAttendance);

// Fetch all attendance records (admin-only)
router.get("/", fetchAttendance);

// Fetch attendance records for a specific user (admin-only)
router.get("/user", fetchUserAttendance);

export default router;
