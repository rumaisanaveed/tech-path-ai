import axiosInstance from "@/services/axiosInstance";

export const login = async ({ email, password }) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data;
};

export const signup = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

export const resendVerification = async (email) => {
  const res = await axiosInstance.post("/auth/resend-verification", { email });
  return res.data;
};

export const VerifyIdentity = async (data) => {
  const res = await axiosInstance.post("/auth/verify-email", data);
  return res.data;
}

export const verifyToken = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
}