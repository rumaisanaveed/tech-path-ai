import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const AppButton = ({
  className = "",
  isPending = false,
  isDisabled = false,
  title = "",
  loadingTitle = "",
  ...props
}) => {
  return (
    <Button
      className={cn(
        "text-white anonymous-font font-medium text-base rounded-full py-3 md:py-6 self-end",
        className
      )}
      disabled={isPending || isDisabled || props.disabled}
      {...props}
    >
      {isPending ? `${loadingTitle}...` : title}
    </Button>
  );
};
