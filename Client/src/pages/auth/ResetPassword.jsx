import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validations } from "@/validations/auth/validations";
import { Message } from "@/components/Message";
import { useVerifyToken } from "@/apis/auth/auth.service";
import { EyeButton } from "@/components/buttons/EyeButton";
import { useState } from "react";

export const ResetPassword = () => {
  usePageTitle("Reset Password");
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: verifyToken, isSuccess, isError, error } = useVerifyToken();

  const password = watch("password");

  const onSubmit = (data) => {
    verifyToken(
      // data
      { password: data.password, token },
      {
        onSuccess: () => {
          console.log("Password reset successful");
          navigate("/auth/login");
        },
        onError: (error) => {
          console.error("Error resetting password:", error);
        },
      }
    );
  };

  return (
    <AuthLayout
      mainHeading="Create a New Password"
      text="Enter a new password that's strong and easy for you to remember."
      formText="Let’s secure your account."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          className="grid grid-cols-2 gap-y-5 md:gap-5 text-custom-black-dark"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-light">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="rounded-md"
                {...register("password", validations.password)}
              />
              <EyeButton
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            {errors.password && (
              <div className="min-h-[1.25rem] md:min-h-[35px]">
                <Message message={errors.password.message} />
              </div>
            )}
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="confirmPassword" className="text-sm font-light">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="rounded-md"
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
            {errors.confirmPassword && (
              <div className="min-h-[1.25rem] md:min-h-[35px]">
                <Message message={errors.confirmPassword.message} />
              </div>
            )}
          </div>
          {isSuccess && (
            <div className="col-span-2">
              <Message
                variant="success"
                message="Password reset successfully!"
              />
            </div>
          )}

          {/* Error Message */}
          {isError && (
            <div className="col-span-2">
              <Message
                message={`${
                  error?.response?.data?.message || "Login failed. Try again."
                }`}
              />
            </div>
          )}

          {/* add error or success msgs here */}
          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <Button
              type="submit"
              className="anonymous-font font-medium text-base text-white rounded-full w-40 py-3 md:py-6 self-end"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
