import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//Protected Routes
import {
  PublicRoute,
  UserProtectedRoute,
  AdminProtectedRoute,
} from "./components/protectedRoute/protectedRoutes";

//Authentication
import {
  ForgotPassword,
  Login,
  Signup,
  Otp,
  ResetPassword,
  ResendOtp,
} from "./pages/auth";

//Pages
import Home from "./pages/Home";
import { Events } from "./pages/events/Events";
import { Careers } from "./pages/careers/Careers";
import {
  Achievements,
  Dashboard,
  AssessmentFlowManager,
  Mentors,
  Settings,
  SkillTracking,
} from "./pages/dashboard";

// blogs
import { Blogs } from "./pages/blogs/Blogs";
import { BlogDetail } from "./pages/blogs/BlogDetail";
import AddNewBlog from "./pages/blogs/AddNewBlog";

// admin
import { AdminDashboard } from "./pages/adminDashboard/AdminDashboard";
import AdminBlogs from "./pages/adminDashboard/Blogs/AdminBlogs";
import AdminEvents from "./pages/adminDashboard/Events/AdminEvents";
import CareerExplorer from "./pages/adminDashboard/CareerExplorer/CareerExplorer";
import AdminBlogDetails from "./pages/adminDashboard/Blogs/AdminBlogDetails";

// user blogs
import UserBlogs from "./pages/dashboard/blogs/UserBlogs";
import {
  ADMIN_DASHBOARD_ROUTES,
  AUTH_ROUTES,
  BLOG_ROUTES,
  CAREERS_ROUTE,
  EVENTS_ROUTE,
  HOME_ROUTE,
  USER_DASHBOARD_ROUTES,
} from "./constants/navigation";

function App() {
  return (
    <>
      {/* TODO : avoid repetition here and store the routes in separate file */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Accessible to everyone */}
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={BLOG_ROUTES.INDEX}>
            <Route index element={<Blogs />} />
            <Route path={BLOG_ROUTES.DETAILS} element={<BlogDetail />} />
          </Route>
          <Route path={EVENTS_ROUTE} element={<Events />} />
          <Route path={CAREERS_ROUTE} element={<Careers />} />

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
            <Route
              path={USER_DASHBOARD_ROUTES.SKILL_TRACKER}
              element={
                <UserProtectedRoute>
                  <SkillTracking />
                </UserProtectedRoute>
              }
            />
            <Route
              path={USER_DASHBOARD_ROUTES.MENTORSHIP}
              element={
                <UserProtectedRoute>
                  <Mentors />
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
              path={ADMIN_DASHBOARD_ROUTES.CAREERS_MANAGEMENT}
              element={
                <AdminProtectedRoute>
                  <CareerExplorer />
                </AdminProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
