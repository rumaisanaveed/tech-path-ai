import { cn } from "@/lib/utils";
import React from "react";

export const OutlinedActionButton = ({
  hasIcon = true,
  size = "sm" || "md" || "lg",
  icon,
  title = "",
  className,
  handleClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        "border-[1.7px] border-black rounded-full px-2 py-1 w-full",
        `${
          size === "lg" ? "w-full text-center" : "flex items-center gap-1 w-fit"
        }`,
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {icon && icon}
      <p
        className={`font-medium text-black${
          size === "lg" ? "text-base md:text-lg" : "text-xs md:text-sm"
        }`}
      >
        {title}
      </p>
    </button>
  );
};
