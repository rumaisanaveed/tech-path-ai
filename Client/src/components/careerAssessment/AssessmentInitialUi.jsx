import React, { useEffect } from "react";
import {
  assessmentSectionsNames,
  initialAssessmentFeaturesListData,
} from "@/constants";
import { useGlobalContext } from "@/context/GlobalContext";
import { AssessmentSectionHeading } from "./AssessmentSectionHeading";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { Info } from "lucide-react";
import { StartAssessment } from "@/apis/assessment/assessment.service";
import { BreadCrumb } from "./BreadCrumb";

export const AssessmentInitialUi = () => {
  const { setBreadcrumbText } = useGlobalContext();
  const { mutate: startAssessment } = StartAssessment();

  useEffect(() => {
    setBreadcrumbText("");
  }, []);

  const handleStartAssessment = () => {
    // TODO : show skeleton on start of assessment
    startAssessment({
      category: "critical-thinking",
    });
  };

  return (
    <div className="flex flex-col 3xl:justify-center 3xl:items-center xl:flex-row justify-between items-start gap-8 lg:gap-12 px-6 md:px-10 py-4 md:py-7">
      {/* Left Section */}
      <div className="flex flex-col gap-4 max-w-xl">
        <BreadCrumb />

        <AssessmentSectionHeading heading="Find Your Fit in Tech" />

        <p className="text-base lg:text-lg font-normal text-custom-black-light">
          This short AI-driven assessment helps you understand where you thrive
          best.
        </p>

        {/* Features List */}
        <div className="flex flex-col gap-3 text-custom-black-dark">
          {initialAssessmentFeaturesListData.map((item, index) => (
            <div className="flex gap-3 items-start" key={index}>
              <img src={item.icon} className="w-5 h-5 mt-1" alt="feature" />
              <div>
                <p className="font-bold text-base lg:text-lg">{item.title}</p>
                <p className="text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <SecondaryButton
          className="mt-2"
          title="Begin Assessment"
          onClickHandler={handleStartAssessment}
        />
      </div>

      {/* Right Section - Image Placeholder */}
      <div
        className="rounded-md h-64 w-full flex items-center justify-center xl:h-96 xl:w-[450px] mx-auto xl:mx-0 p-5 md:p-10"
        style={{
          background:
            "linear-gradient(107deg, rgba(243, 179, 78, 0.20) 0%, rgba(255, 210, 114, 0.20) 50%, rgba(89, 164, 192, 0.20) 100%)",
        }}
      >
        <div className="flex gap-2">
          <div className="pt-1">
            <Info color="#252525" size={18} />
          </div>
          <div className="flex flex-col gap-3 text-black font-normal">
            <p className="text-xs md:text-sm">
              This assessment is based on four paradigms, each with 20
              questions. Your answers help us identify your traits and recommend
              careers that best match your profile.
            </p>
            <div className="flex flex-col gap-2">
              {assessmentSectionsNames.map(({ id, name, icon: Icon }) => (
                <div key={id} className="flex items-center gap-2">
                  <Icon color="#252525" size={20} />
                  <p className="text-sm md:text-base">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
