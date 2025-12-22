import { AdminProtectedRoute } from "@/components/protectedRoute/protectedRoutes";
import { ADMIN_DASHBOARD_ROUTES } from "@/constants/navigation";
import { Outlet } from "react-router-dom";
import {
  AdminDashboard,
  AdminBlogs,
  AddBlog,
  EditBlog,
  AdminEvents,
  AddEvent,
  EditEvent,
  CareerExplorer,
  CareerAssessmentManager,
  SkilltrackingManagement,
  EditDomainPage,
  ModuleTracking,
  LessonPage,
  AddCareer,
  EditCareer,
} from "./import/AdminRoutes";

export const adminRouter = [
  {
    path: ADMIN_DASHBOARD_ROUTES.INDEX,
    // element: (
    //   <AdminProtectedRoute>
    //     <Outlet />
    //   </AdminProtectedRoute>
    // ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.VIEW_BLOGS,
        element: <AdminBlogs />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.ADD_BLOG,
        element: <AddBlog />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.EDIT_BLOG,
        element: <EditBlog />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.VIEW_ADMIN_EVENTS,
        element: <AdminEvents />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.ADD_EVENT,
        element: <AddEvent />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.EDIT_EVENT,
        element: <EditEvent />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.CAREERS_MANAGEMENT,
        element: <CareerExplorer />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.ADD_CAREER,
        element: <AddCareer />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.EDIT_CAREER,
        element: <EditCareer />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.SKILL_TRACKING_MANAGEMENT,
        element: <SkilltrackingManagement />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.SKILL_TRACKING_EDIT,
        element: <EditDomainPage />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.MODULE_TRACKING_MANAGEMENT,
        element: <ModuleTracking />,
      },
      {
        path: ADMIN_DASHBOARD_ROUTES.LESSON_TRACKING_MANAGEMENT,
        element: <LessonPage />,
      },

      {
        path: ADMIN_DASHBOARD_ROUTES.CAREER_ASSESSMENT_MANAGEMENT,
        element: <CareerAssessmentManager />,
      },
    ],
  },
];
