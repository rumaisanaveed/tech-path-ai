import { useState } from "react";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

export const ForgotPassword = () => {
  usePageTitle("Forgot Password");

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate: forgotPassword, isPending, isSuccess, isError, error } =
    useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    forgotPassword(email, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  return (
    <AuthLayout
      mainHeading="Forgot Your Password?"
      text="Enter your registered email address, and we'll send you instructions to reset your password."
      formText="No worries — we’ll help you get back on track."
    >
      <div className="flex flex-col justify-between md:h-full">
        {submitted && isSuccess ? (
          <p className="text-green-600 font-medium text-sm">
            ✅ Reset email sent successfully!
          </p>
        ) : null}

        {isError && (
          <p className="text-red-500 font-medium text-sm">
            ❌ {error?.response?.data?.message || "Something went wrong"}
          </p>
        )}

        <form
          className="grid grid-cols-2 gap-5 text-custom-black-dark"
          onSubmit={handleSubmit}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-span-2 flex gap-3 justify-end">
            <BackButton />
            <Button
              type="submit"
              disabled={isPending}
              className="text-white anonymous-font font-medium text-base rounded-full w-40 py-3 md:py-6 self-end"
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
