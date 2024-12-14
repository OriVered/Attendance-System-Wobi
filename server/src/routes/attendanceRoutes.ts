import express from "express";
import { submitAttendance, fetchAttendance, fetchUserAttendance } from "../controllers/attendanceController";

const router = express.Router();

router.post("/", submitAttendance);
router.get("/", fetchAttendance);
router.get("/user", fetchUserAttendance);

export default router;
