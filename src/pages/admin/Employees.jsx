import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddEmployeeSidebar from "../../components/Employee/AddEmployeeSidebar";
import { allEmp, deleteEmp } from "../../service";
import { useToast } from "../../context/ToastContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Employees = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalEmp, setTotalEmp] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { showToast } = useToast();

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await allEmp({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.success) {
        setTotalEmp(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmp(id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showToast("Employee deleted successfully", "success");
        fetchEmployee();
      } catch (error) {
        console.error(error);
        showToast("Failed to delete employee", "error");
      }
    }
  };

  const handleEdit = (emp) => {
    console.log("Editing employee:", emp); // Debugging
    setSelectedEmployee(emp);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  console.log(totalEmp, "totalEmp");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <AddEmployeeSidebar isOpen={isOpen} setIsOpen={setIsOpen} selectedEmployee={selectedEmployee} refreshEmployees={fetchEmployee} />
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Employees</h2>
            <Link
              onClick={() => {
                setSelectedEmployee(null);
                setIsOpen(true);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Add Employee
            </Link>
          </div>

          <table className="w-full bg-surface border border-border rounded-md shadow-card">
            <thead className="bg-background text-sm text-textSecondary">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Phone Number</th>
                <th className="p-4 text-left">Position</th>
                <th className="p-4 text-left">Salary</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            {loading
              ? (
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-t animate-pulse">
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="p-4">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )

              : (
                <tbody>
                  {totalEmp?.map((emp, i) => (
                    <tr key={emp._id} className="border-t border-border">
                      <td className="p-4">{emp?.name}</td>
                      <td className="p-4">{emp?.email}</td>
                      <td className="p-4">{emp?.department}</td>
                      <td className="p-4">{emp?.phoneNumber}</td>
                      <td className="p-4">{emp?.position}</td>
                      <td className="p-4">{emp?.salary}</td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
