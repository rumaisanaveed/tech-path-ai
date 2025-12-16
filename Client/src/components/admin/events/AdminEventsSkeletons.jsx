import { Skeleton } from "@/components/ui/skeleton";

export const EventCardsSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center"
      >
        {/* Date Skeleton */}
        <div className="w-20 flex-shrink-0 text-center space-y-2">
          <Skeleton className="h-6 w-10 mx-auto" />
          <Skeleton className="h-3 w-12 mx-auto" />
          <Skeleton className="h-3 w-14 mx-auto" />
        </div>

        {/* Event Info Skeleton */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />

          <div className="flex gap-3 mt-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex gap-2 flex-wrap max-w-xs">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>

        {/* Status Skeleton */}
        <Skeleton className="h-6 w-28 rounded-full" />

        {/* Actions Skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-8 w-[120px] rounded-md" />
          <Skeleton className="h-8 w-10 rounded-md" />
        </div>
      </div>
    ))}
  </div>
);
