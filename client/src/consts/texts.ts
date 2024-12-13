/**
 * TEXTS object:
 * A collection of static text values used throughout the application.
 *
 * Features:
 * - Provides localized text for components like Login, Attendance, and Admin Dashboard.
 * - Supports dynamic text interpolation for personalized messages.
 */

export const TEXTS = {
  LOGIN: {
    TITLE: "Login",
    USERNAME_LABEL: "Username",
    PASSWORD_LABEL: "Password",
    BUTTON_TEXT: "Login",
    ERROR_MESSAGE: "Invalid username or password. Please try again.",
  },
  ATTENDANCE: {
    TITLE: "Attendance",
    CHECKIN_BUTTON: "Check In",
    CHECKOUT_BUTTON: "Check Out",
    SUCCESS_MESSAGE: "Attendance successfully recorded!",
    ERROR_MESSAGE: "Failed to record attendance. Please try again.",
    WELCOME_MESSAGE: "Welcome, {username}!",
    SHIFT_STATUS: {
      ON_SHIFT: "You have been on shift for {hours} hours.",
      OFF_SHIFT: "Please check in to start your shift.",
    },
  },
  ADMIN: {
    TITLE: "Admin Dashboard",
    TABLE_HEADERS: {
      USERNAME: "Username",
      CHECKIN: "Check-in Time",
      CHECKOUT: "Check-out Time",
    },
  },
  CLOCK_LAYOUT: {
    ERROR_MESSAGE: "Failed to fetch the current time.",
    CURRENT_TIME_LABEL: "Current Time:",
  },
};


export default TEXTS;
