import { useEffect, useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import Loader from "../../components/shared/Loader";
import { editDepartment, getAllDepartment } from "../../service/auth";

const Departments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    department: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= FETCH =================
  const fetchDepartment = async () => {
    setLoading(true);
    try {
      const res = await getAllDepartment();
      if (res?.data?.success) {
        setDepartments(res.data.departments);
      }
    } catch (error) {
      console.error(error.response?.data || error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode && editId) {
        const res = await editDepartment(editId, {
          department: formData.department,
          description: formData.description,
        });

        if (res?.data?.success) {
          setDepartments((prev) =>
            prev.map((dept) =>
              dept._id === editId ? res.data.data : dept
            )
          );
        }
      } else {
        // UI-only add (until API added)
        setDepartments((prev) => [
          ...prev,
          {
            _id: Date.now().toString(),
            department: formData.department,
            description: formData.description,
          },
        ]);
      }

      closeModal();
    } catch (error) {
      console.error(error.response?.data || error);
    }

    setLoading(false);
  };

  // ================= EDIT =================
  const handleEdit = (dept) => {
    setIsEditMode(true);
    setEditId(dept._id);
    setFormData({
      department: dept.department,
      description: dept.description,
    });
    setIsOpen(true);
  };

  // ================= DELETE (UI ONLY) =================
  const handleDelete = (id) => {
    setDepartments((prev) => prev.filter((dept) => dept._id !== id));
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditMode(false);
    setEditId(null);
    setFormData({ department: "", description: "" });
  };

  return (
    <>
      <div className="flex h-screen bg-background text-textPrimary font-sans">
        <Sidebar />
        <div className="flex-1 ml-72 flex flex-col h-screen overflow-hidden transition-all duration-300">
          <Navbar />

          <div className="flex-1 p-8 pt-0 overflow-auto">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-textPrimary">Departments</h2>
                <p className="text-sm text-textSecondary mt-1">Organize your company structure.</p>
              </div>

              <button
                onClick={() => {
                  setFormData({ department: "", description: "" });
                  setIsEditMode(false);
                  setIsOpen(true);
                }}
                className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center gap-2 font-bold text-sm active:scale-95"
              >
                <MdAdd size={20} />
                Add Department
              </button>
            </div>

            <div className="bg-surface rounded-3xl shadow-soft overflow-hidden border border-border">
              <table className="w-full text-left border-collapse">
                <thead className="bg-background/50 border-b border-border text-xs font-bold text-textSecondary uppercase tracking-wider">
                  <tr>
                    <th className="p-5 w-1/4">Name</th>
                    <th className="p-5 w-1/2">Description</th>
                    <th className="p-5 w-1/4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="p-12 text-center">
                        <Loader />
                      </td>
                    </tr>
                  ) : departments.length > 0 ? (
                    departments.map((dept) => (
                      <tr key={dept._id} className="hover:bg-background/80 transition-colors group">
                        <td className="p-5">
                          <span className="font-bold text-textPrimary">{dept.department}</span>
                        </td>
                        <td className="p-5">
                          <p className="text-sm text-textSecondary line-clamp-2">{dept.description}</p>
                        </td>
                        <td className="p-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(dept)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-textSecondary hover:text-primary hover:bg-primary/10 transition-colors"
                            title="Edit"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(dept._id)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-textSecondary hover:text-danger hover:bg-danger/10 transition-colors"
                            title="Delete"
                          >
                            <MdDelete size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-12 text-center">
                        <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center mx-auto mb-3 text-textSecondary">
                          <FaBuilding size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-textPrimary">No departments yet</h3>
                        <p className="text-textSecondary text-sm mt-1">Create your first department to get started.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl dark:shadow-black/50 animate-scaleIn overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditMode ? "Edit Department" : "Add New Department"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Department Name</label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Human Resources"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white dark:bg-gray-900 dark:text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter department description..."
                  rows={4}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none bg-white dark:bg-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
              <div className="pt-2">
                <button className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-3 rounded-lg shadow-md transition-all active:scale-[0.98]">
                  {isEditMode ? "Update Department" : "Create Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Departments;

// ================= SKELETON =================
const DepartmentSkeleton = () => (
  <tr className="border-t">
    <td className="p-4"><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></td>
    <td className="p-4"><div className="h-4 w-56 bg-gray-200 rounded animate-pulse" /></td>
    <td className="p-4 flex gap-2">
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
    </td>
  </tr>
);
