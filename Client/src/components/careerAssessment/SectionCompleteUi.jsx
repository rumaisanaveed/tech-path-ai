import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { BreadCrumb } from "./BreadCrumb";

export const SectionCompleteScreen = () => {
  const { setBreadcrumbText } = useGlobalContext();

  useEffect(() => {
    setBreadcrumbText("Career Assessment/Assessment");
  }, []);

  return (
    <div className="h-full flex flex-col grow 3xl:max-w-7xl 3xl:mx-auto justify-between 3xl:items-center 3xl:justify-center px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col gap-3">
        <BreadCrumb />
        <h1 className="text-black text-3xl lg:text-5xl font-bold">
          Section Completed Successfully!
        </h1>
        <p className="text-base lg:text-lg font-normal text-custom-black-light max-w-2xl">
          You've successfully completed a section of career assessment. Click on
          the button below to continue giving the assessment.
        </p>
        <SecondaryButton title="Continue Assessment" />
      </div>
    </div>
  );
};
