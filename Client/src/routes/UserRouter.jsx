import { UserProtectedRoute } from "@/components/protectedRoute/protectedRoutes";
import { USER_DASHBOARD_ROUTES } from "@/constants/navigation";
import { Outlet } from "react-router-dom";
import {
  Achievements,
  CareerAssessment,
  MentorShip,
  Roadmap,
  Settings,
  SkillTracker,
  UserDashboard,
  ViewRoadmap,
} from "./import/UserRoutes";

export const userRouter = [
  {
    path: USER_DASHBOARD_ROUTES.INDEX,
    element: (
      <UserProtectedRoute>
        <Outlet />
      </UserProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: USER_DASHBOARD_ROUTES.CAREER_ASSESSMENT,
        element: <CareerAssessment />,
      },
      {
        path: USER_DASHBOARD_ROUTES.SKILL_TRACKER,
        element: <SkillTracker />,
      },
      {
        path: USER_DASHBOARD_ROUTES.MENTORSHIP,
        element: <MentorShip />,
      },
      {
        path: USER_DASHBOARD_ROUTES.ROADMAPS,
        element: <Roadmap />,
      },
      {
        path: USER_DASHBOARD_ROUTES.VIEW_ROADMAP,
        element: <ViewRoadmap />,
      },
      {
        path: USER_DASHBOARD_ROUTES.ACHIEVEMENTS,
        element: <Achievements />,
      },
      {
        path: USER_DASHBOARD_ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
];
