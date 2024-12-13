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
 * - Integrates with AuthContext and TimeContext for user info and time.
 */
const Attendance: React.FC = () => {
  const { auth } = useAuth();
  const { currentTime } = useTime();
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCheckIn = async () => {
    if (!currentTime) return;
    try {
      await submitAttendance({ checkIn: currentTime }, auth.token || "");
      setIsCheckedIn(true);
      setCheckInTime(currentTime);
      setSuccess(TEXTS.ATTENDANCE.SUCCESS_MESSAGE);
    } catch {
      setError(TEXTS.ATTENDANCE.ERROR_MESSAGE);
    }
  };

  const handleCheckOut = async () => {
    if (!currentTime) return;
    try {
      await submitAttendance({ checkOut: currentTime }, auth.token || "");
      setIsCheckedIn(false);
      setCheckInTime(null);
      setSuccess(TEXTS.ATTENDANCE.SUCCESS_MESSAGE);
    } catch {
      setError(TEXTS.ATTENDANCE.ERROR_MESSAGE);
    }
  };

  const calculateShiftHours = () => {
    if (!checkInTime || !currentTime) return null;
    const checkInDate = new Date(checkInTime);
    const currentDate = new Date(currentTime);
    const hours = Math.abs(currentDate.getTime() - checkInDate.getTime()) / 36e5;
    return hours.toFixed(1);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
      <Typography variant="h4" gutterBottom>{TEXTS.ATTENDANCE.TITLE}</Typography>
      <Typography variant="h6" gutterBottom>
        {TEXTS.ATTENDANCE.WELCOME_MESSAGE.replace("{username}", auth?.username || "N/A")}
      </Typography>
      {isCheckedIn ? (
        <Typography variant="body1" gutterBottom>
          {TEXTS.ATTENDANCE.SHIFT_STATUS.ON_SHIFT.replace("{hours}", calculateShiftHours() || "0")}
        </Typography>
      ) : (
        <Typography variant="body1" gutterBottom>
          {TEXTS.ATTENDANCE.SHIFT_STATUS.OFF_SHIFT}
        </Typography>
      )}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Button
        variant="contained"
        color={isCheckedIn ? "secondary" : "primary"}
        onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
        sx={{ mt: 2 }}
      >
        {isCheckedIn ? TEXTS.ATTENDANCE.CHECKOUT_BUTTON : TEXTS.ATTENDANCE.CHECKIN_BUTTON}
      </Button>
    </Box>
  );
};

export default Attendance;
