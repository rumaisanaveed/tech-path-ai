export const HOME_ROUTE = "/";

export const BLOG_ROUTES = {
  INDEX: "/blogs",
  DETAILS: ":id",
};

export const EVENTS_ROUTE = "/events";

export const CAREERS_ROUTE = "/careers";

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
  MENTORSHIP: "mentorship",
  ACHIEVEMENTS: "achievements",
  SETTINGS: "settings",
  VIEW_MY_BLOGS: "my-blogs",
  CREATE_BLOG: "add-new-blog",
};

export const ADMIN_DASHBOARD_ROUTES = {
  INDEX: "/admin/dashboard",
  BLOGS: "blogs",
  VIEW_BLOG: "blogs/:id",
  EVENTS_MANAGEMENT: "events",
  CAREER_ASSESSMENT_MANAGEMENT: "career-assessment",
  CAREERS_MANAGEMENT: "career-explorer",
};
