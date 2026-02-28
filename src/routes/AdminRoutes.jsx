import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Employees from "../pages/admin/Employees";
import Departments from "../pages/admin/Departments";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/departments" element={<Departments />} />
    </Routes>
  );
};

export default AdminRoutes;
