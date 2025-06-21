import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

export const login = async ({ email, password }) => {
  const res = await axiosReq(API_MODES.POST, API_ROUTES.AUTH.LOGIN, {
    email,
    password,
  });
  return res.data;
};

export const signup = async (data) => {
  const res = await axiosReq(API_MODES.POST, API_ROUTES.AUTH.SIGNUP, data);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axiosReq(API_MODES.POST, API_ROUTES.AUTH.FORGOT_PASSWORD, {
    email,
  });
  return res.data;
};

export const resendVerification = async (email) => {
  const res = await axiosReq(
    API_MODES.POST,
    API_ROUTES.AUTH.RESEND_VERIFICATION,
    {
      email,
    }
  );
  return res.data;
};

export const verifyIdentity = async (data) => {
  const res = await axiosReq(
    API_MODES.POST,
    API_ROUTES.AUTH.VERIFY_EMAIL,
    data
  );
  return res.data;
};

export const verifyToken = async ({ password, token }) => {
  const res = await axiosReq(
    API_MODES.POST,
    `${API_ROUTES.AUTH.VERIFY_TOKEN}/${token}`,
    {
      password,
    }
  );
  return res.data;
};

export const logout = async () => {
  const res = await axiosReq(API_MODES.POST, API_ROUTES.AUTH.LOGOUT);
  console.log(res);
  return res.data;
};
