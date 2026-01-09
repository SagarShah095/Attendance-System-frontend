import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../shared/Input";
import Select from "../shared/Select";
import { register } from "../../service";

const AddEmployeeSidebar = ({ isOpen, setIsOpen }) => {
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
  });

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);

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
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50
        transform transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Employee</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto h-[calc(100%-64px)]"
        >
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={["admin", "employee"]}
          />
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />

          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            label="Salary"
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <Input
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Employee
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployeeSidebar;
