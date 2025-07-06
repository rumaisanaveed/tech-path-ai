import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

export const SelectionDropdown = ({ items, onAction }) => {
  // handle the item click with onaction callback
  const [active, setActive] = useState("");

  return (
    <DropdownMenuContent
      align="end"
      sideOffset={8}
      className="bg-custom-gray-light-200 animate-in fade-in slide-in-from-top-1"
    >
      {items.map((domain) => (
        <DropdownMenuItem
          key={domain}
          onClick={() => setActive(domain)}
          className={`px-4 py-2 text-sm cursor-pointer font-medium text-center w-full justify-center ${
            active === domain
              ? "bg-[#F6A609]"
              : "hover:bg-[#F6A609]/80 hover:text-white text-black"
          }`}
        >
          {domain}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
