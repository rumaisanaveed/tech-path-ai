import { GetAllBlogs, GetBlogTags } from "@/apiService/BlogsTracking";
import {
  AdminBlogsSkeleton,
  EmptyBlogsState,
} from "@/components/admin/blogs/AdminBlogComponents";
import { mockBlogs } from "@/components/admin/blogs/constants";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import AdminBlogCard from "@/components/blogs/AdminBlogCard";
import { SearchBar } from "@/components/search/SearchBar";
import useDebounce from "@/hooks/debouncing";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Book, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminBlogs = () => {
  usePageTitle("Admin Blogs");

  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const debouncedSearch = useDebounce(search);

  const navigate = useNavigate();

  const { data, isLoading, isError } = GetAllBlogs({
    page,
    limit,
    search: debouncedSearch,
    tagName: selectedTag,
  });

  const blogs = data?.blogs || [];
  const pagination = data?.pagination;
  const { data: tagsResponse } = GetBlogTags();
  const tags = tagsResponse?.tags || [];

  console.log("Blogs Data:", data, "tags:", tags);

  const handleEdit = (post) => {
    navigate(`/admin/dashboard/blogs/edit/${post.id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete Blog ID:", id);
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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            wrapperClassName="flex-1 max-w-md"
            variant="compact"
            placeholder="Search blogs by title, tags and more.."
          />

          {/* Tags Filter */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            {tags.map((tag) => {
              const isActive = selectedTag === tag.name;

              return (
                <button
                  key={tag.id}
                  onClick={() => {
                    setSelectedTag(selectedTag === tag.name ? null : tag.name);
                    setPage(1);
                  }}
                  className={`
          inline-flex items-center gap-1.5
          px-3 py-1.5
          rounded-full text-xs sm:text-sm
          border transition-all
          whitespace-nowrap
          ${
            isActive
              ? "bg-[#59A4C0] text-white border-[#59A4C0] shadow-sm"
              : "bg-[#59A4C0]/10 text-[#59A4C0] border-[#59A4C0]/30 hover:bg-[#59A4C0]/20"
          }
        `}
                >
                  <Tag size={12} />
                  <span className="font-medium">{tag.name}</span>
                  <span className="opacity-70">({tag.usageCount})</span>
                </button>
              );
            })}
          </div>

          {/* Loading */}
          {isLoading && <AdminBlogsSkeleton />}

          {/* Error */}
          {isError && <EmptyBlogsState />}

          {/* Data */}
          {!isLoading && !isError && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {blogs.map((post) => (
                  <AdminBlogCard
                    key={post.id || post._id}
                    post={post}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {blogs.length === 0 && <EmptyBlogsState />}
            </>
          )}
          {pagination && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span className="px-3 py-1 text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminBlogs;
