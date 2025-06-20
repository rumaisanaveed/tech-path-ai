const authController = "auth/";

export const authApiRoutes = {
  LOGIN: `/${authController}login`,
  SIGNUP: `/${authController}signup`,
  FORGOT_PASSWORD: `/${authController}forgot-password`,
  RESEND_VERIFICATION: `/${authController}send-verification-code`,
  VERIFY_EMAIL: `/${authController}verify-email`,
  VERIFY_TOKEN: `/${authController}reset-password`,
  LOGOUT: `/${authController}logout`,
  verifyBrowserToken: `/${authController}checkauth`,
};
