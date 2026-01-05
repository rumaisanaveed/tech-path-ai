const authController = "/auth/";
const assessmentController = "/assessments/";
const careerdomainController = "/careerdomain";
const skillmoduleController = "/skill-modules/";
const lessonController = "/skill-modules/";
const roadmapController = "/roadmaps/";

const quizController = "/quiz/";

const skillEnrollment = "/enrollment/";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${authController}login`,
    SIGNUP: `${authController}signup`,
    FORGOT_PASSWORD: `${authController}forgot-password`,
    RESEND_VERIFICATION: `${authController}send-verification-code`,
    VERIFY_EMAIL: `${authController}verify-email`,
    RESET_PASSWORD: `${authController}reset-password`,
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
    CHANGE_MODULE_STATUS: (moduleId) =>
      `${skillEnrollment}module/${moduleId}`,
  },
  LESSONS: {
    GET_MODULE_LESSONS: (moduleId) =>
      `${lessonController}module/${moduleId}/enrolled-lessons`,
    GET_LESSON_QUIZZES: (lessonId) =>
      `${lessonController}lesson/${lessonId}/user-quizzes`,
    SUBMIT_QUIZ_ANSWER: `${lessonController}quiz/answer`,

    GET_ALL_USER_LESSONS: (moduleId) => `/lessons/all-lessons/${moduleId}`,
    GET_SINGLE_USER_LESSON: (lessonId) => `/lessons/details/${lessonId}`,

    ADD_USER_LESSON: (moduleId) => `/lessons/enroll-lesson/${moduleId}`,

    UPDATE_LESSON_STATUS: (lessonId) => `/lessons/update-progress/${lessonId}`,
  },
  QUIZZES: {
    UNLOCK_QUIZ: (moduleId) => `${quizController}start-quiz/${moduleId}`,
    GET_ALL_QUIZZES: (moduleId) => `${quizController}all-quiz/${moduleId}`,
    START_QUIZ: (quizId) => `${quizController}quiz-questions/${quizId}`,
    SUBMIT_ANSWERS: (quizId) => `${quizController}submit-quiz/${quizId}`,
  },
  ROADMAPS: {
    GET_ROADMAPS: `${roadmapController}all`,
    GET_DASHBOARD_DATA: `${roadmapController}/dashboard`,
    GET_SINGLE_ROADMAP_DATA: (roadmapId) => `${roadmapController}${roadmapId}`,
  },
  MODULES: {
    GET_ALL_MODULES_FROM_DOMAIN: (domainId) =>
      `${skillmoduleController}module/${domainId}`,
    GET_ALLPROJECT: (moduleId) => `/projects/${moduleId}`,
  },
  BLOGS: {
    FETCH_BLOGS_FOR_USERS: `/blogs/all-blogs`,
    FETCH_SINGLE_BLOG: (slug) => `/blogs/single-blog/${slug}`,
  },
  EVENTS: {
    FETCH_EVENTS_FOR_USERS: `/events`,
    FETCH_SINGLE_EVENT: (slug) => `/events/details/${slug}`,
    ENROLL_INTO_EVENT: (id) => `/events/enrollment/${id}`,
    CANCEL_ENROLLMENT: (id) => `/events/enrollment/cancel/${id}`,
  },
  ACHIEVEMENTS: {
    GET_PROGRESS_ACHIEVEMENTS: (careerDomain) => `/achivement/progress/${careerDomain}`,
    GET_LEADERBOARD: (careerDomain) => `/achivement/leaderboard/${careerDomain}`,
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: `/roadmaps/dashboard`,
    GET_MODULE_PROJECTS: (moduleId) => `/lessons/module-project/${moduleId}`,
  },
  CAREER_EXPLORER:{
    GET_ALL_CAREERS:`/career-explorer`,
    GET_SINGLE_CAREER_DATA:(id)=>`/career-explorer/view-career/${id}`,
  }
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
    DELETE_LESSON: (lessonId) =>
      `${adminController}/skill-lessons/delete-lesson/${lessonId}`,
  },
  BLOGS_TRACKING: {
    GET_ALL_BLOGS: `${adminController}/blogs/all-blogs`,
    GET_BLOG_TAGS: `${adminController}/blogs/blog-tags`,
    ADD_BLOG: `${adminController}/blogs/create-blog`,
  },
  EVENTS: {
    GET_ALL_EVENTS: `${adminController}/events/all-events`,
    CREATE_EVENT: `${adminController}/events/create-event`,
    GET_EVENT: (eventId) => `${adminController}/events/event/${eventId}`,
    UPDATE_EVENT: (eventId) =>
      `${adminController}/events/update-event/${eventId}`,
    DELETE_EVENT: (eventId) =>
      `${adminController}/events/delete-event/${eventId}`,
    UPDATE_EVENT_STATUS: (eventId) =>
      `${adminController}/events/update-event-status/${eventId}`,
  },
  CAREER_EXPLORER: {
    GET_ALL_CAREERS: `${adminController}/career-explorer/all-careers`,
    CREATE_CAREER: `${adminController}/career-explorer/add-career`,
    GET_CAREER: (careerId) =>
      `${adminController}/career-explorer/career/${careerId}`,
    UPDATE_CAREER: (careerId) =>
      `${adminController}/career-explorer/update-career/${careerId}`,
    DELETE_CAREER: (careerId) =>
      `${adminController}/career-explorer/delete-career/${careerId}`,
  },
};
