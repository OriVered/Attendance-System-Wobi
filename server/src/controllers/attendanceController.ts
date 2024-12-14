import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { addAttendance, getAttendanceRecords, getAttendanceByUserId } from "../services/attendanceService";
import { AttendanceRecord } from "../models/attendanceModel";

const SECRET_KEY = "abcd";

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
            const date = new Date().toISOString().split("T")[0];

            try {
                // Search for an existing attendance record for the same user and date
                const existingRecord = await getAttendanceByUserId(user.id, date);

                if (existingRecord) {
                    // Update the existing record
                    if (checkIn) existingRecord.checkIn = checkIn;
                    if (checkOut) existingRecord.checkOut = checkOut;

                    await addAttendance(existingRecord); // Save updated record
                    res.json({ message: "Attendance updated", record: existingRecord });
                } else {
                    // Create a new attendance record
                    const newRecord: AttendanceRecord = {
                        id: uuidv4(), // Temporary ID; real ID handling is in the service
                        userId: user.id,
                        userName: userName,
                        checkIn: checkIn || undefined,
                        checkOut: checkOut || undefined,
                        date,
                    };

                    await addAttendance(newRecord); // Save new record
                    res.json({ message: checkIn ? "Check-in recorded" : "Check-out recorded", record: newRecord });
                }
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
        } else {
            res.status(400).json({ message: "Invalid attendance data" });
        }
    });
};




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