import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import usePageTitle from "@/hooks/usePageTitle";
import { useGlobalContext } from "@/context/GlobalContext";
import { AssessmentQuestion } from "@/components/careerAssessment/AssessmentQuestion";
import { AssessmentResult } from "@/components/careerAssessment/AssessmentResult";
import { AssessmentInitialUi } from "@/components/careerAssessment/AssessmentInitialUi";
import { useAssessmentContext } from "@/context/AssessmentContext";
import { SectionCompleteScreen } from "@/components/careerAssessment/SectionCompleteUi";

export const AssessmentFlowManager = () => {
  usePageTitle("Assessment");
  const { step } = useAssessmentContext();

  return (
    <DashboardLayout>
      {/* {step === "start" && <AssessmentInitialUi />}
      {step === "question" && <AssessmentQuestion />}
      {step === "result" && <AssessmentResult />} */}
      {/* <AssessmentInitialUi /> */}
      <SectionCompleteScreen />
    </DashboardLayout>
  );
};
