import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Login page
import Attendance from "./pages/Attendance"; // Attendance page
import Admin from "./pages/Admin"; // Admin page
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
import { TimeProvider } from "./context/TimeContext"; // Provides global time context
import ClockLayout from "./components/ClockLayout"; // Layout component with time header
import { AuthProvider } from "./context/AuthContext"; // Provides global authentication context
import APP_ROUTES from "./consts/appRoutes"; // Centralized route constants

/**
 * Main application component that sets up routing, contexts, and layouts.
 *
 * Features:
 * - Provides global contexts for authentication and time management.
 * - Configures routes for login, attendance, and admin pages.
 * - Protects routes based on user roles using `ProtectedRoute`.
 * - Wraps all pages with a common `ClockLayout` for consistent UI.
 */
const App: React.FC = () => {
  return (
    <TimeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Login Page: Accessible to all users */}
            <Route
              path={APP_ROUTES.LOGIN}
              element={
                <ClockLayout>
                  <Login />
                </ClockLayout>
              }
            />

            {/* Attendance Page: Restricted to users with "user" role */}
            <Route
              path={APP_ROUTES.ATTENDANCE}
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <ClockLayout>
                    <Attendance />
                  </ClockLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Page: Restricted to users with "admin" role */}
            <Route
              path={APP_ROUTES.ADMIN}
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ClockLayout>
                    <Admin />
                  </ClockLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </TimeProvider>
  );
};

export default App;
