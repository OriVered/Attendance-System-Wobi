import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { fetchAttendance, submitAttendance } from "../services/attendanceService"; 
import TEXTS from "../consts/texts";
import { AttendanceRecord } from "../types/attendanceTypes";

/**
 * Admin Component:
 * Provides a dashboard for administrators to manage attendance records.
 *
 * Features:
 * - Fetches and displays attendance records for all users.
 * - Allows editing of check-in and check-out times directly in the table.
 * - Updates attendance records via API calls.
 * - Displays loading, success, and error states.
 *
 * Hooks:
 * - `useAuth`: To access the current user's authentication token.
 * - `useEffect`: To fetch attendance records on component mount.
 *
 * State:
 * - `attendanceRecords`: Stores the list of attendance records.
 * - `loading`: Indicates whether attendance records are being fetched.
 * - `error`: Stores error messages if fetching or updating fails.
 * - `success`: Stores success messages upon successful updates.
 */
const Admin: React.FC = () => {
  const { auth } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadAttendanceRecords = async () => {
      try {
        setLoading(true);
        const records = await fetchAttendance(auth.token || ""); 
        setAttendanceRecords(records);
        setError(null);
      } catch {
        setError("Failed to fetch attendance records.");
      } finally {
        setLoading(false);
      }
    };
    loadAttendanceRecords();
  }, [auth.token]);

  const handleUpdate = async (index: number) => {
    const record = attendanceRecords[index];
    try {
      await submitAttendance(record, auth.token || ""); 
      setSuccess(`Attendance updated for ${record.userName}`);
      setError(null);
    } catch {
      setError("Failed to update attendance.");
      setSuccess(null);
    }
  };

  const handleFieldChange = (index: number, field: "checkIn" | "checkOut", value: string) => {
    const updatedRecords = [...attendanceRecords];
    updatedRecords[index][field] = value;
    setAttendanceRecords(updatedRecords);
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        {TEXTS.ADMIN.TITLE}
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{TEXTS.ADMIN.TABLE_HEADERS.USERNAME}</TableCell>
            <TableCell>{TEXTS.ADMIN.TABLE_HEADERS.CHECKIN}</TableCell>
            <TableCell>{TEXTS.ADMIN.TABLE_HEADERS.CHECKOUT}</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.userName}</TableCell>
              <TableCell>
                <TextField
                  value={record.checkIn}
                  onChange={(e) => handleFieldChange(index, "checkIn", e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={record.checkOut}
                  onChange={(e) => handleFieldChange(index, "checkOut", e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdate(index)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Admin;
