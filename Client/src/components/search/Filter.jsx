import { Filter } from "lucide-react";
import React from "react";

export const FilterButton = () => {
  return (
    <button className="rounded-full p-3 md:w-14 md:h-14 bg-custom-off-white border border-custom-gray-dark flex items-center justify-center">
      <Filter className="h-5 w-5 md:w-6 md:h-6" color="#707070" />
    </button>
  );
};
