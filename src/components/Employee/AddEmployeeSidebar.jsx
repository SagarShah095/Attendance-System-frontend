import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../shared/Input";
import Select from "../shared/Select";
import { register, updateEmp, getAllDepartment } from "../../service";
import { useToast } from "../../context/ToastContext";
import { FaTimes } from "react-icons/fa";

const AddEmployeeSidebar = ({ isOpen, setIsOpen, selectedEmployee, refreshEmployees }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employee",
    name: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    salary: "",
    position: "",
    department: "",
    address: "",
    city: "",
    hrPermissions: {
      viewSalary: false,
      createEmployee: false,
      editEmployee: false,
      deleteEmployee: false,
    }
  });
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  console.log(departments, "departments")

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getAllDepartment({
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res?.data?.success) {
          setDepartments(res?.data?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const fetchAllDept = async () => {
    try {
      const res = await getAllDepartment({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res?.data?.success) {
        setDepartments(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllDept();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        email: selectedEmployee.email || "",
        password: "", // Don't pre-fill password
        role: selectedEmployee.role || "employee",
        name: selectedEmployee.name || "",
        gender: selectedEmployee.gender || "",
        dateOfBirth: selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth).toISOString().split('T')[0] : "",
        phoneNumber: selectedEmployee.phoneNumber || "",
        salary: selectedEmployee.salary || "",
        position: selectedEmployee.position || "",
        department: selectedEmployee.department || "",
        address: selectedEmployee.address || "",
        city: selectedEmployee.city || "",
        hrPermissions: selectedEmployee.hrPermissions || {
          viewSalary: false,
          createEmployee: false,
          editEmployee: false,
          deleteEmployee: false,
        }
      });
    } else {
      setFormData({
        email: "",
        password: "",
        role: "employee",
        name: "",
        gender: "",
        dateOfBirth: "",
        phoneNumber: "",
        salary: "",
        position: "",
        department: "",
        address: "",
        city: "",
        hrPermissions: {
          viewSalary: false,
          createEmployee: false,
          editEmployee: false,
          deleteEmployee: false,
        }
      });
    }
  }, [selectedEmployee, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (e) => {
    setFormData({
      ...formData,
      hrPermissions: {
        ...formData.hrPermissions,
        [e.target.name]: e.target.checked
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (selectedEmployee) {
        await updateEmp(selectedEmployee._id, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showToast("Employee updated successfully", "success");
      } else {
        await register(formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showToast("Employee added successfully", "success");
      }

      setIsOpen(false);
      setFormData({
        email: "",
        password: "",
        role: "employee",
        name: "",
        gender: "",
        dateOfBirth: "",
        phoneNumber: "",
        salary: "",
        position: "",
        department: "",
        address: "",
        city: "",
        hrPermissions: {
          viewSalary: false,
          createEmployee: false,
          editEmployee: false,
          deleteEmployee: false,
        }
      });
      if (refreshEmployees) refreshEmployees();
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Sidebar */}
        <div className="relative w-full max-w-md h-full bg-surface shadow-2xl transform transition-transform duration-300 ease-out border-l border-border flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-background/50">
            <h2 className="text-xl font-bold text-textPrimary">
              {selectedEmployee ? "Edit Employee" : "Add New Employee"}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-background text-textSecondary hover:text-textPrimary transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-3">
                Personal Information
              </h3>

              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
              />

              <Input
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={selectedEmployee ? "Leave blank to keep current" : "••••••••"}
                required={!selectedEmployee}
              />
            </div>

            <div className="h-px bg-border my-6"></div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-3">
                Professional Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={
                    JSON.parse(localStorage.getItem("user") || "{}").role === "admin"
                      ? ["admin", "employee", "hr"]
                      : ["employee"]
                  }
                />

                <Select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={["Male", "Female", "Other"]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-textSecondary">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-textPrimary appearance-none"
                    required
                  >
                    <option value="">Select Dept</option>
                    {(departments || []).map((dept) => (
                      <option key={dept._id} value={dept.department}>
                        {dept.department}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Senior Dev"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />

                <Input
                  label="Salary"
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            {formData.role === "hr" && (
              <>
                <div className="h-px bg-border my-6"></div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-3">
                    HR Permissions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 text-sm text-textPrimary cursor-pointer">
                      <input type="checkbox" name="viewSalary" checked={formData.hrPermissions.viewSalary} onChange={handlePermissionChange} className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
                      <span>View Salary</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-textPrimary cursor-pointer">
                      <input type="checkbox" name="createEmployee" checked={formData.hrPermissions.createEmployee} onChange={handlePermissionChange} className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
                      <span>Create Employee</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-textPrimary cursor-pointer">
                      <input type="checkbox" name="editEmployee" checked={formData.hrPermissions.editEmployee} onChange={handlePermissionChange} className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
                      <span>Edit Employee</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-textPrimary cursor-pointer">
                      <input type="checkbox" name="deleteEmployee" checked={formData.hrPermissions.deleteEmployee} onChange={handlePermissionChange} className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
                      <span>Delete Employee</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="h-px bg-border my-6"></div>

            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">Employee ID/Action</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="EMP-001"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-textPrimary placeholder:text-textSecondary"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-surface">
            <button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {selectedEmployee ? "Update Details" : "Create Employee Profile"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEmployeeSidebar;
