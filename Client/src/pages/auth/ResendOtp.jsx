import { useState } from "react";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";
import { useForgotPassword } from "@/services/auth/auth.service";
import { useForm } from "react-hook-form";
import { Message } from "@/components/Message";
import { validations } from "@/validations/auth/validations";

export const ResendOtp = () => {
  // email will be sent to the user to get the otp
  // and on success redirect the user to the otp page

  usePageTitle("Resend Otp");

  const [email, setEmail] = useState("");

  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    forgotPassword(email, {
      onSuccess: () => {
        // navigate the user to the verify identity page
      },
    });
  };

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
              onChange={(e) => setEmail(e.target.value)}
              {...register("email", validations.email)}
            />
            <div className="min-h-[1.25rem] md:min-h-[35px]">
              <Message message={errors.email?.message} />
            </div>
          </div>

          {isSuccess && (
            <Message
              variant="success"
              message={"✅ OTP sent! Please check your email."}
            />
          )}

          {isError && (
            <Message
              message={`❌ ${
                error?.response?.data?.message ||
                "Email couldn't be sent! Please try again."
              }`}
            />
          )}

          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <Button
              type="submit"
              disabled={isPending}
              className="text-white anonymous-font font-medium text-base rounded-full w-40 py-3 md:py-6 self-end"
            >
              {isPending ? "Sending..." : "Resend Otp"}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
