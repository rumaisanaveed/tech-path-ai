import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { blogData } from "@/constants";
import { BlogCard } from "@/components/blogs/BlogCard";
import usePageTitle from "@/hooks/usePageTitle";

export const Blogs = () => {
  usePageTitle("Blogs");
  return (
    <MainLayout>
      <div className="h-full w-full gap-6 px-6 py-10 md:px-10 3xl:mx-auto 3xl:max-w-7xl">
        <div className="grid h-full grid-cols-5 lg:grid-cols-11 auto-rows-[120px] sm:auto-rows-[200px] lg:auto-rows-[150px] xl:auto-rows-[120px] gap-2 md:gap-4 3xl:max-w-7xl 3xl:mx-auto">
          {/* TODO : add skeletons here */}
          {blogData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
