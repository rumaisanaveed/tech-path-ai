export const HOME_ROUTE = "/";

export const BLOG_ROUTES = {
  INDEX: "/blogs",
  DETAILS: ":id",
};

export const EVENTS_ROUTE = {
  INDEX: "/events",
  DETAILS: ":id",
};

export const CAREERS_ROUTE = {
  INDEX: "/careers",
  DETAILS: ":id",
};

export const AUTH_ROUTES = {
  INDEX: "/auth",
  LOGIN: "login",
  SIGNUP: "signup",
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: "reset-password/:token",
  VERIFY_IDENTITY: "verify-identity",
  RESEND_OTP: "resend-otp",
};

export const USER_DASHBOARD_ROUTES = {
  INDEX: "/user/dashboard",
  CAREER_ASSESSMENT: "career-assessment",
  SKILL_TRACKER: "skill-tracker",
  DOMAIN_TRACKER: "domain/:id",
  LESSON_TRACKER: "lesson-tracker/:moduleId",
  SKILL_ASSESSMENT: "skill-tracker/skill-assessment",
  ROADMAPS: "roadmaps",
  VIEW_ROADMAP: "roadmaps/:id",
  MENTORSHIP: "mentorship",
  ACHIEVEMENTS: "achievements",
  SETTINGS: "settings",
};

export const ADMIN_DASHBOARD_ROUTES = {
  INDEX: "/admin/dashboard",
  VIEW_BLOGS: "blogs",
  ADD_BLOG: "blogs/add",
  EDIT_BLOG: "blogs/edit/:id",
  VIEW_ADMIN_EVENTS: "events",
  ADD_EVENT: "events/add",
  EDIT_EVENT: "events/edit/:id",
  SKILL_TRACKING_MANAGEMENT: "skill-tracking",
  SKILL_TRACKING_EDIT: "skill-tracking/edit/:domainId",
  LESSON_TRACKING_MANAGEMENT: "lesson-tracking/:moduleId",
  MODULE_TRACKING_MANAGEMENT: "module-tracking",
  CAREER_ASSESSMENT_MANAGEMENT: "career-assessment",
  CAREERS_MANAGEMENT: "careers",
  ADD_CAREER: "careers/add",
  EDIT_CAREER: "careers/edit/:id",
};
