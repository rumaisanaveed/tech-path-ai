const authController = "/auth/";
const assessmentController = "/assessments/";
const careerdomainController = "/careerdomain";
const skillmoduleController = "/skill-modules/";
const lessonController = "/skill-modules/";
const roadmapController = "/roadmap/";

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
  },
  SKILLMODULE:{
    GET_USER_ENROLLED: (domainId)=> `${skillmoduleController}module/enrolled/${domainId}`
  },
  LESSONS: {
    GET_MODULE_LESSONS: (moduleId) => `${lessonController}module/${moduleId}/enrolled-lessons`,
    GET_LESSON_QUIZZES: (lessonId) => `${lessonController}lesson/${lessonId}/user-quizzes`,
    SUBMIT_QUIZ_ANSWER: `${lessonController}quiz/answer`,
  },
  ROADMAPS: {
    GET_ROADMAPS: (domainId)=> `${roadmapController}${domainId}`,
  },
};
