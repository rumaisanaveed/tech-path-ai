import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  Share2,
  BookOpen,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pending: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
    label: "Pending Review",
    description: "This blog is awaiting review and approval.",
  },
  approved: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
    label: "Approved",
    description: "This blog has been approved and is live.",
  },
  rejected: {
    color: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
    label: "Rejected",
    description: "This blog has been rejected and needs revision.",
  },
};

// Simulated API response
const mockBlogData = [
  {
    id: 5,
    title: "Web Development Best Practices for Modern Applications",
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/296eb834-aa38-4907-a632-f26d1fa48bc9.png",
    shortDesc:
      "A comprehensive guide covering essential web development practices, from responsive design to performance optimization, helping developers create scalable and maintainable applications.",
    longDesc:
      "<p>Web development is a dynamic and fast-evolving field that encompasses the creation and maintenance of websites and web applications. It involves a combination of programming, design, content creation, and server-side configuration to deliver functional and visually appealing digital experiences to users across various devices and platforms.</p><p>Modern web development requires understanding of multiple technologies including HTML5, CSS3, JavaScript frameworks like React or Vue.js, backend technologies, databases, and deployment strategies. This comprehensive approach ensures applications are not only functional but also performant, accessible, and user-friendly.</p><p>Key areas covered include responsive design principles, performance optimization techniques, security best practices, and modern development workflows that enhance productivity and code quality.</p>",
    author: "Abdul Wasay",
    publishedAt: "2025-06-12T23:08:19.000Z",
    status: "pending",
    createdAt: "2025-06-12T23:08:19.000Z",
    updatedAt: "2025-06-12T23:08:19.000Z",
    userId: 1,
    readTime: "2 min read",
    authorInfo: {
      firstName: "Abdul",
      lastName: "Wasay",
      bio: "Full-stack developer with 2+ years of experience in modern web technologies.",
    },
    Tags: [
      { name: "Backend" },
      { name: "Frontend" },
      { name: "Web Development" },
      { name: "JavaScript" },
      { name: "React" },
    ],
  },
];

const AdminBlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const blogData = mockBlogData.find((b) => b.id === parseInt(id));
      if (blogData) {
        setBlog(blogData);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setStatusLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBlog((prev) => ({ ...prev, status: newStatus }));
      setStatusLoading(false);
      // Show success notification here
    }, 1000);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="w-32 h-6" />
      </div>

      {/* Cover Image */}
      <Skeleton className="w-full h-80 rounded-2xl" />

      {/* Title and meta */}
      <div className="space-y-4">
        <Skeleton className="w-3/4 h-10" />
        <div className="flex gap-4">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-24 h-6 rounded-full" />
        </div>
      </div>

      {/* Content areas */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="w-full h-32 rounded-xl" />
          <Skeleton className="w-full h-48 rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );

  if (loading || !blog) {
    return (
      <AdminDashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
            <LoadingSkeleton />
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  const statusInfo = statusConfig[blog.status];
  const StatusIcon = statusInfo.icon;

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          {/* Header Navigation */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/dashboard/blogs")}
              className="flex items-center gap-2 hover:bg-blue-50 border-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Blog Management</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Blog Details</span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative mb-8">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge
                  className={`${statusInfo.color} border mb-4 flex items-center gap-2 w-fit`}
                >
                  <StatusIcon className="w-4 h-4" />
                  {statusInfo.label}
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Author Info */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-900">
                          {blog.authorInfo.firstName} {blog.authorInfo.lastName}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {blog.authorInfo.bio}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(blog.publishedAt), "MMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Short Description */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Short Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {blog.shortDesc}
                  </p>
                </CardContent>
              </Card>

              {/* Long Description */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Full Content
                  </h3>
                  <div
                    className="prose prose-gray max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.longDesc }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Management */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    Blog Status
                  </h3>

                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-lg border ${statusInfo.color}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon className="w-5 h-5" />
                        <span className="font-medium">{statusInfo.label}</span>
                      </div>
                      <p className="text-sm opacity-90">
                        {statusInfo.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Change Status
                      </label>
                      <Select
                        value={blog.status}
                        onValueChange={handleStatusChange}
                        disabled={statusLoading}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-600" />
                              <span>Pending Review</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="approved">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                              <span>Approved</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="rejected">
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span>Rejected</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {statusLoading && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Updating status...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-blue-600" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.Tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Blog Meta Information */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Blog Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm font-medium text-gray-900">
                        {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-600">
                        Last Updated
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {format(new Date(blog.updatedAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-600">Published</span>
                      <span className="text-sm font-medium text-gray-900">
                        {format(new Date(blog.publishedAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-600">Author ID</span>
                      <span className="text-sm font-medium text-gray-900">
                        #{blog.userId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Blog ID</span>
                      <span className="text-sm font-medium text-gray-900">
                        #{blog.id}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-blue-50 border-gray-200"
                      onClick={() => window.open(blog.coverImage, "_blank")}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Cover Image
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50 border-gray-200"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Blog
                    </Button>
                    <Separator className="my-4" />
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Delete Blog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminBlogDetails;
