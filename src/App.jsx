import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils/auth";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoutes from "./routes/AdminRoutes";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Default */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/admin/dashboard" />
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
                <Navigate to="/admin/dashboard" />
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
  );
}

export default App;
