import React from "react";
import { AssessmentBreadcrumb } from "./AssessmentBreadcrumb";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { AssessmentSectionHeading } from "./AssessmentSectionHeading";
import BackButton from "../buttons/BackButton";
import { CustomProgressBar } from "../CustomProgressBar";
import { PrimaryButton } from "../buttons/PrimaryButton";

export const AssessmentQuestion = () => {
  return (
    <div className="h-full flex flex-col grow 3xl:max-w-7xl 3xl:mx-auto justify-between 3xl:items-center 3xl:justify-center px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <AssessmentBreadcrumb />
          <AssessmentSectionHeading heading="Section 1: Critical Thinking" />
          <p className="text-xl md:text-3xl font-medium max-w-2xl">
            When faced with multiple tasks, how do you decide which one to do
            first?
          </p>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                id={`question-${index}`}
                className="rounded-full h-4 w-4 md:h-6 md:w-6"
              />
              <Label
                htmlFor={`question-${index}`}
                className="text-black font-normal text-base md:text-lg"
              >
                I start with the most urgent task.
              </Label>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <PrimaryButton title="Next" className="w-28 md:w-36" />
          <BackButton className="w-28 md:w-36 py-2.5" />
        </div>
      </div>

      <CustomProgressBar />
    </div>
  );
};
