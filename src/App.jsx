import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
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
