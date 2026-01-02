import { FetchSingleBlogForUsers } from "@/apiService/BlogsTracking";
import { BlogCard } from "@/components/blogs/BlogCard";
import ProseKitRenderer from "@/components/editor/examples/full/ProseKitRenderer";
import { ImageHeader } from "@/components/ImageHeader";
import { BlogDetailsSkeleton } from "@/components/skeletons/blogs/BlogDetailsSkeleton";
import MainLayout from "@/layouts/MainLayout";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { slug } = useParams();

  const { data, isLoading } = FetchSingleBlogForUsers(slug);

  const blog = data?.blog;
  const recommendedBlogs = data?.recommendedBlogs || [];

  // Transform recommended blogs to match BlogCard expected format
  const transformedRecommendedBlogs = recommendedBlogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    image: blog.coverImage,
    category: blog.tags?.[0] || "Article",
    slug: blog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  }));

  return (
    <MainLayout>
      {isLoading ? (
        <BlogDetailsSkeleton />
      ) : blog ? (
        <div className="w-full px-4 sm:px-8 md:px-10 py-10 flex flex-col h-full gap-3 lg:gap-7">
          {/* Blog Header */}
          <ImageHeader
            imagePath={blog.coverImage}
            imageClassName="max-h-[400px]"
            customBody={
              <>
                <span className="text-sm md:text-base text-black bg-white rounded-full w-fit px-4 py-1 font-medium">
                  {blog.tags?.[0] || "Article"}
                </span>
                <h1 className="text-2xl md:text-4xl font-semibold">
                  {blog.title}
                </h1>
                <p className="text-sm md:text-base text-gray-700 mt-2">
                  {blog.shortDesc}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <span>{blog.timeToRead} min read</span>
                  <span>•</span>
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                
                {/* Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs md:text-sm bg-white/70 text-gray-800 px-3 py-1 rounded-full border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            }
          />

          {/* Blog Content */}
          <ProseKitRenderer contentString={blog.longDesc} />

          <div className="pt-4">
            <hr className="border-t-2 border-gray-200" />
          </div>

          {/* Recommended Blogs Section */}
          {transformedRecommendedBlogs.length > 0 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl md:text-4xl font-semibold">
                Recommended articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {transformedRecommendedBlogs.map((post) => (
                  <BlogCard
                    post={post}
                    key={post.id}
                    className="w-full h-[250px] lg:h-[300px]"
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 text-lg">Blog not found</p>
        </div>
      )}
    </MainLayout>
  );
};

export default BlogDetail;