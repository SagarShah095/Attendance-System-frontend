import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBell, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = currentUser.name || "User";
  const userRole = currentUser.role === "hr" ? "HR" : (currentUser.role === "admin" ? "Administrator" : "Employee");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-20 px-8 flex justify-between items-center sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border mb-6">
      {/* Search Bar (Visual Only) */}
      <div className="hidden md:flex items-center bg-surface rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-primary/50 transition-all shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-sm ml-2 w-full text-textPrimary placeholder:text-textSecondary"
        />
      </div>

      {/* Mobile Title */}
      <h2 className="md:hidden text-xl font-bold text-textPrimary">Nexus<span className="text-primary">HR</span></h2>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-textSecondary hover:text-primary hover:bg-primary/10 transition-colors"
        >
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>

        <button className="p-2 rounded-full text-textSecondary hover:text-primary hover:bg-primary/10 transition-colors relative">
          <FaBell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-danger rounded-full ring-2 ring-surface"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-textPrimary">{userName}</p>
            <p className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">{userRole}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-emerald-400 text-white shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
            title="Logout"
          >
            <FaSignOutAlt size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
