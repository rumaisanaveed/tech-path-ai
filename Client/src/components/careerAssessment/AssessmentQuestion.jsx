import React, { useEffect, useState } from "react";
import { AssessmentBreadcrumb } from "./AssessmentBreadcrumb";
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
  saveItemToStorage,
} from "@/utils/helpers/storage/localStorage";
import { useMutation } from "@tanstack/react-query";
import { submitAnswer } from "@/apis/assessment/assessment.api";
import { SubmitAssessmentAnswer } from "@/apis/assessment/assessment.service";
import { toast } from "sonner";

export const AssessmentQuestion = () => {
  // TODO : show the skeleton if question is loading
  // Show some interactive screen on completion of a section
  // Now, save the questions and category of the next section questions
  const { setBreadcrumbSuffix } = useGlobalContext();
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  // on component mount, the value shouldn't be reset to 0
  const [currentIndex, setCurrentIndex] = useState(
    () => getItemFromStorage("currentQuestionIndex") || 0
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState({});
  const { questions } = useAssessmentContext();
  const { mutate: answerSubmission, isPending } = SubmitAssessmentAnswer({
    onSuccess: (res) => {
      console.log("On success", res);
    },
    onError: (error) => {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong! Try again.";
      toast.error(errorMsg);
    },
  });

  useEffect(() => {
    setBreadcrumbSuffix("Assessment");
  }, []);

  // load answers, current question index
  useEffect(() => {
    const savedAnswers = getItemFromStorage("assessmentAnswers") || {};
    setLoadedQuestions(questions);
    setAnswers(savedAnswers);
  }, [questions]);

  const currentQuestion = loadedQuestions[currentIndex];

  // show the already selected options on question change or on refresh
  useEffect(() => {
    if (currentQuestion?.id) {
      const prevAnswer = answers[currentQuestion.id];
      setSelectedOption(prevAnswer.toString() || "");
    }
  }, [currentQuestion?.id]);

  useEffect(() => {
    saveItemToStorage("currentQuestionIndex", currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    // don't move forward until the option is selected
    if (!selectedOption) return;

    // TODO : call the submit answer api on each question

    answerSubmission({ optionId: parseInt(selectedOption) });

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOption,
    };

    setAnswers(newAnswers);
    saveItemToStorage("assessmentAnswers", newAnswers);

    // if the last question
    if (currentIndex < loadedQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    // if not the first question
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const totalQuestionsAnswered = Object.keys(answers).length;

  // TODO : replace with skeleton
  if (!currentQuestion) {
    <p>Loading question</p>;
  }

  return (
    <div className="h-full flex flex-col grow 3xl:max-w-7xl 3xl:mx-auto justify-between 3xl:items-center 3xl:justify-center px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <AssessmentBreadcrumb />
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
        questionNo={totalQuestionsAnswered}
        totalQuestions={questions.length}
      />
    </div>
  );
};
