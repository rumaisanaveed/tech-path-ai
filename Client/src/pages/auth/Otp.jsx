import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyOtp } from "@/apis/auth/auth.service";
import { useEffect } from "react";
import { Message } from "@/components/Message";
import { USER_DASHBOARD_ROUTES } from "@/constants/navigation";

export const Otp = () => {
  usePageTitle("Verify Your Identity");
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const otp = watch("otp");

  const {
    mutate: verifyIdentity,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useVerifyOtp();

  const onSubmit = (data) => {
    if (data.otp.length === 6) {
      verifyIdentity({ code: data.otp });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/user/dashboard");
    }
  }, [navigate, isSuccess]);

  return (
    <AuthLayout
      mainHeading="Verify Your Identity"
      text="We've sent a one-time password (OTP) to your email. Enter it to continue."
      formText="Check your email for a 6-digit code."
    >
      <div className="flex flex-col justify-between md:h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5 text-custom-black-dark"
        >
          <div className="col-span-2 flex flex-col gap-2">
            <Label className="text-sm font-light">OTP</Label>

            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => {
                setValue("otp", val);
                trigger("otp");
              }}
              className="flex gap-4 w-full"
            >
              <InputOTPGroup className="flex gap-2 lg:gap-6 w-full">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="border border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 w-full h-12 md:h-16 lg:h-24 text-xl md:text-2xl lg:text-3xl"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <input
              type="hidden"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP must be 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "OTP must be 6 digits",
                },
              })}
            />

            {isSuccess && (
              <Message
                variant="success"
                message="Otp sent successfully! Check your email."
              />
            )}

            {(errors.otp || isError) && (
              <p className="text-sm text-red-500 mt-1">
                {errors.otp?.message ||
                  error?.response?.data?.message ||
                  "Verification failed"}
              </p>
            )}
          </div>

          <div className="col-span-2 flex flex-col gap-3 justify-end">
            <div className="self-end">
              <p className="text-sm font-normal flex items-center">
                Didn't get the code?&nbsp;
                <span
                  className="text-custom-light-blue font-medium cursor-pointer"
                  onClick={() => navigate("/auth/resend-otp")}
                >
                  Resend Code
                </span>
              </p>
            </div>

            <div className="flex gap-3 items-center self-end mt-4">
              <Link
                className="text-base font-light w-24 flex items-center justify-center border border-custom-black-dark rounded-full py-2 md:py-2.5"
                to=""
              >
                Back
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="anonymous-font font-medium text-base text-white rounded-full w-40 py-3 md:py-6"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
