const authController = "/auth/";
const assessmentController = "/assessments/";
const careerdomainController = "/careerdomain";
const skillmoduleController = "/skill-modules/";
const lessonController = "/skill-modules/";
const roadmapController = "/roadmap/";

const skillEnrollment = "/enrollment/";

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
    POST_SESSION: () => `${assessmentController}session/startsession`,
  },
  SKILLTRACKING: {
    GET_ALL_CAREER_DOMAINS: `${careerdomainController}/all`,
    GET_USER_CAREER_DOMAINS: `${careerdomainController}/current`,
    ENROLL_CAREER_DOMAIN: `${careerdomainController}/enroll`,
    UNENROLL_CAREER_DOMAIN: (domainId) =>
      `${careerdomainController}/unenroll/${domainId}`,
  },
  SKILLMODULE: {
    GET_USER_ENROLLED: (domainId) => `${skillEnrollment}modules/${domainId}`,
  },
  LESSONS: {
    GET_MODULE_LESSONS: (moduleId) =>
      `${lessonController}module/${moduleId}/enrolled-lessons`,
    GET_LESSON_QUIZZES: (lessonId) =>
      `${lessonController}lesson/${lessonId}/user-quizzes`,
    SUBMIT_QUIZ_ANSWER: `${lessonController}quiz/answer`,

    GET_ALL_USER_LESSONS: (moduleId) =>
      `$/lessons/all-lessons/${moduleId}`,
  },
  ROADMAPS: {
    GET_ROADMAPS: (domainId) => `${roadmapController}${domainId}`,
  },
  MODULES: {
    GET_ALL_MODULES_FROM_DOMAIN: (domainId) =>
      `${skillmoduleController}module/${domainId}`,
  },
};

const adminController = "/admin";

export const ADMIN_API_ROUTES = {
  SKILLTRACKING: {
    GET_ALL_CAREER_DOMAINS: `${adminController}/skill-tracking/all-domains`,
    TOGGLE_CAREER_DOMAIN_STATUS: (domainId) =>
      `${adminController}/skill-tracking/toggle-domain/${domainId}`,
    DELETE_CAREER_DOMAIN: (domainId) =>
      `${adminController}/skill-tracking/delete-domain/${domainId}`,
    CREATE_CAREER_DOMAIN: `${adminController}/skill-tracking/create-domain`,
    GET_SINGLE_CAREER_DOMAIN: (domainId) =>
      `${adminController}/skill-tracking/single-domain/${domainId}`,
  },
  MODULE_TRACKING: {
    GET_ALL_MODULES: (domainId) =>
      `${adminController}/skill-modules/all-modules/${domainId}`,
    CREATE_MODULE: (domainId) =>
      `${adminController}/skill-modules/create-module/${domainId}`,
    DELETE_MODULE: (moduleId, domainId) =>
      `${adminController}/skill-modules/delete-module/${moduleId}/${domainId}`,
  },
  LESSON_TRACKING: {
    GET_ALL_MODULE_LESSONS_AND_MODULE: (moduleId) =>
      `${adminController}/skill-lessons/get-module-lesson/${moduleId}`,
    ADD_LESSON: (moduleId) =>
      `${adminController}/skill-lessons/create-lesson/${moduleId}`,
    GET_SINGLE_LESSON: (lessonId) =>
      `${adminController}/skill-lessons/get-single-lesson/${lessonId}`,
  },
};
