import { NavLink } from "react-router-dom";

const NavItem = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium transition
        ${
          isActive
            ? "bg-primary-dark text-white"
            : "text-gray-200 hover:bg-primary/60 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;
