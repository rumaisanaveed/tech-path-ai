import { Search } from "lucide-react";
import React from "react";

export const SearchBar = ({ placeholderText = "", query = "" }) => {
  // TODO : can be wrapped in use memo later to cache the results
  return (
    <div className="p-[2px] rounded-3xl md:rounded-full bg-custom-off-white w-full border border-custom-gray-dark">
      <div className="flex items-center bg-custom-off-white rounded-full px-4 py-2 md:py-2.5 gap-2">
        <Search className="h-5 w-5 md:w-6 md:h-6 text-custom-gray-dark" />
        <input
          type="text"
          className="w-full outline-none bg-transparent text-sm md:text-base text-black font-normal placeholder:text-custom-gray-dark placeholder:font-normal"
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
};
