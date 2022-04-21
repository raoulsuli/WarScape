import { Link } from "react-router-dom";
import { Input } from "../components/forms/Input";
import { Button } from "../components/Button";
import { ReactComponent as UserImg } from "../assets/user_svg.svg";
import { ReactComponent as ManagerImg } from "../assets/manager-svg.svg";
import { ReactComponent as AdminImg } from "../assets/admin.svg";


export const Register = () => {
  return (
    <div className="loginContainer">
      <div className="text-center">
        <div className="mb-10">

          <p className="bigHeader">
            <span className="colorRed">Register</span> to your account
          </p>

          <p className="bigHeader py-1">
            Select{" "}
            <span className="registerRedirect">user type</span>
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 py-4">
          <div className="registerIcon">
            <UserImg className="logo" alt="userIcon"/>
            <p className="iconHeader">User</p>
          </div>
          <div className="registerIcon">
            <ManagerImg className="logo" alt="managerIcon"/>
            <p className="iconHeader">Manager</p>
          </div>
          <div className="registerIcon">
            <AdminImg className="logo" alt="adminIcon"/>

            <p className="iconHeader">Admin</p>

          </div>
        </div>

        <div class="grid grid-cols-2">
          <div className="registerCol">
            <Input
              size="md"
              type="text"
              id="firstName"
              placeholder="First name"
              required
            />

            <Input
              size="md"
              type="text"
              id="lastName"
              placeholder="Last name"
              required
            />

            <Input
              size="md"
              type="password"
              id="password1"
              placeholder="Password"
              required
            />

            <Input
              size="md"
              type="password"
              id="password2"
              placeholder="Retype password"
              required
            />
          </div>
          <div className="registerCol">
            <Input
              size="md"
              type="email"
              id="email"
              placeholder="Email"
              required
            />

            <Input
              size="md"
              type="text"
              id="city"
              placeholder="City"
              required
            />

            <Input
              size="md"
              type="State"
              id="state"
              placeholder="State"
              required
            />

            <Input
              size="md"
              type="number"
              id="uniqueId"
              placeholder="Unique identifier"
              required
            />
          </div>
        </div>

        <div className="toolsRegister">
          <div className="forgotPassword">Already registered?</div>
        </div>

        <Button onClick={() => {}} btnColor="btnRed" text="Sign up" size="lg" />
      </div>
    </div>
  );
};
