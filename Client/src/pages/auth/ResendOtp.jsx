import { AppButton } from "@/components/buttons/AppButton";
import BackButton from "@/components/buttons/BackButton";
import { InputField } from "@/components/InputField/InputField";
import { Message } from "@/components/Message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { ResendOtpFormSchema } from "@/validations";
import { ResendVerificationEmailMutation } from "@/apiService/Auth";

const ResendOtp = () => {
  usePageTitle("Resend Otp");

  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  const {
    mutate: resendVerification,
    isPending,
    isSuccess,
    isError,
    error,
  } = ResendVerificationEmailMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: ResendOtpFormSchema,
  });

  const onSubmit = (data) => {
    const email = data.email;

    if (!email.trim()) return;

    resendVerification(email, {
      onSuccess: () => {
        navigate("/auth/verify-identity");
        setCooldown(30);
      },
      onError: (err) => {
        console.error("Error sending OTP:", err);
      },
    });
  };

  // timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <AuthLayout
      mainHeading="Didn't Receive the Code?"
      text="If you still haven't received the code, you can request a new one."
      formText="We'll send you a fresh 6-digit code to your email."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          className="grid grid-cols-1 gap-4 text-custom-black-dark"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name="email"
            htmlFor="email"
            label="Email Address"
            placeholder="johndoe@gmail.com"
            control={control}
            showAsterisk
          />

          {isSuccess && (
            <Message
              variant="success"
              message={"OTP sent! Please check your email."}
            />
          )}

          {isError && (
            <Message
              message={`${
                error?.response?.data?.message ||
                "Otp email couldn't be sent! Please try again."
              }`}
            />
          )}

          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <AppButton
              className="w-40"
              isPending={isPending}
              isDisabled={cooldown > 0}
              title={cooldown > 0 ? `Wait ${cooldown}s` : "Resend OTP"}
              loadingTitle="Sending"
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResendOtp;
