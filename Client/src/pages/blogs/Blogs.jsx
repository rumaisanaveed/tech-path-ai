import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { blogData } from "@/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BlogCard } from "@/components/blogs/BlogCard";
import usePageTitle from "@/hooks/usePageTitle";

export const Blogs = () => {
  usePageTitle("Blogs");
  return (
    <MainLayout>
      <div className="h-full w-full gap-6 px-6 py-10 md:px-10 lg:px-14 xl:px-16">
        <div className="grid h-full grid-cols-5 lg:grid-cols-11 auto-rows-[120px] sm:auto-rows-[200px] lg:auto-rows-[150px] xl:auto-rows-[120px] gap-2 md:gap-4 3xl:max-w-7xl 3xl:mx-auto">
          {blogData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination className="pt-9">
          <PaginationContent className="text-custom-gray-light flex items-center gap-[4px] text-sm md:text-base font-normal">
            <PaginationItem className="p-0 m-0">
              <PaginationPrevious />
            </PaginationItem>
            {[1, 2, 3].map((item, index) => (
              <PaginationItem key={index} className="p-0 m-0">
                <PaginationLink className="px-2 py-1">{item}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="p-0 m-0">
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </MainLayout>
  );
};
