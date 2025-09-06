const authController = "/auth/";
const assessmentController = "/assessments/";
const careerdomainController = "/careerdomain";

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
    GET_QUESTIONS_BY_CATEGORY: (sessionId, categoryId) =>
      `${assessmentController}session/${sessionId}/${categoryId}`,
    SUBMIT_ANSWER_BY_CATEGORY: (sessionId) =>
      `${assessmentController}session/${sessionId}/answer`,
    POST_RESULTS: (sessionId) =>
      `${assessmentController}session/result/${sessionId}`,
    GET_RESULTS: (sessionId) =>
      `${assessmentController}result/current-results/${sessionId}`,
    GET_PREVIOUS_RESULTS: `${assessmentController}result/past-results/`,
    POST_SESSION:()=> `${assessmentController}session/startsession`
  },
  SKILLTRACKING:{
    GET_ALL_CAREER_DOMAINS:`${careerdomainController}/all`,
    GET_USER_CAREER_DOMAINS:`${careerdomainController}/current`,
    ENROLL_CAREER_DOMAIN:`${careerdomainController}/enroll`
  }
};
