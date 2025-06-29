import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const CareerCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Image placeholder */}
      <Skeleton className="h-[200px] w-full rounded-md" />

      {/* Text content */}
      <div className="flex flex-col gap-3">
        {/* Title */}
        <Skeleton className="h-[24px] w-3/4" />

        {/* Subtitle */}
        <Skeleton className="h-[18px] w-full" />
      </div>

      {/* Button placeholder */}
      <Skeleton className="h-[40px] w-[120px] rounded-full" />
    </div>
  );
};
