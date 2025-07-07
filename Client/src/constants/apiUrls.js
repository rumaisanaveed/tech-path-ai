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
    START_SESSION: `${assessmentController}session`,
    POST_SESSION_BY_CATEGORY: (sessionId, categoryId) =>
      `${assessmentController}generatequestions/${sessionId}/${categoryId}`,
    GET_QUESTIONS_BY_CATEGORY: (sessionId, categoryId) =>
      `${assessmentController}session/${sessionId}/${categoryId}`,
    SUBMIT_ANSWER_BY_CATEGORY: (sessionId) =>
      `${assessmentController}session/${sessionId}/answer`,
    POST_RESULTS: (sessionId) =>
      `${assessmentController}session/result/${sessionId}`,
    GET_RESULTS: (sessionId) =>
      `${assessmentController}result/current-results/${sessionId}`,
    GET_PREVIOUS_RESULTS: `${assessmentController}result/past-results/`,
  },
};
