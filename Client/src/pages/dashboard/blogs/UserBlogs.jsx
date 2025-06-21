import React, { use, useState } from "react";
import { Plus, Edit, Trash2, Calendar, Tag, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import UserBlogCard from "@/components/blogs/UserBlogCard";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

// Sample data (replace with API call later)
const mockBlogs = [
  {
    id: 5,
    title: "Web Development Best Practices for Modern Applications",
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/296eb834-aa38-4907-a632-f26d1fa48bc9.png",
    tags: ["AI", "Education", "Technology"],
    publishedAt: "2025-06-12",
    excerpt:
      "Explore the latest trends and best practices in web development that will help you build scalable and maintainable applications...",
    views: 1250,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "DevOps Best Practices for Scalable Infrastructure",
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/2a82cae9-011a-4424-9d74-136aed18fe59.jpg",
    tags: ["DevOps", "CI/CD", "Infrastructure"],
    publishedAt: "2025-06-10",
    excerpt:
      "Learn how to implement robust DevOps practices for your team and scale your infrastructure effectively...",
    views: 890,
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Career in Game Development: A Complete Guide",
    coverImage: "https://source.unsplash.com/400x200/?gaming,career",
    tags: ["GameDev", "Unity", "Career", "Cloud"],
    publishedAt: "2025-06-08",
    excerpt:
      "Everything you need to know about starting a career in game development, from learning the basics to landing your first job...",
    views: 2100,
    readTime: "12 min read",
  },
  {
    id: 4,
    title: "Cloud Computing Trends and Future Predictions",
    coverImage: "https://source.unsplash.com/400x200/?cloud,technology",
    tags: ["Cloud", "Infrastructure", "AWS"],
    publishedAt: "2025-06-11",
    excerpt:
      "Discover the latest trends shaping the future of cloud computing and how they'll impact businesses worldwide...",
    views: 1580,
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Machine Learning Fundamentals for Beginners",
    coverImage: "https://source.unsplash.com/400x200/?machine-learning,ai",
    tags: ["ML", "AI", "Python", "Data Science"],
    publishedAt: "2025-06-09",
    excerpt:
      "A comprehensive introduction to machine learning concepts, algorithms, and practical applications for beginners...",
    views: 980,
    readTime: "10 min read",
  },
  {
    id: 7,
    title: "React Performance Optimization Techniques",
    coverImage: "https://source.unsplash.com/400x200/?react,performance",
    tags: ["React", "Performance", "JavaScript", "Frontend"],
    publishedAt: "2025-06-07",
    excerpt:
      "Master the art of optimizing React applications for better performance and user experience...",
    views: 1750,
    readTime: "6 min read",
  },
];

const UserBlogs = () => {
  const [loading, setLoading] = useState(false); // change to true if simulating loading
  const navigate = useNavigate();

  const handleEdit = (post) => {
    console.log("Edit Blog ID:", post.id);
    // navigate(`/blogs/edit/${post.id}`); // Uncomment for real navigation
  };

  const handleDelete = (id) => {
    console.log("Delete Blog ID:", id);
    // Add confirmation + API call here later
  };

  const handleView = (post) => {
    console.log("View Blog ID:", post.id);
    // navigate(`/blogs/${post.id}`); // Uncomment for real navigation
  };

  const handleAddNew = () => {
    console.log("Add new blog clicked");
    navigate("/user/dashboard/add-new-blog");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
        <div className="relative px-6 md:px-10 py-6 md:py-8">
          {/* Header Section */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-3xl opacity-10"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200 shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">My Blogs</h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#F3B34E] via-[#FFD272] rounded-full mt-1"></div>
                  </div>
                </div>
                <p className="text-base lg:text-lg font-normal text-custom-black-light">
                  View and manage all the blogs you've written. Click on any
                  blog to view, edit, or delete it.
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {mockBlogs.length} Published
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 shadow-lg">
                  <Skeleton className="h-48 w-full rounded-xl mb-4" />
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {mockBlogs.map((post) => (
                  <UserBlogCard
                    key={post.id}
                    post={post}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                  />
                ))}
              </div>

              {/* Empty State */}
              {mockBlogs.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-r from-[#F3B34E] to-[#5BA7C7] via-[#FFD272] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Edit className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    No blogs yet
                  </h3>
                  <p className="text-custom-black-dark mb-6 max-w-md mx-auto">
                    Start sharing your thoughts and expertise with the world.
                    Create your first blog post today!
                  </p>
                  <button
                    onClick={handleAddNew}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    Create Your First Blog
                  </button>
                </div>
              )}
            </>
          )}

          {/* Add New Blog Floating Button */}
          <button
            onClick={handleAddNew}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#F4C430] to-[#E17B47] hover:brightness-110 text-white font-semibold px-6 py-4 
             rounded-full shadow-xl hover:shadow-2xl transition-transform duration-300 
             hover:scale-110 flex items-center gap-2 group"
          >
            <Plus
              size={20}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            <span className="hidden sm:inline ">Add New Blog</span>
          </button>

          {/* Background Decorations */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-slate-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-slate-100 to-blue-100 rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserBlogs;
