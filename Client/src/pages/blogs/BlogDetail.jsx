import { useNavigate, useParams } from "react-router-dom";
import BlogImage from "@/assets/images/blog.png";
import MainLayout from "@/layouts/MainLayout";
import { blogData } from "@/constants";
import { BlogCard } from "@/components/blogs/BlogCard";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <img
              src={BlogImage}
              alt="blog"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
          <div
            className="lg:col-span-1 rounded-xl p-5 lg:p-10 flex flex-col justify-center gap-2 lg:gap-6"
            style={{
              background:
                "linear-gradient(107deg, rgba(243, 179, 78, 0.20) 0%, rgba(255, 210, 114, 0.20) 50%, rgba(89, 164, 192, 0.20) 100%)",
            }}
          >
            <span className="text-sm md:text-base text-black bg-white rounded-full w-fit px-4 py-1 font-medium">
              Back-end Development
            </span>
            <h1 className="text-2xl md:text-4xl font-semibold">
              What is Backend Development? A Beginner’s Guide
            </h1>
            <p className="text-sm md:text-base text-black font-medium">
              By Author Name
            </p>
          </div>
        </div>

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
