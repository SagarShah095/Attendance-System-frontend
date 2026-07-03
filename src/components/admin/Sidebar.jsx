import { NavLink } from "react-router-dom";
import { FaUserTie, FaBuilding, FaTachometerAlt } from "react-icons/fa";

const links = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
  { name: "Employees", path: "/admin/employees", icon: <FaUserTie /> },
  { name: "Departments", path: "/admin/departments", icon: <FaBuilding /> },
];

const Sidebar = () => {
  return (
    <aside className="w-72 fixed h-full bg-surface border-r border-border z-30 transition-all duration-300 flex flex-col">
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-border mb-0">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <FaBuilding size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-textPrimary leading-none">
              Nexus<span className="text-primary">HR</span>
            </h1>
            <p className="text-[10px] text-textSecondary font-medium tracking-wider mt-0.5">ADMIN DASHBOARD</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-bold text-textSecondary uppercase tracking-widest mb-4 ml-1">
          Main Menu
        </p>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 group relative overflow-hidden
              ${isActive
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "text-textSecondary hover:bg-background hover:text-textPrimary"
              }`
            }
          >
            <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${({ isActive }) => isActive ? 'text-white' : 'text-textSecondary group-hover:text-primary'}`}>{link.icon}</span>
            {link.name}
            {/* Active Indicator Dot */}

          </NavLink>
        ))}
      </nav>

      {/* Footer User Profile Summary (Optional) */}
      <div className="p-6 border-t border-border">
        <div className="bg-background rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-textPrimary truncate">Admin User</p>
            <p className="text-xs text-textSecondary truncate">admin@nexus.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
