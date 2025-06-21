import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";
import { useResendVerificationEmail } from "@/apis/auth/auth.service";
import { useForm } from "react-hook-form";
import { Message } from "@/components/Message";
import { validations } from "@/validations/auth/validations";
import { useNavigate } from "react-router-dom";

export const ResendOtp = () => {
  usePageTitle("Resend Otp");

  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  const {
    mutate: resendVerification,
    isPending,
    isSuccess,
    isError,
    error,
  } = useResendVerificationEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;

    if (!email.trim()) return;

    resendVerification(email, {
      onSuccess: () => {
        console.log("OTP sent successfully");
        navigate("/auth/verify-identity");
        setCooldown(30); // Set cooldown to 30 seconds
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
          className="grid grid-cols-2 md:gap-x-5 text-custom-black-dark"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <Button
              type="submit"
              disabled={isPending || cooldown > 0}
              className="text-white anonymous-font font-medium text-base rounded-full w-40 py-3 md:py-6 self-end"
            >
              {isPending
                ? "Sending..."
                : cooldown > 0
                ? `Wait ${cooldown}s`
                : "Resend OTP"}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
