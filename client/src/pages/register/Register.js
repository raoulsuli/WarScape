import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/Button";
import { UserCircleIcon } from "@heroicons/react/outline";
import { RiUserFollowLine, RiUserSettingsLine } from "react-icons/ri";
import { UserType } from "./UserType";

export const Register = () => {
  const [userType, setUserType] = useState("");

  return (
    <div className="formContainer">
      <div className="text-center">
        <div className="mb-10">
          <p className="bigHeader">
            <span className="colorRed">Register</span> a new account
          </p>

          <p className="smallHeader">
            Or{" "}
            <Link to="/login" className="registerRedirect">
              sign in
            </Link>{" "}
            to an existing one
          </p>
        </div>

        <div className="userTypeContainer">
          <UserType
            Icon={UserCircleIcon}
            currentUser="user"
            innerText="User"
            userType={userType}
            setUserType={setUserType}
          />

          <UserType
            Icon={RiUserFollowLine}
            currentUser="manager"
            innerText="Manager"
            userType={userType}
            setUserType={setUserType}
          />

          <UserType
            Icon={RiUserSettingsLine}
            currentUser="admin"
            innerText="Admin"
            userType={userType}
            setUserType={setUserType}
          />
        </div>

        <div className="registerForm">
          <Input
            size="lg"
            type="fullName"
            id="fullName"
            placeholder="Full Name"
            required
          />

          <Input
            size="lg"
            type="email"
            id="email"
            placeholder="Email"
            required
          />

          <Input
            size="lg"
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <Input
            size="lg"
            type="password"
            id="password2"
            placeholder="Re-type Password"
            required
          />

          <Input size="lg" type="city" id="city" placeholder="City" required />

          <Input
            size="lg"
            type="region"
            id="region"
            placeholder="Region"
            required
          />

          {userType === "manager" && (
            <div className="col-span-full">
              <Input
                size="lg"
                type="id"
                id="id"
                placeholder="Unique Identifier"
                required
              />
            </div>
          )}
        </div>
        <Button
          onClick={() => {}}
          btnColor="btnRed"
          text="Register"
          size="lg"
          className="mt-8"
        />
      </div>
    </div>
  );
};
