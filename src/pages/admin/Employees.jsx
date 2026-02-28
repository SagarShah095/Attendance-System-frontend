import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddEmployeeSidebar from "../../components/Employee/AddEmployeeSidebar";
import { allEmp, deleteEmp } from "../../service";
import { useToast } from "../../context/ToastContext";
import { FaEdit, FaTrash, FaPlus, FaUsers } from "react-icons/fa";
import Loader from "../../components/shared/Loader";

const Employees = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalEmp, setTotalEmp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { showToast } = useToast();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isHr = currentUser.role === "hr";
  const hrPerms = currentUser.hrPermissions || {};

  const canViewSalary = currentUser.role === "admin" || (isHr && hrPerms.viewSalary);
  const canCreate = currentUser.role === "admin" || (isHr && hrPerms.createEmployee);
  const canEdit = currentUser.role === "admin" || (isHr && hrPerms.editEmployee);
  const canDelete = currentUser.role === "admin" || (isHr && hrPerms.deleteEmployee);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await allEmp({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    setSelectedEmployee(emp);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <>
      <div className="flex h-screen bg-background text-textPrimary font-sans">
        <Sidebar />
        <div className="flex-1 ml-72 flex flex-col h-screen overflow-hidden transition-all duration-300">
          <Navbar />

          <div className="flex-1 p-8 pt-0 overflow-auto">

            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">People</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your team members and their roles.</p>
              </div>

              {canCreate && (
                <button
                  onClick={() => {
                    setSelectedEmployee(null);
                    setIsOpen(true);
                  }}
                  className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center gap-2 font-bold text-sm active:scale-95"
                >
                  <FaPlus />
                  Add Employee
                </button>
              )}
            </div>

            <div className="bg-surface rounded-3xl shadow-soft overflow-hidden border border-border">
              <table className="w-full text-left border-collapse">
                <thead className="bg-background/50 border-b border-border text-xs font-bold text-textSecondary uppercase tracking-wider">
                  <tr>
                    <th className="p-5">Details</th>
                    <th className="p-5">Department</th>
                    <th className="p-5">Contact</th>
                    <th className="p-5">Position</th>
                    <th className="p-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="p-12 text-center">
                        <Loader />
                      </td>
                    </tr>
                  ) : (
                    totalEmp?.map((emp) => (
                      <tr key={emp._id} className="hover:bg-background/80 transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                              {emp?.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-sm text-textPrimary">{emp?.name}</p>
                              <p className="text-xs text-textSecondary">{emp?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="px-3 py-1 bg-background text-textSecondary rounded-lg text-xs font-bold border border-transparent group-hover:border-border transition-colors">
                            {emp?.department}
                          </span>
                        </td>
                        <td className="p-5">
                          <p className="text-sm font-medium text-textSecondary">{emp?.phoneNumber}</p>
                        </td>
                        <td className="p-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-textPrimary">{emp?.position}</span>
                            {canViewSalary ? (
                              <span className="text-xs text-primary font-mono font-medium">${emp?.salary}</span>
                            ) : (
                              <span className="text-xs text-textSecondary font-medium">--</span>
                            )}
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {canEdit && (
                              <button onClick={() => handleEdit(emp)} className="h-8 w-8 rounded-lg flex items-center justify-center text-textSecondary hover:text-primary hover:bg-primary/10 transition-colors">
                                <FaEdit size={14} />
                              </button>
                            )}
                            {canDelete && (
                              <button onClick={() => handleDelete(emp._id)} className="h-8 w-8 rounded-lg flex items-center justify-center text-textSecondary hover:text-danger hover:bg-danger/10 transition-colors">
                                <FaTrash size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {!loading && totalEmp.length === 0 && (
                <div className="p-12 text-center">
                  <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mx-auto mb-4 text-textSecondary">
                    <FaUsers size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary">No employees found</h3>
                  <p className="text-textSecondary text-sm mt-1">Get started by adding a new employee to your team.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mount Sidebar at Root Level to avoid stacking context/overflow issues */}
      <AddEmployeeSidebar isOpen={isOpen} setIsOpen={setIsOpen} selectedEmployee={selectedEmployee} refreshEmployees={fetchEmployee} />
    </>
  );
};

export default Employees;
