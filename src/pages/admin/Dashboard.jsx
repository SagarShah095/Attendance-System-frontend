import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { FaUsers, FaBuilding, FaCheckCircle, FaMoneyBillWave, FaFileAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background text-textPrimary font-sans">
      <Sidebar />

      <div className="flex-1 ml-72 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <Navbar />

        <div className="flex-1 overflow-auto p-8 pt-0">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-textPrimary">Dashboard Overview</h1>
            <p className="text-xs font-medium text-textSecondary mt-1 uppercase tracking-wider">Welcome back, Admin</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Employees"
              value="120"
              icon={<FaUsers size={24} className="text-white" />}
              trend="+5% from last month"
              trendColor="text-emerald-500"
              color="bg-purple-500"
            />
            <StatCard
              title="Total Departments"
              value="8"
              icon={<FaBuilding size={24} className="text-white" />}
              trend="No Change"
              trendColor="text-textSecondary"
              color="bg-blue-500"
            />
            <StatCard
              title="Monthly Salary"
              value="$45,000"
              icon={<FaMoneyBillWave size={24} className="text-white" />}
              trend="+12% due to bonuses"
              trendColor="text-emerald-500"
              color="bg-emerald-500"
            />
            <StatCard
              title="Leave Requests"
              value="5"
              icon={<FaFileAlt size={24} className="text-white" />}
              trend="2 pending approval"
              trendColor="text-amber-500"
              color="bg-amber-500"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Placeholders for Charts */}
            <div className="bg-surface p-6 rounded-2xl shadow-soft border border-border h-80 flex items-center justify-center">
              <p className="text-textSecondary font-medium">Attendance Analytics Chart</p>
            </div>
            <div className="bg-surface p-6 rounded-2xl shadow-soft border border-border h-80 flex items-center justify-center">
              <p className="text-textSecondary font-medium">Department Distribution</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, trendColor, color }) => (
  <div className="bg-surface rounded-2xl shadow-soft border border-border p-6 transition-all duration-300 hover:shadow-medium hover:-translate-y-1 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-textSecondary uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-textPrimary mt-1 group-hover:text-primary transition-colors">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl shadow-lg shadow-black/5 ${color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className={`mt-4 text-xs font-bold flex items-center gap-1 ${trendColor}`}>
        {trendColor.includes("emerald") ? "↑" : "•"} {trend}
      </div>
    )}
  </div>
);

export default Dashboard;
