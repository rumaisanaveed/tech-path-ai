import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const EventSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-custom-gray pb-8 w-full">
      {/* Image Skeleton - match exact width of Event component */}
      <div className="w-32 md:w-48 aspect-square rounded-full overflow-hidden shrink-0">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Text Skeleton */}
      <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto text-center md:text-left items-center md:items-start">
        {/* Date */}
        <Skeleton className="h-4 w-40 md:w-52" />

        {/* Title */}
        <Skeleton className="h-6 w-3/4 md:w-2/3" />

        {/* Tags */}
        <div className="flex items-center overflow-x-scroll gap-2 w-72 lg:flex-wrap md:w-full lg:overflow-x-hidden">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-20 rounded-full shrink-0" />
          ))}
        </div>

        {/* Description lines */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />

        {/* Button */}
        <Skeleton className="h-8 w-28 rounded-full mt-2" />
      </div>
    </div>
  );
};
