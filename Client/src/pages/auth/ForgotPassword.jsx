import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";
import { useForgotPassword } from "@/apis/auth/auth.service";
import { useForm } from "react-hook-form";
import { Message } from "@/components/Message";
import { validations } from "@/validations/auth/validations";

export const ForgotPassword = () => {
  usePageTitle("Forgot Password");

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

  const onSubmit = (data) => {
    const email = data.email.trim();

    if (!email) return;
    console.log("Submitting forgot password request for email:", email);

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
