import { lazy } from "react";

const UserDashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const CareerAssessment = lazy(() =>
  import("@/pages/dashboard/careerAssessment/AssessmentFlowManager")
);
const SkillTracker = lazy(() =>
  import("@/pages/dashboard/skillTracking/SkillTracking")
);
const MentorShip = lazy(() => import("@/pages/dashboard/mentorship/Mentors"));
const Roadmap = lazy(() => import("@/pages/dashboard/roadmaps/Roadmap"));
const ViewRoadmap = lazy(() =>
  import("@/pages/dashboard/roadmaps/ViewRoadmap")
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
  MentorShip,
  Roadmap,
  ViewRoadmap,
  Settings,
  Achievements,
  SkillAssessment,
};
