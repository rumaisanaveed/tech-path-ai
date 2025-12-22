import { EventsHeader } from "@/components/admin/events/EventsComponents";
import AdminBlogCard from "@/components/blogs/AdminBlogCard";
import { SearchBar } from "@/components/search/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Book, Edit, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/296eb834-aa38-4907-a632-f26d1fa48bc9.png",
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
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/2a82cae9-011a-4424-9d74-136aed18fe59.jpg",
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
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/296eb834-aa38-4907-a632-f26d1fa48bc9.png",
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
    coverImage:
      "https://careermentor-blogs.s3.eu-north-1.amazonaws.com/blogs/2a82cae9-011a-4424-9d74-136aed18fe59.jpg",
    tags: ["React", "Performance", "JavaScript", "Frontend"],
    publishedAt: "2025-06-07",
    excerpt:
      "Master the art of optimizing React applications for better performance and user experience...",
    views: 1750,
    readTime: "6 min read",
  },
];

const AdminBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleEdit = (post) => {
    console.log("Edit Blog ID:", post.id);
    navigate(`/admin/dashboard/blogs/edit/${post.id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete Blog ID:", id);
  };

  const handleAddNew = () => {
    console.log("Add new blog clicked");
    navigate("/admin/dashboard/blogs/add");
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-4">
          <EventsHeader
            icon={<Book className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-light-blue"
            buttonClassName="bg-custom-light-blue"
            title="Blogs Management"
            buttonTitle="Add Blog"
            onAddButtonClick={handleAddNew}
            subtitle="Review, publish, or manage platform blogs"
          />

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="flex-1 max-w-md"
            variant="compact"
            placeholder="Search blogs by title, tags and more.."
          />

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#59A4C0]/20 overflow-hidden"
                >
                  <Skeleton className="h-44 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {mockBlogs.map((post) => (
                  <AdminBlogCard
                    key={post.id}
                    post={post}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {/* Empty State */}
              {mockBlogs.length === 0 && (
                <div className="text-center py-24">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-fullbg-[#59A4C0]/10 flex items-center justify-center">
                    <Edit size={28} className="text-[#59A4C0]" />
                  </div>

                  <h3 className="text-2xl font-semibold text-custom-black-dark mb-2">
                    No blogs yet
                  </h3>

                  <p className="text-custom-gray-light mb-6 max-w-md mx-auto">
                    Start writing blogs to share your knowledge with your
                    audience.
                  </p>

                  <button
                    onClick={handleAddNew}
                    className="px-6 py-3 rounded-fullbg-[#59A4C0]text-white font-medium hover:bg-[#4A94AF] transition"
                  >
                    Create First Blog
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminBlogs;
