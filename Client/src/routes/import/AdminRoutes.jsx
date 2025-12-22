import { lazy } from "react";

const AdminDashboard = lazy(() =>
  import("@/pages/adminDashboard/AdminDashboard")
);
const AdminBlogs = lazy(() =>
  import("@/pages/adminDashboard/Blogs/AdminBlogs")
);
const AddBlog = lazy(() => import("@/pages/adminDashboard/blogs/AddBlog"));
const EditBlog = lazy(() => import("@/pages/adminDashboard/blogs/EditBlog"));
const AdminEvents = lazy(() =>
  import("@/pages/adminDashboard/events/AdminEvents")
);
const AddEvent = lazy(() => import("@/pages/adminDashboard/events/AddEvent"));
const EditEvent = lazy(() => import("@/pages/adminDashboard/events/EditEvent"));
const CareerExplorer = lazy(() =>
  import("@/pages/adminDashboard/Careers/AdminCareers")
);
const AddCareer = lazy(() =>
  import("@/pages/adminDashboard/Careers/AddCareer")
);
const EditCareer = lazy(() =>
  import("@/pages/adminDashboard/Careers/EditCareer")
);
const CareerAssessmentManager = lazy(() =>
  import(
    "@/pages/adminDashboard/Careers/CareerAssessment/CareerAssessmentManager"
  )
);
const SkilltrackingManagement = lazy(() =>
  import("@/pages/adminDashboard/SkillTracking/SkilltrackingManagement")
);
const EditDomainPage = lazy(() =>
  import("@/pages/adminDashboard/SkillTracking/EditDomainPage")
);
const ModuleTracking = lazy(() =>
  import("@/pages/adminDashboard/SkillTracking/ModuleTracking")
);
const LessonPage = lazy(() =>
  import("@/pages/adminDashboard/SkillTracking/LessonPage")
);

export {
  AdminDashboard,
  AdminBlogs,
  AddBlog,
  EditBlog,
  AdminEvents,
  AddEvent,
  EditEvent,
  CareerExplorer,
  AddCareer,
  EditCareer,
  CareerAssessmentManager,
  SkilltrackingManagement,
  EditDomainPage,
  ModuleTracking,
  LessonPage,
};
