import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddEmployeeSidebar from "../../components/Employee/AddEmployeeSidebar";
import { allEmp } from "../../service";

const Employees = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalEmp, setTotalEmp] = useState([]);
  const token = localStorage.getItem("token");

  const fetchEmployee = async () => {
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
          <AddEmployeeSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Employees</h2>
            <Link
              onClick={() => {
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
              </tr>
            </thead>
            {totalEmp?.map((emp, i) => (
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4">{emp?.name}</td>
                  <td className="p-4">{emp?.email}</td>
                  <td className="p-4">{emp?.department}</td>
                  <td className="p-4">{emp?.phoneNumber}</td>
                  <td className="p-4">{emp?.position}</td>
                  <td className="p-4">{emp?.salary}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
