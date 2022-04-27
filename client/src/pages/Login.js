import { Link } from "react-router-dom";
import { Input } from "../components/forms/Input";
import { Button } from "../components/Button";

export const Login = () => {
  return (
    <div className="formContainer">
      <div className="text-center">
        <div className="mb-10">
          <p className="bigHeader">
            <span className="colorRed">Sign in</span> to your account
          </p>

          <p className="smallHeader">
            Or{" "}
            <Link to="/register" className="registerRedirect">
              register
            </Link>{" "}
            a new account
          </p>
        </div>

        <div className="loginForm">
          <Input
            size="lg"
            type="email"
            id="email"
            placeholder="Email address"
            required
          />

          <Input
            size="lg"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="toolsLogin">
          <div className="text-md">
            <Input type="checkbox" id="rememberMe" className="mr-1.5" />
            Remember me
          </div>

          <div className="forgotPassword">Forgot your password?</div>
        </div>

        <Button onClick={() => {}} btnColor="btnRed" text="Sign in" size="lg" />
      </div>
    </div>
  );
};
