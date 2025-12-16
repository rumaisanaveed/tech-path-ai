import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//Protected Routes
import {
  AdminProtectedRoute,
  PublicRoute,
  UserProtectedRoute,
} from "./components/protectedRoute/protectedRoutes";

//Authentication
import {
  ForgotPassword,
  Login,
  Otp,
  ResendOtp,
  ResetPassword,
  Signup,
} from "./pages/auth";

//Pages
import Home from "./pages/Home";
import { Careers } from "./pages/careers/Careers";
import {
  Achievements,
  AssessmentFlowManager,
  Dashboard,
  DomainTracker,
  Mentors,
  Settings,
  SkillAssessment,
  SkillTracking,
} from "./pages/dashboard";
import { Events } from "./pages/events/Events";

// blogs
import AddNewBlog from "./pages/blogs/AddNewBlog";
import { BlogDetail } from "./pages/blogs/BlogDetail";
import { Blogs } from "./pages/blogs/Blogs";

// admin
import { AdminDashboard } from "./pages/adminDashboard/AdminDashboard";
import AdminBlogDetails from "./pages/adminDashboard/Blogs/AdminBlogDetails";
import AdminBlogs from "./pages/adminDashboard/Blogs/AdminBlogs";
import CareerExplorer from "./pages/adminDashboard/CareerExplorer/CareerExplorer";
import AdminEvents from "./pages/adminDashboard/Events/AdminEvents";

// user blogs
import {
  ADMIN_DASHBOARD_ROUTES,
  AUTH_ROUTES,
  BLOG_ROUTES,
  CAREERS_ROUTE,
  EVENTS_ROUTE,
  HOME_ROUTE,
  USER_DASHBOARD_ROUTES,
} from "./constants/navigation";
import EditDomainPage from "./pages/adminDashboard/SkillTracking/EditDomainPage";
import LessonPage from "./pages/adminDashboard/SkillTracking/LessonPage";
import ModuleTracking from "./pages/adminDashboard/SkillTracking/ModuleTracking";
import SkilltrackingManagement from "./pages/adminDashboard/SkillTracking/SkilltrackingManagement";
import { CareerDetail } from "./pages/careers/CareerDetail";
import UserBlogs from "./pages/dashboard/blogs/UserBlogs";
import Roadmap from "./pages/dashboard/roadmaps/Roadmap";
import ViewRoadMap from "./pages/dashboard/roadmaps/ViewRoadMap";
import Lessons from "./pages/dashboard/skillTracking/domainTracker/components/Lessons";
import { EventDetails } from "./pages/events/EventDetails";
import EditEvent from "./pages/adminDashboard/Events/EditEvent";
import AddEvent from "./pages/adminDashboard/Events/AddEvent";

// TODO : lazy load the pages

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Accessible to everyone */}
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={BLOG_ROUTES.INDEX}>
            <Route index element={<Blogs />} />
            <Route path={BLOG_ROUTES.DETAILS} element={<BlogDetail />} />
          </Route>

          {/* events route */}
          <Route path={EVENTS_ROUTE.INDEX}>
            <Route index element={<Events />} />
            <Route path={EVENTS_ROUTE.DETAILS} element={<EventDetails />} />
          </Route>

          {/* career explorer */}
          <Route path={CAREERS_ROUTE.INDEX}>
            <Route index element={<Careers />} />
            <Route path={CAREERS_ROUTE.DETAILS} element={<CareerDetail />} />
          </Route>

          {/* Auth Routes - Only for guests (redirects logged-in users) */}
          <Route path={AUTH_ROUTES.INDEX}>
            <Route
              path={AUTH_ROUTES.LOGIN}
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path={AUTH_ROUTES.SIGNUP}
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path={AUTH_ROUTES.FORGOT_PASSWORD}
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path={AUTH_ROUTES.RESET_PASSWORD}
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route path={AUTH_ROUTES.VERIFY_IDENTITY} element={<Otp />} />
            <Route path={AUTH_ROUTES.RESEND_OTP} element={<ResendOtp />} />
          </Route>

          {/* User Dashboard Routes - Protected for authenticated users */}
          <Route path={USER_DASHBOARD_ROUTES.INDEX}>
            <Route
              index
              element={
                <UserProtectedRoute>
                  <Dashboard />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.CAREER_ASSESSMENT}
              element={
                <UserProtectedRoute>
                  <AssessmentFlowManager />
                </UserProtectedRoute>
              }
            />
            <Route path={USER_DASHBOARD_ROUTES.SKILL_TRACKER}>
              <Route
                index
                element={
                  <UserProtectedRoute>
                    <SkillTracking />
                  </UserProtectedRoute>
                }
              />
              <Route
                path={USER_DASHBOARD_ROUTES.DOMAIN_TRACKER}
                element={
                  <UserProtectedRoute>
                    <DomainTracker />
                  </UserProtectedRoute>
                }
              />
              <Route
                path={USER_DASHBOARD_ROUTES.LESSON_TRACKER}
                element={
                  <UserProtectedRoute>
                    <Lessons />
                  </UserProtectedRoute>
                }
              />
              <Route
                path={USER_DASHBOARD_ROUTES.SKILL_ASSESSMENT}
                element={
                  <UserProtectedRoute>
                    <SkillAssessment />
                  </UserProtectedRoute>
                }
              />
            </Route>
            <Route
              path={USER_DASHBOARD_ROUTES.MENTORSHIP}
              element={
                <UserProtectedRoute>
                  <Mentors />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.ROADMAPS}
              element={
                <UserProtectedRoute>
                  <Roadmap />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.VIEW_ROADMAP}
              element={
                <UserProtectedRoute>
                  <ViewRoadMap />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.ACHIEVEMENTS}
              element={
                <UserProtectedRoute>
                  <Achievements />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.SETTINGS}
              element={
                <UserProtectedRoute>
                  <Settings />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.VIEW_MY_BLOGS}
              element={
                <UserProtectedRoute>
                  <UserBlogs />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.CREATE_BLOG}
              element={
                <UserProtectedRoute>
                  <AddNewBlog />
                </UserProtectedRoute>
              }
            />
          </Route>

          {/* Admin Dashboard Routes - Protected for admin users only */}
          <Route path={ADMIN_DASHBOARD_ROUTES.INDEX}>
            <Route
              index
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.BLOGS}
              element={
                <AdminProtectedRoute>
                  <AdminBlogs />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.VIEW_BLOG}
              element={
                <AdminProtectedRoute>
                  <AdminBlogDetails />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.EVENTS_MANAGEMENT}
              element={
                <AdminProtectedRoute>
                  <AdminEvents />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.ADD_EVENT}
              element={
                <AdminProtectedRoute>
                  <AddEvent />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.EDIT_EVENT}
              element={
                <AdminProtectedRoute>
                  <EditEvent />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.CAREERS_MANAGEMENT}
              element={
                <AdminProtectedRoute>
                  <CareerExplorer />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.SKILL_TRACKING_MANAGEMENT}
              element={
                <AdminProtectedRoute>
                  <SkilltrackingManagement />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.SKILL_TRACKING_EDIT}
              element={
                <AdminProtectedRoute>
                  <EditDomainPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.MODULE_TRACKING_MANAGEMENT}
              element={
                <AdminProtectedRoute>
                  <ModuleTracking />
                </AdminProtectedRoute>
              }
            />
            <Route
              path={ADMIN_DASHBOARD_ROUTES.LESSON_TRACKING_MANAGEMENT}
              element={
                <AdminProtectedRoute>
                  <LessonPage />
                </AdminProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
