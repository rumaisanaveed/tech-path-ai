import { AssessmentHistory } from "@/components/careerAssessment/AssessmentHistory";
import { AssessmentInitialUi } from "@/components/careerAssessment/AssessmentInitialUi";
import { AssessmentQuestion } from "@/components/careerAssessment/AssessmentQuestion";
import { AssessmentResult } from "@/components/careerAssessment/AssessmentResult";
import { SectionCompleteScreen } from "@/components/careerAssessment/SectionCompleteUi";
import { useAssessmentContext } from "@/context/AssessmentContext";
import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";

const AssessmentFlowManager = () => {
  usePageTitle("Assessment");
  const { step } = useAssessmentContext();

  return (
    <DashboardLayout>
      {step === "start" && <AssessmentInitialUi />}
      {step === "question" && <AssessmentQuestion />}
      {step === "complete" && <SectionCompleteScreen />}
      {step === "result" && <AssessmentResult />}
      {step === "history" && <AssessmentHistory />}
    </DashboardLayout>
  );
};
export default AssessmentFlowManager;
