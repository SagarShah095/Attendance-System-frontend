import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  return (
     <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Employees" value="120" />
            <StatCard title="Departments" value="8" />
            <StatCard title="Today Attendance" value="95%" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-surface border border-border rounded-md shadow-card p-6">
    <p className="text-sm text-textSecondary">{title}</p>
    <h3 className="text-3xl font-semibold mt-2">{value}</h3>
  </div>
);

export default Dashboard;
