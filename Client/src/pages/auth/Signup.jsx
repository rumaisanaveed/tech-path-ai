import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "@/services/auth/auth.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Eye, EyeOff } from "lucide-react";

export const Signup = () => {
  usePageTitle("Signup");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const { mutate: signup, isPending, isError, error, isSuccess } = useSignup();

  const onSubmit = (data) => {
    const { firstName, lastName, dateOfBirth, email, password } = data;
    signup({ firstName, lastName, dateOfBirth, email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/verify-identity");
    }
  }, [isSuccess, navigate]);

  const password = watch("password");

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
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 text-custom-black-dark"
        >
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={new Date()}
              rules={{ required: "Date of Birth is required" }}
              render={({ field }) => (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Input
                      onClick={() => setOpen(true)}
                      readOnly
                      value={
                        field.value
                          ? new Date(field.value).toLocaleDateString("en-US")
                          : ""
                      }
                      placeholder="MM/DD/YYYY"
                      className={`cursor-pointer text-left ${
                        errors.dateOfBirth ? "border-red-500" : ""
                      }`}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        field.onBlur();
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfBirth?.message}
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                className="pr-10"
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7"
              >
                {showConfirmPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="anonymous-font font-medium text-base text-white rounded-full"
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
