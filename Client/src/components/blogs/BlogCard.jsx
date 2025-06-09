import { useScreenSize } from "@/hooks/useScreenSize";
import { truncateText } from "@/utils/helpers/truncateText";
import React from "react";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({ post, className = "", variant = "default" }) => {
  const navigate = useNavigate();
  const { isSmallScreen } = useScreenSize();
  const handleNavigate = (postId) => {
    navigate(`/blogs/${postId}`);
  };
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${className} ${
        post.span || ""
      }`}
      style={{
        backgroundImage: `url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => handleNavigate(post.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
      <div
        className={`absolute bottom-0 p-4 text-white ${
          variant === "compact" ? "pb-6 w-full" : ""
        }`}
      >
        <span
          className={`bg-white text-black px-2 py-0.5 lg:py-1.5 rounded-full font-medium ${
            variant === "compact"
              ? "text-[10px] md:text-xs inline-block mb-3"
              : "text-[8px] lg:text-xs"
          }`}
        >
          {variant === "compact"
            ? post.category
            : isSmallScreen
            ? truncateText(post.category, 10)
            : post.category}
        </span>
        <h3
          className={`font-semibold leading-snug max-w-xs ${
            variant === "compact"
              ? "text-xs md:text-sm"
              : "text-[8px] sm:text-sm md:text-base mt-1.5 lg:mt-3"
          }`}
        >
          {post.title}
        </h3>
      </div>
    </div>
  );
};
