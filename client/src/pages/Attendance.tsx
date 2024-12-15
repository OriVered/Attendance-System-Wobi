import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useTime } from "../context/TimeContext";
import { submitAttendance, fetchShiftStatus } from "../services/attendanceService";
import TEXTS from "../consts/texts";

/**
 * Component for managing attendance actions such as checking in and out.
 *
 * Features:
 * - Fetches shift status from the server on mount and after actions.
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
   * Fetches the user's current shift status from the server.
   *
   * Features:
   * - Updates the local state with the fetched shift status.
   * - Handles errors during the API request.
   */
  const fetchStatus = async () => {
    if (!auth.token) return; // Exit if no authentication token is available
    try {
      const { isCheckedIn, checkInTime } = await fetchShiftStatus(auth.token);
      setIsCheckedIn(isCheckedIn);
      setCheckInTime(checkInTime);
    } catch {
      setError(TEXTS.ATTENDANCE.ERROR_FETCH_STATUS); // Display error if fetch fails
    }
  };

  /**
   * Fetches the shift status on component mount.
   *
   * Features:
   * - Ensures the attendance component always has the latest server state on load.
   */
  useEffect(() => {
    fetchStatus(); // Fetch shift status on initial render
  }, []);

  /**
   * Handles the check-in action.
   *
   * Features:
   * - Submits a check-in record to the server.
   * - Updates the local state to reflect the new shift status.
   * - Fetches the latest status from the server.
   */
  const handleCheckIn = async () => {
    if (!currentTime) return; // Exit if the current time is not available
    try {
      await submitAttendance(
        {
          userName: auth.username,
          checkIn: currentTime,
          checkOut: null,
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
    fetchStatus(); // Refresh the status after check-in
  };

  /**
   * Handles the check-out action.
   *
   * Features:
   * - Submits a check-out record to the server.
   * - Updates the local state to reflect the end of the shift.
   * - Fetches the latest status from the server.
   */
  const handleCheckOut = async () => {
    if (!currentTime) return; // Exit if the current time is not available
    try {
      await submitAttendance(
        {
          userName: auth.username,
          checkIn: checkInTime,
          checkOut: currentTime,
        },
        auth.token || ""
      );
      setIsCheckedIn(false);
      setCheckInTime(null);
      setSuccess(TEXTS.ATTENDANCE.SUCCESS_MESSAGE);
      setError(null); // Clear any previous errors
    } catch {
      setError(TEXTS.ATTENDANCE.ERROR_MESSAGE);
      setSuccess(null); // Clear any previous success messages
    }
    fetchStatus(); // Refresh the status after check-out
  };

/**
 * Calculates the duration of the current shift in hours and minutes.
 *
 * @returns {string} The duration of the shift in the format "X hours Y minutes", or "0 minutes" if unavailable.
 */
const calculateShiftDuration = () => {
  if (!checkInTime || !currentTime) return "0 minutes"; // Return "0 minutes" if times are unavailable

  const checkInDate = new Date(checkInTime);
  const currentDate = new Date(currentTime);

  // Validate that both dates are valid
  if (isNaN(checkInDate.getTime()) || isNaN(currentDate.getTime())) {
    console.error("Invalid date format:", { checkInTime, currentTime });
    return "0 minutes";
  }

  // Calculate the difference in milliseconds
  const diffMs = Math.abs(currentDate.getTime() - checkInDate.getTime());

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(diffMs / 36e5); // Divide by 3600000 to get hours
  const minutes = Math.floor((diffMs % 36e5) / 60000); // Remainder divided by 60000 to get minutes

  // Format the result
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
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
          {isCheckedIn
            ? TEXTS.ATTENDANCE.SHIFT_STATUS.ON_SHIFT.replace(
                "{duration}",
                calculateShiftDuration()
              )
            : TEXTS.ATTENDANCE.SHIFT_STATUS.OFF_SHIFT}
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
        onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
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
