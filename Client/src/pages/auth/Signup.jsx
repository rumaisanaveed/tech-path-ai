import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "@/apis/auth/auth.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Message } from "@/components/Message";
import { EyeButton } from "@/components/buttons/EyeButton";
import { validations } from "@/validations/auth/validations";

export const Signup = () => {
  usePageTitle("Signup");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const password = watch("password");

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

  return (
    <AuthLayout
      mainHeading="Join Career Mentor Today"
      text="Discover your ideal tech career — powered by AI, tailored to you."
      formText="It's free and only takes a minute to get started."
    >
      <div className="flex flex-col justify-between h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5 text-custom-black-dark"
        >
          <div className="flex flex-col gap-0 md:flex-row md:items-center md:w-full md:col-span-2 md:gap-x-5">
            <div className="grid gap-2 w-full">
              <Label htmlFor="firstName" className="text-sm font-light">
                First Name
              </Label>
              <Input
                id="firstName"
                className="w-full"
                type="text"
                placeholder="John"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />

              <div className="min-h-[1.25rem] md:min-h-[35px]">
                {errors.firstName && (
                  <Message message={errors.firstName.message} />
                )}
              </div>
            </div>
            <div className="grid gap-2 w-full">
              <Label htmlFor="lastName" className="text-sm font-light">
                Last Name
              </Label>
              <Input
                id="lastName"
                className="w-full"
                type="text"
                placeholder="Doe"
                {...register("lastName", { required: "Last name is required" })}
              />
              <div className="min-h-[1.25rem] md:min-h-[35px]">
                {errors.lastName && (
                  <Message message={errors.lastName.message} />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0 md:flex-row md:items-center md:w-full md:col-span-2 md:gap-x-5">
            <div className="grid gap-2 relative w-full">
              <Label htmlFor="dateOfBirth" className="text-sm font-light">
                Date of Birth
              </Label>
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue={"12/04/2003"}
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Input
                        onClick={() => setOpen(true)}
                        onKeyDown={(e) => e.preventDefault()}
                        onInput={(e) => e.preventDefault()}
                        value={
                          field.value
                            ? new Date(field.value).toLocaleDateString("en-US")
                            : ""
                        }
                        placeholder="12/04/2003"
                        className={`cursor-pointer text-left w-full ${
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

              <div className="min-h-[1.25rem] md:min-h-[35px]">
                <Message message={errors.dateOfBirth?.message} />
              </div>
            </div>

            <div className="grid gap-2 w-full">
              <Label htmlFor="email" className="text-sm font-light">
                Email Address
              </Label>
              <Input
                id="email"
                className="w-full"
                type="email"
                placeholder="johndoe@gmail.com"
                {...register("email", validations.email)}
              />
              <div className="min-h-[1.25rem] md:min-h-[35px]">
                <Message message={errors.email?.message} />
              </div>
            </div>
          </div>

          {/* passwords */}
          <div className="flex flex-col gap-0 md:flex-row md:items-center md:w-full md:col-span-2 md:gap-x-5">
            <div className="grid gap-2 w-full">
              <Label htmlFor="password" className="text-sm font-light">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  className="w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", validations.password)}
                />
                <EyeButton
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
              <div className="min-h-[1.25rem] md:min-h-[35px]">
                {errors.password && (
                  <Message message={errors.password.message} />
                )}
              </div>
            </div>

            <div className="grid gap-2 w-full">
              <Label htmlFor="confirmPassword" className="text-sm font-light">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  className="w-full"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  {...register("confirmPassword", {
                    ...validations.password,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <EyeButton
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />
              </div>
              <div className="min-h-[1.25rem] md:min-h-[35px]">
                {errors.confirmPassword && (
                  <Message message={errors.confirmPassword.message} />
                )}
              </div>
            </div>
          </div>

          {/* error and success messages */}
          {isSuccess && (
            <Message
              variant="success"
              message="Signup successful! Please check your email to verify."
            />
          )}

          {isError && (
            <Message
              message={`${
                error?.response?.data?.message || "Signup failed. Try again."
              }`}
            />
          )}

          <div className="md:col-span-2 flex justify-end mt-4">
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
