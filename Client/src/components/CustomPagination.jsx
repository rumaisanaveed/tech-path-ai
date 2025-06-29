import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export const CustomPagination = () => {
  return (
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
  );
};
