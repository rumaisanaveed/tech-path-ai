import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AdminCareerCard = ({ career }) => {
  const navigate = useNavigate();
  return (
    <div
      key={career.id}
      className="group flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4"
    >
      {/* Left: Image + Name */}
      <div className="flex items-center gap-4">
        <img
          src={career.image}
          alt={career.name}
          className="h-16 w-16 rounded-lg object-cover border"
        />

        <h3 className="text-lg font-medium text-custom-black-dark group-hover:text-custom-orange-dark transition truncate">
          {career.name}
        </h3>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-md border border-custom-orange-dark/30 text-custom-orange-dark hover:bg-custom-orange-dark hover:text-white transition"
          title="Edit"
          onClick={() => navigate(`/admin/dashboard/careers/edit/${career.id}`)}
        >
          <Pencil size={18} />
        </button>

        <button
          className="p-2 rounded-md border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export const AdminCareersSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-24 rounded-xl" />
      ))}
    </div>
  );
};
