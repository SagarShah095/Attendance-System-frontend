import { useEffect, useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { MdDelete, MdEdit } from "react-icons/md";
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Departments</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
            >
              + Add Department
            </button>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => <DepartmentSkeleton key={i} />)
                ) : departments.length ? (
                  departments.map((dept) => (
                    <tr key={dept._id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium">{dept.department}</td>
                      <td className="p-4 text-gray-600">{dept.description}</td>
                      <td className="p-4 flex gap-2">
                        <span
                          onClick={() => handleEdit(dept)}
                          className="p-2 cursor-pointer hover:text-blue-600 hover:bg-black/10 rounded-full"
                        >
                          <MdEdit />
                        </span>
                        <span
                          onClick={() => handleDelete(dept._id)}
                          className="p-2 cursor-pointer hover:text-red-600 hover:bg-black/10 rounded-full"
                        >
                          <MdDelete />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-6 text-center text-gray-500">
                      No departments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg animate-scaleIn">
              <div className="flex justify-between items-center p-5 border-b">
                <h3 className="text-lg font-semibold">
                  {isEditMode ? "Edit Department" : "Add Department"}
                </h3>
                <button onClick={closeModal} className="text-xl">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows={3}
                  className="w-full border rounded px-3 py-2"
                />
                <button className="w-full bg-indigo-600 text-white py-2 rounded">
                  {isEditMode ? "Update" : "Save"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
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
