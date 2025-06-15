import { authApiRoutes } from "@/constants/apiRoutes";
import axiosInstance from "@/utils/axiosInstance";

export const login = async ({ email, password }) => {
  const res = await axiosInstance.post(authApiRoutes.LOGIN, {
    email,
    password,
  });
  return res.data;
};

export const signup = async (data) => {
  const res = await axiosInstance.post(authApiRoutes.SIGNUP, data);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axiosInstance.post(authApiRoutes.FORGOT_PASSWORD, {
    email,
  });
  return res.data;
};

export const resendVerification = async (email) => {
  const res = await axiosInstance.post(authApiRoutes.RESEND_VERIFICATION, {
    email,
  });
  return res.data;
};

export const VerifyIdentity = async (data) => {
  const res = await axiosInstance.post(authApiRoutes.VERIFY_EMAIL, data);
  return res.data;
};

export const verifyToken = async () => {
  const res = await axiosInstance.get(authApiRoutes.VERIFY_TOKEN);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post(authApiRoutes.LOGOUT);
  return res.data;
};
