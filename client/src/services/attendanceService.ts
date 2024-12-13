import axios from "axios";
import API_ROUTES from "../consts/apiRoutes";
import { AttendanceData, AttendanceRecord } from "../types/attendanceTypes";
import HEADERS from "../consts/headers";

/**
 * Submits attendance data (User only).
 */
export const submitAttendance = async (data: AttendanceData, token: string): Promise<void> => {
  await axios.post(API_ROUTES.ATTENDANCE, data, {
    headers: { ...HEADERS.JSON, Authorization: `Bearer ${token}` },
  });
};

/**
 * Fetches attendance records (Admin only).
 */
export const fetchAttendance = async (token: string): Promise<AttendanceRecord[]> => {
  const response = await axios.get<AttendanceRecord[]>(API_ROUTES.ATTENDANCE, {
    headers: { ...HEADERS.JSON, Authorization: `Bearer ${token}` },
  });
  return response.data;
};
