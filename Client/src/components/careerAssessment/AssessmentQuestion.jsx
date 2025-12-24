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
import {
  getQuestionsByCategory,
  postResults,
} from "@/apis/assessment/assessment.api";

// TODO : add results view option even when the user is giving quiz
export const AssessmentQuestion = () => {
  const { setBreadcrumbText } = useGlobalContext();
  const {
    questions,
    setQuestions,
    categoryNo,
    setStep,
    sessionId,
    setCategoryNo,
    categoryName,
    setCategoryName,
  } = useAssessmentContext();

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

  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    setBreadcrumbText("Career Assessment/Assessment");
    setLoadedQuestions(questions.questions || []);

    // Set categoryName if available
    if (questions.categoryName) {
      setCategoryName(questions.categoryName);
      saveItemToStorage("category", questions.categoryName);
    }
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

  const handleNext = async () => {
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
      // Category done
      const nextCategory = categoryNo + 1;

      if (nextCategory <= 3) {
        const nextQuestions = await getQuestionsByCategory(
          sessionId,
          nextCategory
        );
        setQuestions(nextQuestions);
        setCategoryNo(nextCategory);
        setCurrentIndex(0);

        saveItemToStorage("questions", nextQuestions);
        saveItemToStorage("categoryNo", nextCategory);
        saveItemToStorage("currentQuestionIndex", 0);
        saveItemToStorage("step", "question");

        setStep("question");
      } else {
        try {
          setIsPredicting(true);
          await postResults(sessionId);
          setStep("result");
          saveItemToStorage("step", "result");

          removeItemFromStorage("assessmentAnswers");
          removeItemFromStorage("questions");
          removeItemFromStorage("currentQuestionIndex");
          removeItemFromStorage("categoryNo");
        } catch (err) {
          console.error("❌ Failed to post results:", err);
          return;
        } finally {
          setIsPredicting(false);
        }
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  if (!currentQuestion) return <p>Loading questions...</p>;

  // show skeleton
  if (isPredicting) {
    return (
      <div className="h-full flex items-center justify-center px-6 md:px-10 py-4 md:py-7">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold text-black">
            Analyzing your responses...
          </p>
          <p className="text-gray-600">
            Please wait while we predict your career path.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col grow 3xl:max-w-7xl 3xl:mx-auto justify-between 3xl:items-center 3xl:justify-center px-6 md:px-10 py-4 md:py-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <BreadCrumb />
          <AssessmentSectionHeading />
          <p className="text-xl md:text-3xl font-medium max-w-2xl">
            {currentQuestion?.text}
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
        questionNo={currentIndex}
        totalQuestions={loadedQuestions.length}
      />
    </div>
  );
};
