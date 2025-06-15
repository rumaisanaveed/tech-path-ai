import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/services/auth/auth.service";
import { Message } from "@/components/Message";
import { validations } from "@/validations/auth/validations";

export const Login = () => {
  usePageTitle("Login");
  const navigate = useNavigate();
  const { mutate: login, isPending, isError, error, isSuccess } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <AuthLayout
      mainHeading="Welcome Back! To Career Mentor"
      text="Sign in to access your dashboard, track progress, and explore new opportunities."
      formText="Let’s continue your journey to a smarter career."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 text-custom-black-dark"
        >
          {/* Email */}
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-light">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              className="rounded-md"
              {...register("email", validations.email)}
            />
            <div className="min-h-[1.25rem] md:min-h-[35px]">
              <Message message={errors.email?.message} />
            </div>
          </div>

          {/* Password */}
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-light">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              className="rounded-md"
              {...register("password", validations.password)}
            />
            <div className="min-h-[1.25rem] md:min-h-[35px]">
              <Message message={errors.password?.message} />
            </div>
          </div>

          {/* success message */}
          {isSuccess && (
            <div className="col-span-2">
              <Message message="Login succesfull" />
            </div>
          )}

          {/* Error Message */}
          {isError && (
            <div className="col-span-2">
              <Message
                message={`❌ ${
                  error?.response?.data?.message || "Login failed. Try again."
                }`}
              />
            </div>
          )}

          {/* Forgot password and submit button */}
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

        {/* Link to signup */}
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
