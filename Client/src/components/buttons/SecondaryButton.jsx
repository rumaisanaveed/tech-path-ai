import { cn } from "@/lib/utils";
import React from "react";

export const SecondaryButton = ({
  className = "",
  title = "",
  onClickHandler,
}) => {
  return (
    <button
      className={cn(
        `bg-custom-orange-light text-white rounded-full px-6 py-3 w-fit`,
        className
      )}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
};
