import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect } from "react";
import { AssessmentSectionHeading } from "./AssessmentSectionHeading";
import { Star } from "lucide-react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";
import { careers, traits } from "@/constants";
import { BreadCrumb } from "./BreadCrumb";
import { OrangeProgressBar } from "../OrangeProgressBar";

export const AssessmentResult = () => {
  const navigate = useNavigate();
  const { setBreadcrumbText } = useGlobalContext();

  useEffect(() => {
    setBreadcrumbText("Career Assessment/Result");
  }, []);

  const handleNavigateToCareers = () => {
    navigate("/careers");
  };

  return (
    <div className="h-full px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col 3xl:items-center 3xl:justify-center gap-4 md:gap-6">
        <div className="text-left flex flex-col gap-3">
          <BreadCrumb />
          <h1 className="text-black text-3xl lg:text-5xl font-bold max-w-3xl">
            You’ve completed the Career Assessment!
          </h1>
          <p className="text-black font-medium text-xl md:text-2xl max-w-4xl">
            Based on your interests, personality, and goals, we’ll suggest top
            career paths tailored for you.
          </p>
        </div>

        {/* Main Result Card */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 xl:gap-20 2xl:gap-24 3xl:gap-28 border border-transparent lg:border-none 3xl:w-[900px]">
          {/* Left: Traits */}
          <div className="lg:w-2/5 sm:w-1/2 w-full flex flex-col gap-3">
            <h3 className="text-xl font-medium">Your Traits</h3>
            {traits.map((trait, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="text-sm font-normal text-black">{trait.name}</p>
                <OrangeProgressBar value={trait.value} />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[2px] bg-gray-300 h-[230px]" />

          {/* Right: Careers */}
          <div className="flex flex-col flex-1 gap-3 3xl:w-full">
            <h3 className="text-xl font-medium">Recommended Careers</h3>
            <div className="flex flex-col gap-2">
              {careers.map((career, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Star size={18} />
                  <p>{career}</p>
                </div>
              ))}
            </div>
            <SecondaryButton
              title="View Detailed Results"
              className="md:mt-4 mt-2 text-black bg-custom-orange-dark font-normal text-sm"
              onClickHandler={handleNavigateToCareers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
