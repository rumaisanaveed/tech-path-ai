import {
  AdminBlogsSkeleton,
  EmptyBlogsState,
} from "@/components/admin/blogs/AdminBlogComponents";
import { mockBlogs } from "@/components/admin/blogs/constants";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import AdminBlogCard from "@/components/blogs/AdminBlogCard";
import { SearchBar } from "@/components/search/SearchBar";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Book } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminBlogs = () => {
  usePageTitle("Admin Blogs");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleEdit = (post) => {
    navigate(`/admin/dashboard/blogs/edit/${post.id}`);
  };

  const handleDelete = (id) => {
    // console.log("Delete Blog ID:", id);
  };

  const handleAddNew = () => {
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

          {loading ? (
            <AdminBlogsSkeleton />
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

              {mockBlogs.length === 0 && <EmptyBlogsState />}
            </>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminBlogs;
