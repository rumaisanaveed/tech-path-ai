import { lazy } from "react";

const UserDashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const CareerAssessment = lazy(() =>
  import("@/pages/dashboard/careerAssessment/AssessmentFlowManager")
);
const SkillTracker = lazy(() =>
  import("@/pages/dashboard/skillTracking/SkillTracking")
);
const LessonTracker = lazy(() =>
  import("@/pages/dashboard/skillTracking/Lessons")
);
const ViewDomain = lazy(() =>
  import("@/pages/dashboard/skillTracking/domainTracker/DomainTracker")
);
const MentorShip = lazy(() => import("@/pages/dashboard/mentorship/Mentors"));
const Roadmap = lazy(() => import("@/pages/dashboard/roadmaps/Roadmap"));
const ViewRoadmap = lazy(() =>
  import("@/pages/dashboard/roadmaps/ViewRoadMap")
);
const Achievements = lazy(() =>
  import("@/pages/dashboard/achievements/Achievements")
);
const SkillAssessment = lazy(() =>
  import("@/pages/dashboard/skillTracking/SkillAssessment")
);
const Settings = lazy(() => import("@/pages/dashboard/Settings"));

export {
  UserDashboard,
  CareerAssessment,
  SkillTracker,
  ViewDomain,
  MentorShip,
  LessonTracker,
  Roadmap,
  ViewRoadmap,
  Settings,
  Achievements,
  SkillAssessment,
};
