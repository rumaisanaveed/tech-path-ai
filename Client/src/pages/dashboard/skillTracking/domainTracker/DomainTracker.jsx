import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect } from "react";
import { Tracker } from "./components/Tracker";
import { Projects } from "./components/Projects";
import { Certifications } from "./components/Certifications";

// TOOD : make it responsive
export const DomainTracker = () => {
  usePageTitle("Domain Tracker");
  const { setBreadcrumbText } = useGlobalContext();

  // TODO : make it dynamic
  useEffect(() => {
    setBreadcrumbText("Skill Tracker/Frontend Development");
  }, []);

  return (
    <DashboardLayout>
      <div className="px-5 md:px-10 pt-5 pb-10 flex flex-col gap-7">
        <BreadCrumb />
        <Tracker />
        {/* projects */}
        <Projects />
        {/* certifications */}
        <Certifications />
      </div>
    </DashboardLayout>
  );
};
