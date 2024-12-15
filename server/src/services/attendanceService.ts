import { AttendanceRecord } from "../models/attendanceModel";
import { loadData, saveData } from "../utils/fileManager";

/**
 * Adds a new attendance record or updates an existing one.
 *
 * Features:
 * - If no record exists for the given user and date, creates a new record.
 * - If a record exists, updates `checkIn` or `checkOut` fields as needed.
 *
 * @param {AttendanceRecord} record - The attendance record to add or update.
 */
export const addAttendance = (record: AttendanceRecord): void => {
  const data = loadData();

  // Check if a record already exists for the user and date
  const existingRecordIndex = data.attendance.findIndex(
    (r: AttendanceRecord) => r.userId === record.userId && r.date === record.date
  );

  if (existingRecordIndex === -1) {
    // Create a new record if none exists
    const newId = data.attendance.length > 0 ? parseInt(data.attendance[data.attendance.length - 1].id) + 1 : 1;
    data.attendance.push({ ...record, id: newId.toString() });
  } else {
    // Update the existing record (only update provided fields)
    const existingRecord = data.attendance[existingRecordIndex];

    if (record.checkIn !== undefined) {
      existingRecord.checkIn = record.checkIn;
    }
    if (record.checkOut !== undefined) {
      existingRecord.checkOut = record.checkOut;
    }
  }

  saveData(data);
};


/**
 * Retrieves all attendance records.
 *
 * @returns {AttendanceRecord[]} - An array of all attendance records.
 */
export const getAttendanceRecords = (): AttendanceRecord[] => {
  const data = loadData();
  return data.attendance;
};

/**
 * Retrieves an attendance record for a specific user and date.
 *
 * Features:
 * - Fetches attendance records for a user by their `userId`.
 * - Optionally filters records by date.
 *
 * @param {number} userId - The ID of the user.
 * @param {string} [date] - The specific date to filter records (optional).
 * @returns {Promise<AttendanceRecord | null>} - The attendance record or `null` if none is found.
 */
export const getAttendanceByUserId = async (userId: number, date?: string): Promise<AttendanceRecord | null> => {
  try {
    // Fetch all attendance records (assumes this function is asynchronous)
    const records = await getAttendanceRecords();

    // Filter the records for the specific user and date (if provided)
    const record = records.find(
      record => record.userId === userId && (!date || record.date === date)
    );

    return record || null; // Return the matching record or null if none is found
  } catch (error) {
    // Handle potential errors gracefully
    console.error("Error fetching attendance records:", error);
    throw new Error("Failed to fetch attendance records.");
  }
};