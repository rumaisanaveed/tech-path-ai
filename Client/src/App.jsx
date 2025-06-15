import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//Authentication
import {
  ForgotPassword,
  Login,
  Signup,
  VerifyIdentity,
  ResetPassword,
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

function App() {
  return (
    <>
      {/* TODO : avoid repetition here and store the routes in separate file */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs">
            <Route index element={<Blogs />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>
          <Route path="/events" element={<Events />} />
          <Route path="/careers" element={<Careers />} />
          {/* auth */}
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="verify-identity" element={<VerifyIdentity />} />
          </Route>
          {/* dashboard */}
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route
              path="career-assessment"
              element={<AssessmentFlowManager />}
            />
            <Route path="skill-tracker" element={<SkillTracking />} />
            <Route path="mentorship" element={<Mentors />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="settings" element={<Settings />} />
            <Route path="my-blogs" element={<UserBlogs />} />
            <Route path="add-new-blogs" element={<AddNewBlog />} />
          </Route>
          {/* Admin Dashboard */}
          <Route path="/admin-dashboard">
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/:id" element={<AdminBlogDetails />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="career-explorer" element={<CareerExplorer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
