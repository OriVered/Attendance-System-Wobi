import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  addAttendance,
  getAttendanceRecords,
  getAttendanceByUserId,
} from "../services/attendanceService";
import { AttendanceRecord } from "../models/attendanceModel";

const SECRET_KEY = "abcd"; // Secret key for JWT signing and verification

/**
 * Fetches the current attendance status for the authenticated user.
 *
 * Features:
 * - Verifies the user's JWT token.
 * - Retrieves the user's current attendance record.
 *
 * @param {Request} req - The HTTP request object containing user details.
 * @param {Response} res - The HTTP response object to send the status back.
 * @returns {Promise<void>} - A promise that resolves when the request is complete.
 */
export const getAttendanceStatus = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    try {
      const user = decoded as JwtPayload & { id: number };
      const date = new Date().toISOString().split("T")[0];

      const attendance = await getAttendanceByUserId(user.id, date);

      if (!attendance) {
        res.status(200).json({
          isCheckedIn: false,
          checkInTime: null,
          message: "You are not currently in a shift.",
        });
        return;
      }

      const isCheckedIn = !!attendance.checkIn && !attendance.checkOut;

      res.status(200).json({
        isCheckedIn,
        checkInTime: attendance.checkIn || null,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch attendance status." });
    }
  });
};


/**
 * Handles attendance submissions (check-in or check-out) for users.
 *
 * Features:
 * - Verifies the user's JWT token.
 * - Updates an existing attendance record or creates a new one.
 * - Validates attendance data before processing.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves when the request is complete.
 */
export const submitAttendance = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    const user = decoded as JwtPayload & { id: number };
    const { userName, checkIn, checkOut } = req.body;

    if (checkIn || checkOut) {
      const date = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

      try {
        // Check for an existing attendance record
        const existingRecord = await getAttendanceByUserId(user.id, date);

        if (existingRecord) {
          // If it's a user trying to submit a new check-in for an existing record, block it
          if (!existingRecord.checkOut && checkIn && !checkOut) {
            res.status(400).json({ message: "You have already checked in today." });
            return;
          }

          // If it's an admin editing, update fields only as provided
          if (checkIn !== undefined) existingRecord.checkIn = checkIn;
          if (checkOut !== undefined) existingRecord.checkOut = checkOut;

          await addAttendance(existingRecord);
          res.json({ message: "Attendance updated", record: existingRecord });
        } else {
          // Create a new attendance record
          const newRecord: AttendanceRecord = {
            id: uuidv4(),
            userId: user.id,
            userName,
            checkIn: checkIn || undefined,
            checkOut: checkOut || undefined,
            date,
          };

          await addAttendance(newRecord);
          res.json({
            message: checkIn ? "Check-in recorded" : "Check-out recorded",
            record: newRecord,
          });
        }
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: "Invalid attendance data" });
    }
  });
};


/**
 * Fetches all attendance records (Admins only).
 *
 * Features:
 * - Verifies the admin's JWT token.
 * - Retrieves all attendance records from the database.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
export const fetchAttendance = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    const user = decoded as JwtPayload & { role: string };
    if (user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admins only." });
      return;
    }

    try {
      const records = getAttendanceRecords();
      res.json(records);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
};

/**
 * Fetches attendance records for a specific user (Admins only).
 *
 * Features:
 * - Verifies the admin's JWT token.
 * - Retrieves attendance records by user ID from the database.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
export const fetchUserAttendance = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    const user = decoded as JwtPayload & { id: number; role: string };

    if (user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admins only." });
      return;
    }

    try {
      const attendance = getAttendanceByUserId(user.id);
      res.json(attendance);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
};
