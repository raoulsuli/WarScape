import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Button } from "./Button";
import { UserCircleIcon } from "@heroicons/react/outline";
import { NavItem } from "./utils/NavItem";

export const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/" className="logoWrapper">
        <Logo className="logo" alt="WarScape Logo" />
        <div className="brandName">WarScape</div>
      </Link>

      <div className="navLinksWrapper">
        <NavItem path="borders" />
        <NavItem path="shelters" />
        <NavItem path="rides" />
      </div>

      <div>
        {true /* is_logged_in */ ? (
          <UserCircleIcon onClick={() => {}} className="userIcon" />
        ) : (
          <Button
            onClick={() => {}}
            btnColor="btnRed"
            text="Sign in"
            size="md"
          />
        )}
      </div>
    </nav>
  );
};
