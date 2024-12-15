/**
 * TEXTS object:
 * A centralized collection of static text values used across the application.
 *
 * Features:
 * - Provides localized and reusable text for components like Login, Logout, Attendance, Admin Dashboard, and Authentication Context.
 * - Supports dynamic text interpolation for personalized or context-specific messages.
 * - Centralizes error, success, and general messages for easier maintenance and localization.
 */

export const TEXTS = {
  LOGIN: {
    TITLE: "Login", // Page title
    USERNAME_LABEL: "Username", // Input label for username
    PASSWORD_LABEL: "Password", // Input label for password
    BUTTON_TEXT: "Login", // Login button text
    ERROR_MESSAGE: "Invalid username or password. Please try again.", // Error message for failed login
    LOADING_MESSAGE: "Authenticating, please wait...", // Message displayed during login process
  },
  LOGOUT: {
    TITLE: "Logout", // Logout page title or confirmation
    BUTTON_TEXT: "Logout", // Logout button text
    SUCCESS_MESSAGE: "You have successfully logged out.", // Success message on logout
    ERROR_MESSAGE: "Failed to logout. Please try again.", // Error message for logout failures
  },
  AUTH: {
    INIT_ERROR: "Failed to initialize the authentication context.", // Error during context initialization
    ACCESS_DENIED: "Access denied. You are not authorized to view this page.", // Error for unauthorized access
    TOKEN_EXPIRED: "Your session has expired. Please log in again.", // Message for expired session tokens
  },
  ATTENDANCE: {
    TITLE: "Attendance", // Page title
    CHECKIN_BUTTON: "Check In", // Text on the button to check in
    CHECKOUT_BUTTON: "Check Out", // Text on the button to check out
    SUCCESS_MESSAGE: "Attendance successfully recorded!", // Success message for attendance submission
    ERROR_MESSAGE: "Failed to record attendance. Please try again.", // Error message for attendance submission failures
    WELCOME_MESSAGE: "Welcome, {username}!", // Welcome message with dynamic username
    SHIFT_STATUS: {
      ON_SHIFT: "You have been on shift for {duration}.",
      OFF_SHIFT: "You are not currently on a shift.",
    },
    FETCH_ERROR: "Failed to fetch attendance data. Please refresh and try again.", // Error when attendance data fails to load
    ERROR_FETCH_STATUS: "Failed to fetch shift status. Please try again.", // Error for fetching shift status
    ATTENDANCE_STATUS: "Fetching shift status, please wait...", // Status message when fetching attendance status
  },
  ADMIN: {
    TITLE: "Admin Dashboard", // Dashboard title
    TABLE_HEADERS: {
      USERNAME: "Username", // Column header for username
      CHECKIN: "Check-in Time", // Column header for check-in time
      CHECKOUT: "Check-out Time", // Column header for check-out time
      UPDATE_BUTTON: "Update", // Button text for updating records
    },
    SUCCESS_UPDATE: "Attendance updated successfully.", // Success message for updates
    ERROR_UPDATE: "Failed to update attendance. Please try again.", // Error message for update failures
    FETCH_ERROR: "Failed to load attendance records. Please try again later.", // Error when admin data fails to load
  },
  CLOCK_LAYOUT: {
    ERROR_MESSAGE: "Failed to fetch the current time.", // Error message for time-fetch failures
    CURRENT_TIME_LABEL: "Current Time:", // Label for displaying the current time
  },
  GENERAL: {
    ERROR_MESSAGE: "An unexpected error occurred. Please try again.", // Generic error message
    LOADING_MESSAGE: "Loading, please wait...", // Generic loading message
    WELCOME_MESSAGE: "Welcome to the application!", // General welcome message
    CONNECTION_ERROR: "Unable to connect to the server. Please check your internet connection.", // Error for network issues
  },
};

export default TEXTS;
