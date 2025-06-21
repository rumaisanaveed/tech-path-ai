import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import usePageTitle from "@/hooks/usePageTitle";

const mockBlogs = [
  {
    id: 5,
    title: "Web Development Best Practices for Modern Applications",
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/296eb834-aa38-4907-a632-f26d1fa48bc9.png",
    author: "Ali Khan",
    tags: ["AI", "Education", "Technology"],
    status: "pending",
    publishedAt: "2025-06-12",
    views: 1250,
    excerpt:
      "Explore the latest trends and best practices in web development...",
  },
  {
    id: 2,
    title: "DevOps Best Practices for Scalable Infrastructure",
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/2a82cae9-011a-4424-9d74-136aed18fe59.jpg",
    author: "Sara Ahmed",
    tags: ["DevOps", "CI/CD", "Infrastructure"],
    status: "approved",
    publishedAt: "2025-06-10",
    views: 2840,
    excerpt: "Learn how to implement robust DevOps practices for your team...",
  },
  {
    id: 3,
    title: "Career in Game Development: A Complete Guide",
    coverImage: "https://source.unsplash.com/400x200/?gaming,career",
    author: "Umar Yousuf",
    tags: ["GameDev", "Unity", "Career", "Cloud"],
    status: "rejected",
    publishedAt: "2025-06-08",
    views: 890,
    excerpt:
      "Everything you need to know about starting a career in game development...",
  },
  {
    id: 4,
    title: "Cloud Computing Trends and Future Predictions",
    coverImage: "https://source.unsplash.com/400x200/?cloud,technology",
    author: "Zain Raza",
    tags: ["Cloud", "Infrastructure", "AWS"],
    status: "pending",
    publishedAt: "2025-06-11",
    views: 1560,
    excerpt:
      "Discover the latest trends shaping the future of cloud computing...",
  },
];

const statusConfig = {
  pending: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
    label: "Pending Review",
  },
  approved: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
    label: "Approved",
  },
  rejected: {
    color: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
    label: "Rejected",
  },
};

const filterOptions = [
  { value: "all", label: "All Blogs", icon: FileText },
  { value: "pending", label: "Pending", icon: Clock },
  { value: "approved", label: "Approved", icon: CheckCircle },
  { value: "rejected", label: "Rejected", icon: XCircle },
];

const AdminBlogs = () => {
  // TODO : fix the pending review hover styles
  usePageTitle("Admin Blogs");
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, status: newStatus } : blog
    );
    setBlogs(updatedBlogs);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesFilter = filter === "all" || blog.status === filter;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const getStatusCounts = () => {
    return {
      all: blogs.length,
      pending: blogs.filter((b) => b.status === "pending").length,
      approved: blogs.filter((b) => b.status === "approved").length,
      rejected: blogs.filter((b) => b.status === "rejected").length,
    };
  };

  const statusCounts = getStatusCounts();

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={`loading-${i}`}
          className="overflow-hidden border-0 shadow-sm bg-white"
        >
          <div className="relative">
            <Skeleton className="w-full h-48" />
            <div className="absolute top-3 right-3">
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="w-3/4 h-6" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-full h-4" />
            <div className="flex gap-2">
              <Skeleton className="w-12 h-5 rounded-full" />
              <Skeleton className="w-16 h-5 rounded-full" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-[120px] h-8 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-custom-black-light flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  Blog Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Review and manage blog submissions
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-custom-black-dark">
                <TrendingUp className="w-4 h-4" />
                <span>{blogs.length} total blogs</span>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search blogs, authors, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {filterOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Button
                      key={option.value}
                      variant={filter === option.value ? "default" : "outline"}
                      onClick={() => setFilter(option.value)}
                      className={`whitespace-nowrap flex items-center gap-2 ${
                        filter === option.value
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "hover:bg-blue-50 border-gray-200"
                      }`}
                      size="sm"
                    >
                      <IconComponent className="w-4 h-4" />
                      {option.label}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {statusCounts[option.value]}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Info */}
          {!loading && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredBlogs.length} of {blogs.length} blogs
                {searchTerm && (
                  <span className="ml-1">
                    for "<span className="font-medium">{searchTerm}</span>"
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Blog Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => {
                const statusInfo = statusConfig[blog.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <Card
                    key={blog.id}
                    className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <Badge
                        className={`absolute top-3 right-3 ${statusInfo.color} border flex items-center gap-1`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-custom-black-dark">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                          <span>•</span>
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {blog.excerpt && (
                        <p className="text-sm text-custom-black-dark line-clamp-2">
                          {blog.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs bg-gray-100 hover:bg-gray-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-100"
                          >
                            +{blog.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-custom-black-dark">
                          <Eye className="w-4 h-4" />
                          <span>
                            {blog.views?.toLocaleString() || "0"} views
                          </span>
                        </div>

                        <Select
                          value={blog.status}
                          onValueChange={(value) =>
                            handleStatusChange(blog.id, value)
                          }
                        >
                          <SelectTrigger className="w-[130px] h-8 text-sm border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                Pending
                              </div>
                            </SelectItem>
                            <SelectItem value="approved">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3" />
                                Approved
                              </div>
                            </SelectItem>
                            <SelectItem value="rejected">
                              <div className="flex items-center gap-2">
                                <XCircle className="w-3 h-3" />
                                Rejected
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-4 text-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
                        onClick={() =>
                          navigate(`/admin/dashboard/blogs/${blog.id}`)
                        }
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredBlogs.length === 0 && (
            <div className="text-center py-16">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-custom-black-dark mb-4">
                {searchTerm
                  ? `No blogs match your search "${searchTerm}"`
                  : `No blogs with status "${filter}"`}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="hover:bg-blue-50"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminBlogs;
