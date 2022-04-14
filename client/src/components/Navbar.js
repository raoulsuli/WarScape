import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Button } from "./button/Button";
import { UserCircleIcon } from "@heroicons/react/outline";

export const Navbar = () => {
  return (
    <nav className="px-2 sm:px-4 py-2.5">
      <div className="flex justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <Logo class="mr-2 h-12 sm:h-12" alt="WarScape Logo" />
          <div className="text-3xl font-bold colorGreen mt-1.5">WarScape</div>
        </Link>

        <div>a</div>

        <div>
          {true /* is_logged_in */ ? (
            <UserCircleIcon
              onClick={() => {}}
              className="h-10 w-10 colorRed cursor-pointer"
            />
          ) : (
            <Button
              onClick={() => {}}
              btnColor="btnRed"
              text="Sign in"
              size="md"
            />
          )}
        </div>
      </div>
    </nav>
  );
};
