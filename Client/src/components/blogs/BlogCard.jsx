import { useScreenSize } from "@/hooks/useScreenSize";
import { truncateText } from "@/utils/helpers";
import React from "react";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({ post, className = "", variant = "default" }) => {
  console.log("BlogCard post:", post);
  const navigate = useNavigate();
  const { isSmallScreen } = useScreenSize();

  const handleNavigate = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${
        variant === "compact" ? "h-80" : "h-full"
      } ${className}`}
      style={{
        backgroundImage: `url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => handleNavigate(post.slug)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
      <div className="absolute bottom-0 p-4 md:p-6 text-white w-full">
        <span className="bg-white text-black px-3 py-1.5 rounded-full font-medium text-xs md:text-sm inline-block mb-3">
          {variant === "compact"
            ? post.category
            : isSmallScreen
            ? truncateText(post.category, 10)
            : post.category}
        </span>
        <h3 className="font-semibold leading-snug text-sm md:text-base lg:text-lg line-clamp-2">
          {post.title}
        </h3>
      </div>
    </div>
  );
};
