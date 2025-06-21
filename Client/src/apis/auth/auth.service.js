import { useMutation } from "@tanstack/react-query";
import * as AuthAPI from "./auth.api";
import { useAuth } from "@/context/AuthContext";
import { saveItemToStorage } from "@/utils/helpers/storage/localStorage";

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
      saveItemToStorage("user", data.user);
      console.log("Login successful, user data:", data.user);
    },
  });
};

export const useVerifyOtp = (options = {}) => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: AuthAPI.verifyIdentity,
    onSuccess: (data) => {
      setUser(data.user);
      saveItemToStorage("user", data.user);
      console.log("OTP verification successful, user data:", data.user);
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
