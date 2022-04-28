import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { UserCircleIcon, MenuIcon } from "@heroicons/react/outline";
import { NavItem } from "./NavItem";
import { Dropdown } from "../Dropdown";
import { useOutsideClick } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [navMenuOpened, setNavMenuOpened] = useState(false);
  const { logout, user } = useAuth0();
  console.log(user); //Nu se vad rolurile in user

  const menuRef = {
    ref1: useRef(null),
    ref2: useRef(null),
  };

  const navRef = {
    ref1: useRef(null),
    ref2: useRef(null),
  };

  useOutsideClick(menuRef, setUserMenuOpened);
  useOutsideClick(navRef, setNavMenuOpened);

  return (
    <div className="relative">
      <nav className="nav">
        <Link to="/" className="logoContainer">
          <Logo className="logo" alt="WarScape Logo" />
          <div className="brandName">WarScape</div>
        </Link>

        <div className="navLinksContainer">
          <NavItem path="borders" />
          <NavItem path="shelters" />
          <NavItem path="rides" />
        </div>

        <div className="menuBar">
          <UserCircleIcon ref={menuRef.ref2} className="userIcon" />
          <MenuIcon ref={navRef.ref2} className="menuIcon" />
        </div>
      </nav>

      <Dropdown
        ref={navRef.ref1}
        isActive={navMenuOpened}
        className="top-12 right-12"
      >
        <Link to="/borders">Borders</Link>
        <Link to="/shelters">Shelters</Link>
        <Link to="/rides">Rides</Link>
      </Dropdown>

      <Dropdown
        ref={menuRef.ref1}
        isActive={userMenuOpened}
        className="top-12 right-24 md:right-12"
      >
        {/* TODO */}
        <Link to="/profile">Edit Profile</Link>
        <div onClick={() => logout({ returnTo: window.location.origin })}>
          Sign out
        </div>
      </Dropdown>
    </div>
  );
};
