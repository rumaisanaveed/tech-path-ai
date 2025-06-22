const authController = "/auth/";
const assessmentController = "/assessments/";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${authController}login`,
    SIGNUP: `${authController}signup`,
    FORGOT_PASSWORD: `${authController}forgot-password`,
    RESEND_VERIFICATION: `${authController}send-verification-code`,
    VERIFY_EMAIL: `${authController}verify-email`,
    VERIFY_TOKEN: `${authController}reset-password`,
    LOGOUT: `${authController}logout`,
  },
  ASSESSMENT: {
    START_ASSESSMENT: `${assessmentController}session`,
    GET_CURRENT_QUESTION: (sessionId) =>
      `${assessmentController}session/${sessionId}`,
    SUBMIT_ANSWER: (sessionId) =>
      `${assessmentController}session/${sessionId}/answer`,
  },
};
