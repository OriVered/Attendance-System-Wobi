/**
 * Centralized user-facing texts.
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
    CHECKIN_LABEL: "Check-in Time",
    CHECKOUT_LABEL: "Check-out Time",
    BUTTON_TEXT: "Submit",
    SUCCESS_MESSAGE: "Attendance submitted successfully!",
    ERROR_MESSAGE: "Failed to submit attendance. Please try again.",
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

  