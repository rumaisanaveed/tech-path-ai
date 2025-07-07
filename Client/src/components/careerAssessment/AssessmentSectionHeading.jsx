import { useAssessmentContext } from "@/context/AssessmentContext";
import { cn } from "@/lib/utils";
import React from "react";

export const AssessmentSectionHeading = ({ className = "" }) => {
  const { categoryName, categoryNo } = useAssessmentContext();
  return (
    <h1 className={cn("text-black text-3xl lg:text-5xl font-bold", className)}>
      {`Section ${categoryName}: ${categoryNo}`}
    </h1>
  );
};
