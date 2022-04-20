import { Link } from "react-router-dom";
import { Input } from "../components/forms/Input";
import { Button } from "../components/Button";

export const Login = () => {
  return (
    <div className="flex justify-center py-24 px-4">
      <div className="text-center">
        <div className="mb-10">
          <p className="text-4xl font-semibold">
            <span className="colorRed">Sign in</span> to your account
          </p>
          <p className="text-2xl font-medium text-center">
            Or{" "}
            <Link to="register" className="colorGreen font-semibold">
              register
            </Link>{" "}
            a new account
          </p>
        </div>

        <div className="flex items-center flex-col gap-3">
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

        <div className="flex justify-between mx-1 my-4">
          <div className="text-md">
            <Input type="checkbox" id="rememberMe" className="mr-1.5" />
            Remember me
          </div>
          <div className="text-md colorGreen font-semibold cursor-pointer">
            Forgot your password?
          </div>
        </div>
        <Button onClick={() => {}} btnColor="btnRed" text="Sign in" size="lg" />
      </div>
    </div>
  );
};
