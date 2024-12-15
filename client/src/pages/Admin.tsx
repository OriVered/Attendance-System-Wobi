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
 * A dashboard for administrators to manage attendance records.
 *
 * Features:
 * - Fetches and displays attendance records for all users.
 * - Allows editing of check-in and check-out times directly in the table.
 * - Updates attendance records via API calls.
 * - Displays loading, success, and error states.
 *
 * State Management:
 * - `attendanceRecords`: Stores the list of attendance records fetched from the API.
 * - `loading`: Indicates whether the app is currently fetching data.
 * - `error`: Stores error messages to display when a fetch or update fails.
 * - `success`: Stores success messages to display after a successful update.
 */
const Admin: React.FC = () => {
  const { auth } = useAuth(); // Access authentication context

  // State for managing attendance data and UI feedback
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /**
   * Fetch attendance records on component mount.
   * 
   * Features:
   * - Calls the `fetchAttendance` service with the user's token.
   * - Updates `attendanceRecords` with the fetched data.
   * - Handles errors by updating the `error` state.
   */
  useEffect(() => {
    const loadAttendanceRecords = async () => {
      try {
        setLoading(true);
        const records = await fetchAttendance(auth.token || "");
        setAttendanceRecords(records);
        setError(null); // Clear previous errors
      } catch {
        setError(TEXTS.ADMIN.ERROR_UPDATE); 
      } finally {
        setLoading(false); // Stop loading animation
      }
    };

    loadAttendanceRecords();
  }, [auth.token]);

  /**
   * Updates a specific attendance record in the table.
   * 
   * Steps:
   * - Sends the updated record to the `submitAttendance` service.
   * - Displays a success message if the update is successful.
   * - Displays an error message if the update fails.
   *
   * @param {number} index - The index of the record to update.
   */
  const handleUpdate = async (index: number) => {
    const record = attendanceRecords[index];
    try {
      await submitAttendance(record, auth.token || "");
      setSuccess(TEXTS.ADMIN.SUCCESS_UPDATE); 
      setError(null); // Clear previous errors
    } catch {
      setError(TEXTS.ADMIN.ERROR_UPDATE);
      setSuccess(null); // Clear previous success messages
    }
  };

  /**
   * Handles input changes for check-in and check-out fields.
   * Updates the local state to reflect changes in the table inputs.
   *
   * @param {number} index - The index of the record being updated.
   * @param {"checkIn" | "checkOut"} field - The field being updated (check-in or check-out).
   * @param {string} value - The new value for the field.
   */
  const handleFieldChange = (
    index: number,
    field: "checkIn" | "checkOut",
    value: string
  ) => {
    const updatedRecords = [...attendanceRecords];
    updatedRecords[index][field] = value;
    setAttendanceRecords(updatedRecords);
  };

  return (
    <Box mt={4}>
      {/* Page title */}
      <Typography variant="h4" gutterBottom>
        {TEXTS.ADMIN.TITLE}
      </Typography>

      {/* Feedback messages */}
      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Attendance table */}
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
                  {TEXTS.ADMIN.TABLE_HEADERS.UPDATE_BUTTON}
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
