import React from "react";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

export const ActionDropdown = ({ items, onAction, variant = "dark" }) => {
  return (
    <DropdownMenuContent
      align="end"
      sideOffset={-5}
      className={`animate-in fade-in slide-in-from-top-1 ${
        variant === "dark" ? "bg-[#DDDDDD]" : "bg-custom-gray-light-200"
      }`}
    >
      {items.map((item, index) => (
        <DropdownMenuItem
          key={index}
          className="px-4 py-2 text-sm cursor-pointer font-medium text-center w-full justify-center hover:text-white text-black"
          onClick={() => onAction(item.value)}
        >
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
