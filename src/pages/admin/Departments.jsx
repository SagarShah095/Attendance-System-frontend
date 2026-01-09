import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Departments = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Departments</h2>

          <ul className="bg-white shadow rounded p-4 space-y-2">
            <li>HR</li>
            <li>IT</li>
            <li>Finance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Departments;
