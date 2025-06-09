import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// black button

export const PrimaryButton = ({ title = "", className = "" }) => {
  return (
    <Button className={cn("rounded-full py-6", className)}>{title}</Button>
  );
};
