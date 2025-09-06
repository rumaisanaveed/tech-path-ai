import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import { ArrowLeft } from "lucide-react";
import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { useLessonQuizzes, useModuleLessons, useSubmitQuiz } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";



const Lessons = () => {
  usePageTitle("Module Lessons");
  const { setBreadcrumbText } = useGlobalContext();
  const { id: moduleId } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Lessons hook
  const { data: lessonsData, isLoading: lessonsLoading } = useModuleLessons(moduleId);
  console.log("Lessons Data:", lessonsData);
  const lessons = lessonsData?.lessons || [];

  // Quizzes hook (enabled only when a lesson is picked)
  const { data: quizData, refetch: refetchQuizzes } = useLessonQuizzes(
    currentLesson?.id,
    !!currentLesson
  );
  const quizzes = quizData?.quizzes || [];

  // Submit mutation
  const submitQuiz = useSubmitQuiz();

  useEffect(() => {
    setBreadcrumbText(`Skill Tracker/Frontend Development/${moduleId}/Lessons`);
  }, [moduleId, setBreadcrumbText]);

  // Start Quiz
  const handleQuizeStart = async (lesson) => {
    setCurrentLesson(lesson);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setShowModal(true);
    await refetchQuizzes();
  };

  // Submit answer
  const handleSubmitAnswer = async () => {
    if (!selectedOption) {
      toast.warning("Please select an option.");
      return;
    }

    const currentQuiz = quizzes[currentQuizIndex];
    const payload = {
      lessonId: currentLesson.id,
      quizQuestionId: currentQuiz.id,
      selectedOption: parseInt(selectedOption),
    };

    try {
      const res = await submitQuiz.mutateAsync(payload);
      if (res.isCorrect) {
        toast.success(`Correct! You earned ${res.xpAwarded} XP 🎉`);
      } else {
        toast.warning("Oops! Incorrect answer.");
      }
    } catch (error) {
      if (error.response?.data?.message === "Already answered") {
        toast.warning("You've already answered this question.");
      } else {
        toast.error("Failed to submit answer. Please try again.");
      }
      return;
    }

    // Next question or finish
    if (currentQuizIndex === quizzes.length - 1) {
      toast.success("Quiz completed!");
      setShowModal(false);
      setCurrentLesson(null);
      setSelectedOption(null);
      setCurrentQuizIndex(0);
    } else {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-5 md:px-10 pt-5 pb-10 flex flex-col gap-6">
        <BreadCrumb />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="px-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold text-black">
          Lessons in this Module
        </h1>

        {lessonsLoading ? (
          <p>Loading lessons...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-2 border"
              >
                <span className="text-sm text-gray-500">
                  Lesson {lesson.sequence}
                </span>
                <h2 className="text-lg font-semibold text-black">{lesson.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {lesson.description}
                </p>
                <div className="flex items-center justify-between text-xs mt-2 text-gray-600">
                  <span>⏱ {lesson.estimatedTime || "N/A"}</span>
                  <span>⭐ {lesson.xp} XP</span>
                </div>
                <Button className="mt-3 w-full" onClick={() => handleQuizeStart(lesson)}>
                  Start Quiz
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-black">
              Quiz — {currentLesson?.title}
            </DialogTitle>
          </DialogHeader>

          {quizzes.length > 0 ? (
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-base font-medium text-black">
                {quizzes[currentQuizIndex]?.question}
              </p>

              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="flex flex-col gap-3"
              >
                {[1, 2, 3, 4].map((num) => {
                  const optionText = quizzes[currentQuizIndex]?.[`option${num}`];
                  return (
                    <div
                      key={num}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition"
                    >
                      <RadioGroupItem value={num.toString()} id={`option-${num}`} />
                      <Label htmlFor={`option-${num}`} className="text-sm cursor-pointer">
                        {optionText || `Option ${num}`}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              <div className="pt-2">
                <Button className="w-full" onClick={handleSubmitAnswer}>
                  {currentQuizIndex === quizzes.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No quiz available for this lesson.</p>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Lessons;
