import { useNavigate, useParams } from "react-router-dom";
import BlogImage from "@/assets/images/blog.png";
import MainLayout from "@/layouts/MainLayout";
import { blogData } from "@/constants";
import { BlogCard } from "@/components/blogs/BlogCard";
import { ImageHeader } from "@/components/ImageHeader";

export const BlogDetail = () => {
  //   const { id } = useParams();
  const navigate = useNavigate();
  const recommendedBlogs = blogData
    .slice(0, 4)
    .map(({ span, ...rest }) => rest);

  return (
    <MainLayout>
      <div className="w-full px-4 sm:px-8 md:px-10 py-10 flex flex-col h-full gap-3 lg:gap-7">
        {/* Blog Header */}
        <ImageHeader imagePath={BlogImage} />
        {/* Blog Content */}
        <div className="pt-4">
          <hr className="border-t-2 border-gray-200" />
        </div>
        {/* Recommended Blogs Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl md:text-4xl font-semibold">
            Recommended articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedBlogs.map((post) => (
              <BlogCard
                post={post}
                key={post.id}
                className="w-full h-[250px] lg:h-[300px]"
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
