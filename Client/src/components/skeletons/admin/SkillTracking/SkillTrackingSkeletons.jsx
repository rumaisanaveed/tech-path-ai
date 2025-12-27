import { Skeleton } from "@/components/ui/skeleton";

export const SkillTrackingCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
        >
          {/* Image */}
          <div className="relative h-40 w-full bg-muted" />

          {/* Content */}
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Title */}
            <Skeleton className="h-4 w-full rounded-md" />{" "}
            {/* Description line 1 */}
            <Skeleton className="h-4 w-5/6 rounded-md" />{" "}
            {/* Description line 2 */}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pb-4 px-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-12 rounded-full" /> {/* Switch */}
              <Skeleton className="h-4 w-10 rounded-md" /> {/* Active label */}
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16 rounded-md" /> {/* Edit button */}
              <Skeleton className="h-8 w-16 rounded-md" /> {/* Delete button */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
