import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="border-custom-gray-light-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center pb-2">
              <Skeleton className="h-4 w-24" /> {/* Card title */}
              <Skeleton className="h-5 w-5 rounded-full" /> {/* Icon */}
            </div>
            <Skeleton className="h-8 w-16 mt-2" /> {/* Value */}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity (lg:col-span-2) */}
        <div className="lg:col-span-2 border-custom-gray-light-200 rounded-lg p-4 shadow-sm">
          <Skeleton className="h-5 w-40 mb-4" /> {/* Header */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="border-custom-gray-light-200 rounded-lg p-4 shadow-sm">
          <Skeleton className="h-5 w-32 mb-4" /> {/* Header */}
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="border-custom-gray-light-200 rounded-lg p-4 shadow-sm"
          >
            <Skeleton className="h-5 w-32 mb-3" /> {/* Card header */}
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
