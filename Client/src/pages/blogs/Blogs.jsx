import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { BlogCard } from "@/components/blogs/BlogCard";
import usePageTitle from "@/hooks/usePageTitle";
import { BlogsGridSkeleton } from "@/components/blogs/BlogsGridSkeleton";
import { CustomPagination } from "@/components/CustomPagination";
import { FetchBlogsForUsers } from "@/apiService/BlogsTracking";
import useDebounce from "@/hooks/debouncing";
import { SearchBar } from "@/components/search/SearchBar";

const Blogs = () => {
  usePageTitle("Blogs");

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError } = FetchBlogsForUsers({
    page,
    limit,
    search: debouncedSearch,
    tagName: selectedTag,
  });

  const blogs = data?.blogs || [];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col w-full gap-6 px-6 py-10 md:px-10 3xl:mx-auto 3xl:max-w-7xl">
        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar
            placeholder="Search blogs..."
            value={search}
            onChange={handleSearchChange}
            variant="default"
          />
        </div>

        {/* Blogs Grid */}
        {isLoading ? (
          <BlogsGridSkeleton />
        ) : isError ? (
          <div className="text-center py-10">
            <p className="text-red-500 text-lg">Failed to load blogs. Please try again.</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No blogs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {blogs.map((post) => (
              <BlogCard
                key={post.id}
                post={{
                  id: post.id,
                  title: post.title,
                  image: post.coverImage,
                  category: post.tags?.[0]?.name || "Uncategorized",
                  tags: post.tags,
                  slug: post.slug,
                }}
                variant="compact"
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data?.pagination && blogs.length > 0 && (
          <div className="mt-8">
            <CustomPagination
              currentPage={page}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Blogs;