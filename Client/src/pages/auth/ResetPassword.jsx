import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/buttons/BackButton";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validations } from "@/validations/auth/validations";
import { Message } from "@/components/Message";

export const ResetPassword = () => {
  usePageTitle("Reset Password");
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // navigate to login on success
  };

  return (
    <AuthLayout
      mainHeading="Create a New Password"
      text="Enter a new password that's strong and easy for you to remember."
      formText="Let’s secure your account."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          className="grid grid-cols-2 gap-y-5 md:gap-y-0 md:gap-x-5 text-custom-black-dark"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-light">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              className="rounded-md"
              {...register("password", validations.password)}
            />
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
            <Input
              id="confirmPassword"
              type="password"
              placeholder="******"
              className="rounded-md"
              {...register("confirmPassword", {
                ...validations.password,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <div className="min-h-[1.25rem] md:min-h-[35px]">
                <Message message={errors.confirmPassword.message} />
              </div>
            )}
          </div>
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
