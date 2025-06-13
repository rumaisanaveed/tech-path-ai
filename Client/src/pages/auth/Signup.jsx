import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "@/hooks/auth/useSignup";

export const Signup = () => {
  usePageTitle("Signup");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: signup, isPending, isError, error, isSuccess } = useSignup();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const signupData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      password: formData.password,
    };

    signup(signupData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/verify-identity");
    }
  }, [isSuccess, navigate]);

  return (
    <AuthLayout
      mainHeading="Join Career Mentor Today"
      text="Discover your ideal tech career — powered by AI, tailored to you."
      formText="It's free and only takes a minute to get started."
    >
      <div className="flex flex-col justify-between h-full">
        {isSuccess && (
          <p className="text-green-600 text-sm font-medium mb-3">
            ✅ Signup successful! Please check your email to verify.
          </p>
        )}
        {isError && (
          <p className="text-red-500 text-sm font-medium mb-3">
            ❌ {error?.response?.data?.message || "Signup failed. Try again."}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 text-custom-black-dark"
        >
          <div className="grid gap-2">
            <Label htmlFor="firstName" className="text-sm font-light">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              className="rounded-md"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName" className="text-sm font-light">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              className="rounded-md"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dob" className="text-sm font-light">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="text"
              placeholder="12/04/2002"
              className="rounded-md"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-light">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
              className="rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-light">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              className="rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword" className="text-sm font-light">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="******"
              className="rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="text-custom-black-dark anonymous-font font-medium text-base text-white rounded-full"
            >
              {isPending ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="flex justify-center place-items-end mt-5 mb-4">
          <p className="text-sm font-normal flex items-center">
            Already have an account?&nbsp;
            <Link
              to="/auth/login"
              className="text-custom-light-blue font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};
