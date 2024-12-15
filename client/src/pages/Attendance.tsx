import React, { useState } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useTime } from "../context/TimeContext";
import { submitAttendance } from "../services/attendanceService";
import TEXTS from "../consts/texts";

/**
 * Component for managing attendance actions such as checking in and out.
 *
 * Features:
 * - Allows users to check in and out.
 * - Displays shift duration and error/success messages.
 * - Integrates with `AuthContext` for user information and `TimeContext` for the current time.
 */
const Attendance: React.FC = () => {
  const { auth } = useAuth(); // Access user authentication details
  const { currentTime } = useTime(); // Access the current time from context
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false); // Tracks whether the user is checked in
  const [checkInTime, setCheckInTime] = useState<string | null>(null); // Stores the user's check-in time
  const [error, setError] = useState<string | null>(null); // Stores error messages
  const [success, setSuccess] = useState<string | null>(null); // Stores success messages

  /**
   * Handles the check-in action.
   *
   * Features:
   * - Submits the attendance record to the backend.
   * - Updates the local state to mark the user as checked in.
   * - Displays success or error messages based on the API response.
   */
  const handleCheckIn = async () => {
    if (!currentTime) return; // Exit if the current time is not available
    try {
      await submitAttendance(
        {
          userName: auth.username,
          checkIn: currentTime,
          checkOut: currentTime,
        },
        auth.token || ""
      );
      setIsCheckedIn(true);
      setCheckInTime(currentTime);
      setSuccess(TEXTS.ATTENDANCE.SUCCESS_MESSAGE);
      setError(null); // Clear any previous errors
    } catch {
      setError(TEXTS.ATTENDANCE.ERROR_MESSAGE);
      setSuccess(null); // Clear any previous success messages
    }
  };

  /**
   * Calculates the duration of the current shift.
   *
   * Features:
   * - Compares the check-in time to the current time.
   * - Returns the total duration in hours, rounded to one decimal place.
   * 
   * @returns {string | null} The duration of the shift in hours, or `null` if unavailable.
   */
  const calculateShiftHours = () => {
    if (!checkInTime || !currentTime) return null;
    const checkInDate = new Date(checkInTime);
    const currentDate = new Date(currentTime);
    const hours = Math.abs(currentDate.getTime() - checkInDate.getTime()) / 36e5; // Convert milliseconds to hours
    return hours.toFixed(1);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        {TEXTS.ATTENDANCE.TITLE}
      </Typography>

      {/* Welcome message with username */}
      <Typography variant="h6" gutterBottom>
        {TEXTS.ATTENDANCE.WELCOME_MESSAGE.replace("{username}", auth?.username || "N/A")}
      </Typography>

      {/* Shift status */}
      {isCheckedIn ? (
        <Typography variant="body1" gutterBottom>
          {TEXTS.ATTENDANCE.SHIFT_STATUS.ON_SHIFT.replace(
            "{hours}",
            calculateShiftHours() || "0"
          )}
        </Typography>
      ) : (
        <Typography variant="body1" gutterBottom>
          {TEXTS.ATTENDANCE.SHIFT_STATUS.OFF_SHIFT}
        </Typography>
      )}

      {/* Error and success messages */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Check-in/out button */}
      <Button
        variant="contained"
        color={isCheckedIn ? "secondary" : "primary"}
        onClick={handleCheckIn}
        sx={{ mt: 2 }}
      >
        {isCheckedIn
          ? TEXTS.ATTENDANCE.CHECKOUT_BUTTON
          : TEXTS.ATTENDANCE.CHECKIN_BUTTON}
      </Button>
    </Box>
  );
};

export default Attendance;
