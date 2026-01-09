import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Employees", path: "/admin/employees" },
  { name: "Departments", path: "/admin/departments" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-primary text-white px-6 py-6">
      {/* Brand */}
      <div className="mb-10">
        <h1 className="text-lg font-semibold tracking-wide">
          Attendance System
        </h1>
        <p className="text-xs text-gray-300 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 ">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-white text-primary"
                  : "text-gray-300 hover:bg-primary  hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
