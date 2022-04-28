import { NavLink } from "react-router-dom";
import { capitalize } from "../../utils/constants";

export const NavItem = ({ path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "navLinkActive" : "navLink")}
    >
      {capitalize(path)}
    </NavLink>
  );
};
