import { useAssessmentContext } from "@/context/AssessmentContext";
import { cn } from "@/lib/utils";
import React from "react";

export const AssessmentSectionHeading = ({ className = "" }) => {
  const { category, section } = useAssessmentContext();
  return (
    <h1 className={cn("text-black text-3xl lg:text-5xl font-bold", className)}>
      {`Section ${section}: ${category}`}
    </h1>
  );
};
