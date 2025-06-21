import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import usePageTitle from "@/hooks/usePageTitle";
import { useGlobalContext } from "@/context/GlobalContext";
import { assessmentSections } from "@/constants";
import { AssessmentQuestion } from "@/components/careerAssessment/AssessmentQuestion";
import { AssessmentResult } from "@/components/careerAssessment/AssessmentResult";
import { AssessmentInitialUi } from "@/components/careerAssessment/AssessmentInitialUi";

export const AssessmentFlowManager = () => {
  usePageTitle("Assessment");
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showSectionComplete, setShowSectionComplete] = useState(false);
  const [responses, setResponses] = useState([]);
  const { setBreadcrumbSuffix } = useGlobalContext();

  const section = assessmentSections[sectionIndex];
  const question = section.questions[questionIndex];

  useEffect(() => {
    setBreadcrumbSuffix("Assessment");
  }, []);

  const handleNext = () => {
    if (questionIndex < section.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setShowSectionComplete(true);
    }
  };

  const handleAnswer = (optionId) => {
    setResponses((prev) => [
      ...prev,
      {
        sectionId: section.sectionId,
        questionId: question.id,
        selectedOptionId: optionId,
      },
    ]);
  };

  const handleNextSection = () => {
    if (sectionIndex < assessmentSections.length - 1) {
      setSectionIndex((prev) => prev + 1);
      setQuestionIndex(0);
      setShowSectionComplete(false);
    } else {
      console.log("All responses:", responses);
      navigate("/user/dashboard/career-assessment/complete"); // Or any final screen
    }
  };

  return (
    <DashboardLayout>
      {/* <div className="px-6 md:px-10 py-7">
        {showSectionComplete ? (
          <SectionCompleteScreen
            title={section.sectionTitle}
            onContinue={handleNextSection}
          />
        ) : (
          <AssessmentQuestion
            sectionTitle={section.sectionTitle}
            question={question}
            onNext={handleNext}
            onAnswer={handleAnswer}
            progress={{
              current: questionIndex + 1,
              total: section.questions.length,
            }}
          />
        )}
      </div> */}
      {/* initial screen */}
      <AssessmentInitialUi />
      {/* question screen */}
      {/* <AssessmentQuestion /> */}
      {/* interactive screen */}
      {/* assessment result screen */}
      {/* <AssessmentResult /> */}
    </DashboardLayout>
  );
};
