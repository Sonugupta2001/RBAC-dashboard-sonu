import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex justify-around">
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "font-bold" : "hover:underline"
            }
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              isActive ? "font-bold" : "hover:underline"
            }
          >
            Roles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/permissions"
            className={({ isActive }) =>
              isActive ? "font-bold" : "hover:underline"
            }
          >
            Permissions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;