import { cn } from "@/lib/utils";
import React from "react";

export const SecondaryButton = ({
  className = "",
  variant = "light",
  title = "",
  onClickHandler,
}) => {
  return (
    <button
      className={cn(
        "rounded-full w-fit",
        `${
          variant === "light"
            ? "bg-custom-orange-light text-white hover:bg-custom-orange-dark px-6 py-3"
            : "bg-custom-orange-dark text-black px-4 py-2 hover:bg-custom-orange-light"
        }`,
        className
      )}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
};
