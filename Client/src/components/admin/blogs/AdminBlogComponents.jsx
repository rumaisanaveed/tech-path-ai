import { Skeleton } from "@/components/ui/skeleton";
import { Edit } from "lucide-react";
import React from "react";

export const AdminBlogsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-white border border-[#59A4C0]/20 overflow-hidden"
        >
          <Skeleton className="h-44 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EmptyBlogsState = () => {
  return (
    <div className="text-center py-24">
      <div className="w-20 h-20 mx-auto mb-6 rounded-fullbg-[#59A4C0]/10 flex items-center justify-center">
        <Edit size={28} className="text-[#59A4C0]" />
      </div>

      <h3 className="text-2xl font-semibold text-custom-black-dark mb-2">
        No blogs yet
      </h3>

      <p className="text-custom-gray-light mb-6 max-w-md mx-auto">
        Start writing blogs to share your knowledge with your audience.
      </p>

      <button
        onClick={handleAddNew}
        className="px-6 py-3 rounded-fullbg-[#59A4C0]text-white font-medium hover:bg-[#4A94AF] transition"
      >
        Create First Blog
      </button>
    </div>
  );
};
