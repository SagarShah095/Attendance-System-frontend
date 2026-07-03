import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Emp_dashboard from "./pages/employee/Emp_dashboard";
import Profile from "./pages/employee/Profile";
import Attendance from "./pages/employee/Attendance";
import Salary from "./pages/employee/Salary";
import LeaveRequests from "./pages/employee/LeaveRequests";
import { isAuthenticated } from "./utils/auth";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoutes from "./routes/AdminRoutes";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Default */}
            <Route
              path="/"
              element={
                isAuthenticated() ? (
                  localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "hr"
                    ? <Navigate to="/admin/dashboard" />
                    : <Navigate to="/employee/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Login */}
            <Route
              path="/login"
              element={
                isAuthenticated() ? (
                  localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "hr"
                    ? <Navigate to="/admin/dashboard" />
                    : <Navigate to="/employee/dashboard" />
                ) : (
                  <Login />
                )
              }
            />

            {/* Employee Protected Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <PrivateRoute>
                  <Emp_dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/attendance"
              element={
                <PrivateRoute>
                  <Attendance />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/salary"
              element={
                <PrivateRoute>
                  <Salary />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/leaves"
              element={
                <PrivateRoute>
                  <LeaveRequests />
                </PrivateRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminRoutes />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
