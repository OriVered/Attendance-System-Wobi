import axios from "axios";
import API_ROUTES from "../consts/apiRoutes";
import { AttendanceData } from "../types/attendanceTypes";

/**
 * Submits attendance data (User only).
 */
export const submitAttendance = async (data: AttendanceData, token: string): Promise<void> => {
  await axios.post(API_ROUTES.ATTENDANCE, data, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
};
