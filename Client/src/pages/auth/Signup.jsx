import { useSignup } from "@/apis/auth/auth.service";
import { InputField } from "@/components/InputField/InputField";
import { Message } from "@/components/Message";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AppButton } from "@/components/buttons/AppButton";
import { DatePicker } from "@/components/inputs/DatePicker";
import { SignupFormSchema } from "@/validations";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import AuthLayout from "../../layouts/AuthLayout";

const Signup = () => {
  usePageTitle("Signup");
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: SignupFormSchema,
  });

  const { mutate: signup, isPending, isError, error, isSuccess } = useSignup();

  const onSubmit = (data) => {
    const { firstName, lastName, dateOfBirth, email, password } = data;
    signup({ firstName, lastName, dateOfBirth, email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/verify-identity");
    }
  }, [isSuccess, navigate]);

  return (
    <AuthLayout
      mainHeading="Join Career Mentor Today"
      text="Discover your ideal tech career — powered by AI, tailored to you."
      formText="It's free and only takes a minute to get started."
    >
      <div className="flex flex-col justify-between h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 text-custom-black-dark"
        >
          <InputField
            name="firstName"
            htmlFor="firstName"
            placeholder="John"
            control={control}
            label="First Name"
            showAsterisk
          />
          <InputField
            name="lastName"
            htmlFor="lastName"
            placeholder="Doe"
            control={control}
            label="Last Name"
            showAsterisk
          />

          <InputField
            name="dateOfBirth"
            htmlFor="dateOfBirth"
            label="Date of Birth"
            component={DatePicker}
            control={control}
            placeholder="12/03/2005"
            showAsterisk
          />

          <InputField
            name="email"
            label="Email"
            htmlFor="email"
            control={control}
            placeholder="johndoe@gmail.com"
            showAsterisk
          />

          <InputField
            name="password"
            htmlFor="password"
            label="Password"
            type="password"
            control={control}
            placeholder="Enter your password"
            showAsterisk
          />

          <InputField
            name="confirmPassword"
            htmlFor="confirmPassword"
            label="Confirm Password"
            type="password"
            control={control}
            placeholder="Confirm your password"
            showAsterisk
          />

          {isSuccess && (
            <Message
              variant="success"
              message="Signup successful! Please check your email to verify."
            />
          )}

          {isError && (
            <Message
              message={`${
                error?.response?.data?.message || "Signup failed. Try again."
              }`}
            />
          )}

          <div className="md:col-span-2 flex justify-end mt-4">
            <AppButton
              title="Create Account"
              isPending={isPending}
              loadingTitle="Creating"
            />
          </div>
        </form>

        <AuthFooter
          text="Already have an account?"
          title="Sign in"
          href="/auth/login"
        />
      </div>
    </AuthLayout>
  );
};

export default Signup;
