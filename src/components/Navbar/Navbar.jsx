import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-surface border-b border-border px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-medium">Dashboard</h2>

      <button
        onClick={() => handleLogout()}
        className="text-sm text-danger hover:underline"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
