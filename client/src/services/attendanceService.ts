import axios from "axios";
import API_ROUTES from "../consts/apiRoutes";
import { AttendanceData, AttendanceRecord } from "../types/attendanceTypes";
import HEADERS from "../consts/headers";
import TEXTS from "../consts/texts";

/**
 * Submits attendance data for a user.
 *
 * Features:
 * - Sends a POST request to the server with the attendance data.
 * - Requires an authentication token for authorization.
 *
 * @param {AttendanceData} data - The attendance data to submit (e.g., check-in and check-out times).
 * @param {string} token - The user's authentication token.
 * @returns {Promise<void>} A promise that resolves when the request is successful.
 */
export const submitAttendance = async (data: AttendanceData, token: string): Promise<void> => {
  try {
    await axios.post(API_ROUTES.ATTENDANCE, data, {
      headers: { ...HEADERS.JSON, Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(TEXTS.ATTENDANCE.ERROR_MESSAGE);
  }
};

/**
 * Fetches attendance records for administrators.
 *
 * Features:
 * - Sends a GET request to retrieve all attendance records.
 * - Requires an authentication token with admin privileges.
 *
 * @param {string} token - The admin's authentication token.
 * @returns {Promise<AttendanceRecord[]>} A promise that resolves to an array of attendance records.
 */
export const fetchAttendance = async (token: string): Promise<AttendanceRecord[]> => {
  try {
    const response = await axios.get<AttendanceRecord[]>(API_ROUTES.ATTENDANCE, {
      headers: { ...HEADERS.JSON, Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(TEXTS.ADMIN.ERROR_UPDATE);
  }
};

/**
 * Fetches the current shift status for a user.
 *
 * Features:
 * - Sends a GET request to retrieve the user's current shift status.
 * - Requires an authentication token.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<{ isCheckedIn: boolean; checkInTime: string | null }>} The current shift status.
 */
export const fetchShiftStatus = async (
  token: string
): Promise<{ isCheckedIn: boolean; checkInTime: string | null }> => {
  try {
    const response = await axios.get<{ isCheckedIn: boolean; checkInTime: string | null }>(
      API_ROUTES.ATTENDANCE_STATUS,
      {
        headers: { ...HEADERS.JSON, Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(TEXTS.ATTENDANCE.ERROR_FETCH_STATUS);
  }
};
