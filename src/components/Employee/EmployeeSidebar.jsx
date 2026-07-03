import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome size={18} />,
      path: "/employee/dashboard",
    },
    {
      title: "Profile",
      icon: <FaUser size={18} />,
      path: "/employee/profile",
    },
    {
      title: "Attendance",
      icon: <FaCalendarCheck size={18} />,
      path: "/employee/attendance",
    },
    {
      title: "Salary",
      icon: <FaMoneyBillWave size={18} />,
      path: "/employee/salary",
    },
    {
      title: "Leave Requests",
      icon: <FaFileAlt size={18} />,
      path: "/employee/leaves",
    },
    {
      title: "Settings",
      icon: <FaCog size={18} />,
      path: "/employee/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface border-r border-border shadow-soft flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Employee Panel</h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-textSecondary hover:bg-primary hover:text-white hover:shadow-medium"
                  }`
                }
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border p-4">
        <div className="bg-background rounded-2xl p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              {currentUser?.name?.charAt(0) || "E"}
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-textPrimary">
                {currentUser?.name || "Employee"}
              </h4>
              <p className="text-xs text-textSecondary">
                {currentUser?.position || "Employee"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl font-medium transition-all hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;