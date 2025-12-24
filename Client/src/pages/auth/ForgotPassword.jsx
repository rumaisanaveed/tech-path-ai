import { AppButton } from "@/components/buttons/AppButton";
import BackButton from "@/components/buttons/BackButton";
import { InputField } from "@/components/InputField/InputField";
import { Message } from "@/components/Message";
import { ResendOtpFormSchema } from "@/validations";
import { useForm } from "react-hook-form";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { ForgotPasswordMutation } from "@/apiService/Auth";

const ForgotPassword = () => {
  usePageTitle("Forgot Password");

  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = ForgotPasswordMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: ResendOtpFormSchema,
  });

  const onSubmit = (data) => {
    const email = data.email.trim();

    if (!email) return;

    forgotPassword(email);
  };

  return (
    <AuthLayout
      mainHeading="Forgot Your Password?"
      text="Enter your registered email address, and we'll send you instructions to reset your password."
      formText="No worries — we’ll help you get back on track."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          className="grid grid-cols-1 gap-5 text-custom-black-dark"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name="email"
            htmlFor="email"
            label="Email Address"
            control={control}
            placeholder="johndoe@gmail.com"
            showAsterisk
          />

          {isSuccess && (
            <Message
              variant="success"
              message={"Reset email sent successfully!"}
            />
          )}

          {isError && (
            <Message
              message={`${
                error?.response?.data?.message ||
                "Email couldn't be sent! Please try again."
              }`}
            />
          )}

          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <AppButton
              className="w-40"
              isPending={isPending}
              title="Send Reset Link"
              loadingTitle="Sending"
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
