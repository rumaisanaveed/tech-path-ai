import { AppButton } from "@/components/buttons/AppButton";
import BackButton from "@/components/buttons/BackButton";
import { InputField } from "@/components/InputField/InputField";
import { Message } from "@/components/Message";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { VerifyTokenMutation } from "@/apiService/Auth";

const ResetPassword = () => {
  usePageTitle("Reset Password");
  const navigate = useNavigate();
  const { token } = useParams();

  const { control, handleSubmit } = useForm();

  const {
    mutate: verifyToken,
    isPending,
    isSuccess,
    isError,
    error,
  } = VerifyTokenMutation();

  const onSubmit = (data) => {
    verifyToken(
      // data
      { password: data.password, token },
      {
        onSuccess: () => {
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
          className="flex flex-col gap-4 text-custom-black-dark"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name="password"
            htmlFor="password"
            type="password"
            placeholder="Enter your new password"
            control={control}
            className="col-span-1"
            label="Password"
            showAsterisk
          />

          <InputField
            name="confirmPassword"
            htmlFor="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            control={control}
            label="Confirm Password"
            showAsterisk
          />

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
                  error?.response?.data?.message ||
                  "Password  reset failed. Try again."
                }`}
              />
            </div>
          )}

          {/* add error or success msgs here */}
          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <AppButton
              className="w-40"
              isPending={isPending}
              title="Reset Password"
              loadingTitle="Resetting"
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
