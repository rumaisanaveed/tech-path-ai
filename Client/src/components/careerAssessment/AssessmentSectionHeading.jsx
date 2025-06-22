import { useAssessmentContext } from "@/context/AssessmentContext";
import { cn } from "@/lib/utils";
import React from "react";

export const AssessmentSectionHeading = ({ className = "" }) => {
  // TODO : store the category and section id in the local storage
  const { category, section } = useAssessmentContext();
  return (
    <h1 className={cn("text-black text-3xl lg:text-5xl font-bold", className)}>
      {`Section ${section}: ${category}`}
    </h1>
  );
};
