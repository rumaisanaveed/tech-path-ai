import { useMutation } from "@tanstack/react-query";
import * as AuthAPI from "./auth.api";

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
    },
  });
};

export const useVerifyOtp = (options = {}) => {
  return useMutation({
    mutationFn: AuthAPI.VerifyIdentity,
    ...options,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: AuthAPI.forgotPassword,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: AuthAPI.logout,
  });
};
