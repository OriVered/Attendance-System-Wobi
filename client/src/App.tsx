import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";//Login page
import Attendance from "./pages/Attendance";//Attendance page
import Admin from "./pages/Admin";//Admin page
import ProtectedRoute from "./components/ProtectedRoute";//ProtectedRoute Component
import { TimeProvider } from "./context/TimeContext"; // TimeContext for global time
import ClockLayout from "./components/ClockLayout"; // ClockLayout header element
import { AuthProvider } from "./context/AuthContext"; //AuthContext for global auth(guest, user, admin)
import APP_ROUTES from "./consts/appRoutes";// Routes consts

const App: React.FC = () => {
  return (
    <TimeProvider>
      <AuthProvider>
        <Router>
          <Routes>
          <Route
              path={APP_ROUTES.LOGIN}
              element={
                <ClockLayout>
                  <Login />
                </ClockLayout>
              }
            />
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
