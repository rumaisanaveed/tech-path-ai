import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "@/services/auth/auth.service";

export const Login = () => {
  usePageTitle("Login");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, data } = useLogin();

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          alert("Login successful");
          navigate("/dashboard");
        },
        onError: (err) => alert(err?.response?.data?.message || "Login failed"),
      }
    );
  };

  return (
    <AuthLayout
      mainHeading="Welcome Back! To Career Mentor"
      text="Sign in to access your dashboard, track progress, and explore new opportunities."
      formText="Let’s continue your journey to a smarter career."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          className="grid grid-cols-2 gap-5 text-custom-black-dark"
          onSubmit={handleSubmit}
        >
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-light">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className="rounded-md"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-light">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="rounded-md"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-5 justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-sm font-normal self-end"
            >
              forgot password?
            </Link>
            <Button
              type="submit"
              className="anonymous-font font-medium text-base text-white rounded-full w-28 md:w-40 py-3 md:py-6 self-end"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
        <div className="flex justify-center place-items-end mt-5 mb-4">
          <p className="text-sm font-normal flex items-center">
            Don't have an account?&nbsp;
            <Link
              to="/auth/signup"
              className="text-custom-light-blue font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};
