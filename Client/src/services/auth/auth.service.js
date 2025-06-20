import { useMutation } from "@tanstack/react-query";
import * as AuthAPI from "./auth.api";
import { useAuth } from "@/context/AuthContext";

export const useSignup = () => {
  return useMutation({
    mutationFn: AuthAPI.signup,
  });
};

export const useLogin = () => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Login successful, user data:", data.user);
    },
  });
};

export const useVerifyOtp = (options = {}) => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: AuthAPI.verifyIdentity,
    onSuccess: (data) => {
      console.log(data.user);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("OTP verification successful, user data:", data.user);
    },
    onError: (error) => {
      console.log(error);
    },
    ...options,
  });
};
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: AuthAPI.forgotPassword,
  });
};

export const useLogout = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess,
    onError,
  });
};

export const useVerifyToken = () => {
  return useMutation({
    mutationFn: AuthAPI.verifyToken,
  });
};

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: AuthAPI.resendVerification,
  });
};
