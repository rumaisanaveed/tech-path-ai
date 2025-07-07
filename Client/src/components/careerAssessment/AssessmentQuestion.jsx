import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { AssessmentSectionHeading } from "./AssessmentSectionHeading";
import BackButton from "../buttons/BackButton";
import { CustomProgressBar } from "../CustomProgressBar";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useAssessmentContext } from "@/context/AssessmentContext";
import {
  getItemFromStorage,
  removeItemFromStorage,
  saveItemToStorage,
} from "@/utils/helpers/storage/localStorage";
import { SubmitAnswer } from "@/apis/assessment/assessment.service";
import { BreadCrumb } from "./BreadCrumb";

export const AssessmentQuestion = () => {
  const { setBreadcrumbText } = useGlobalContext();
  const { questions, setQuestions, categoryNo, setStep, sessionId } =
    useAssessmentContext();

  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    () => getItemFromStorage("currentQuestionIndex") || 0
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState(
    () => getItemFromStorage("assessmentAnswers") || {}
  );
  const { mutate: submitAnswer, isPending } = SubmitAnswer();

  const currentQuestion = loadedQuestions[currentIndex];

  useEffect(() => {
    setBreadcrumbText("Career Assessment/Assessment");
    setLoadedQuestions(questions);
  }, [questions]);

  useEffect(() => {
    if (currentQuestion?.id) {
      const prevAnswer = answers[currentQuestion.id];
      setSelectedOption(prevAnswer?.toString() || "");
    }
  }, [currentQuestion?.id]);

  useEffect(() => {
    saveItemToStorage("currentQuestionIndex", currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    if (!selectedOption) return;

    const questionId = currentQuestion.id;
    submitAnswer({ sessionId, questionId, optionId: parseInt(selectedOption) });

    const updatedAnswers = {
      ...answers,
      [questionId]: selectedOption,
    };

    setAnswers(updatedAnswers);
    saveItemToStorage("assessmentAnswers", updatedAnswers);

    if (currentIndex < loadedQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // All questions in the category answered
      setStep("complete");
      saveItemToStorage("step", "complete");
      removeItemFromStorage("assessmentAnswers");
      removeItemFromStorage("questions");
      removeItemFromStorage("currentQuestionIndex");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  if (!currentQuestion) return <p>Loading questions...</p>;
  // TODO : Make a reusable component for both skill assessment and assessment for handling the questions
  return (
    <div className="h-full flex flex-col grow 3xl:max-w-7xl 3xl:mx-auto justify-between 3xl:items-center 3xl:justify-center px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <BreadCrumb />
          <AssessmentSectionHeading />
          <p className="text-xl md:text-3xl font-medium max-w-2xl">
            {currentQuestion?.questionText}
          </p>
          <RadioGroup
            value={selectedOption}
            onValueChange={(val) => setSelectedOption(val)}
            className="flex flex-col gap-2"
          >
            {currentQuestion?.options?.map((option) => (
              <div key={option.id} className="flex items-center gap-3">
                <RadioGroupItem
                  value={option.id.toString()}
                  id={`option-${option.id}`}
                  className="h-4 w-4 md:h-6 md:w-6 rounded-full"
                />
                <Label
                  htmlFor={`option-${option.id}`}
                  className="text-black font-normal text-base md:text-lg"
                >
                  {option.optionText}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center gap-2">
          <PrimaryButton
            title="Next"
            className="w-28 md:w-36"
            onClickHandler={handleNext}
            // disable until an option is not selected
            disabled={isPending || !selectedOption}
          />
          {currentIndex > 0 && (
            <BackButton
              className="w-28 md:w-36 py-2.5"
              onClickHandler={handlePrev}
            />
          )}
        </div>
      </div>

      <CustomProgressBar
        questionNo={currentIndex + 1}
        totalQuestions={loadedQuestions.length}
      />
    </div>
  );
};
