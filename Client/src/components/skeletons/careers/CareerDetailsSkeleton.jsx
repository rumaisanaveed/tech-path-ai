import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const CareerDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-8 px-6 py-10 md:px-12 lg:px-24 w-full max-w-5xl mx-auto min-h-screen">
      {/* Header Image Skeleton */}
      <Skeleton className="h-[220px] md:h-[280px] lg:h-[310px] w-full rounded-md" />

      {/* Section blocks */}
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col gap-4 md:gap-5">
          {/* Section Heading */}
          <Skeleton className="h-8 w-2/3 md:w-1/2" />

          {/* Paragraph lines */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-9/12" />
          </div>
        </div>
      ))}

      {/* List section (optional) */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-1/2" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
};
