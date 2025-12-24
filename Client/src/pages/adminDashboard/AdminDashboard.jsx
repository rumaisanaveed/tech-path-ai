import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { FileText, Calendar, Briefcase } from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6 bg-gray-50 p-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold text-custom-black">
            Dashboard
          </h1>
          <p className="text-sm text-custom-gray-dark">
            Overview of blogs, events, and careers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-custom-gray-light-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-custom-gray-light">
                Total Blogs
              </CardTitle>
              <FileText className="h-5 w-5 text-custom-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-custom-black">34</div>
            </CardContent>
          </Card>

          <Card className="border-custom-gray-light-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-custom-gray-light">
                Total Events
              </CardTitle>
              <Calendar className="h-5 w-5 text-custom-light-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-custom-black">12</div>
            </CardContent>
          </Card>

          <Card className="border-custom-gray-light-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-custom-gray-light">
                Total Careers
              </CardTitle>
              <Briefcase className="h-5 w-5 text-custom-text-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-custom-black">7</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 border-custom-gray-light-200">
            <CardHeader>
              <CardTitle className="text-custom-black">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-custom-gray-dark">
              <div>
                📝 Blog added:{" "}
                <span className="font-medium text-custom-black">
                  AI Roadmap
                </span>{" "}
                – 2 hours ago
              </div>
              <div>
                📅 Event added:{" "}
                <span className="font-medium text-custom-black">Tech Talk</span>{" "}
                – yesterday
              </div>
              <div>
                💼 Career added:{" "}
                <span className="font-medium text-custom-black">
                  Frontend Intern
                </span>{" "}
                – 3 days ago
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-custom-gray-light-200">
            <CardHeader>
              <CardTitle className="text-custom-black">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-col">
                <span className="font-medium text-custom-black">
                  Career Expo
                </span>
                <span className="text-custom-gray-dark">28 Dec 2025</span>
              </div>
              <Separator className="bg-custom-gray" />
              <div className="flex flex-col">
                <span className="font-medium text-custom-black">
                  Dev Meetup
                </span>
                <span className="text-custom-gray-dark">3 Jan 2026</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Latest Content */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-custom-gray-light-200">
            <CardHeader>
              <CardTitle className="text-custom-black">Latest Blogs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-custom-gray-dark">
              <div>How AI Helps Students</div>
              <div>Study Abroad Guide</div>
              <div>Web Development Roadmap</div>
            </CardContent>
          </Card>

          <Card className="border-custom-gray-light-200">
            <CardHeader>
              <CardTitle className="text-custom-black">Latest Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-custom-gray-dark">
              <div>Tech Talk 2025</div>
              <div>Career Counseling Session</div>
              <div>AI Bootcamp</div>
            </CardContent>
          </Card>

          <Card className="border-custom-gray-light-200">
            <CardHeader>
              <CardTitle className="text-custom-black">
                Latest Careers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-custom-gray-dark">
              <div>Frontend Intern</div>
              <div>Backend Developer</div>
              <div>UI/UX Designer</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
