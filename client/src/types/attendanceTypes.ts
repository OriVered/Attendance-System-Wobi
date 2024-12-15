/**
 * Data structure for attendance submissions.
 *
 * Fields:
 * - `checkIn`: The time the user checked in (optional).
 * - `checkOut`: The time the user checked out (optional).
 * - `userName`: The name of the user submitting attendance (optional).
 */
export interface AttendanceData {
  checkIn?: string;
  checkOut?: string;
  userName?: string | null;
}

/**
 * Structure of a single attendance record.
 *
 * Fields:
 * - `userName`: The name of the user associated with the record.
 * - `checkIn`: The check-in time.
 * - `checkOut`: The check-out time.
 */
export interface AttendanceRecord {
  userName: string;
  checkIn: string;
  checkOut: string;
}
