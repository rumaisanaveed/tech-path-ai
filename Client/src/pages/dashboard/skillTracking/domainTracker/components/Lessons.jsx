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
import {
  useLessonQuizzes,
  useModuleLessons,
  useSubmitQuiz,
} from "@/apis/skillTracking/lessonTracking/lessonTracking.services";
import { format } from "date-fns";

const Lessons = () => {
  usePageTitle("Module Lessons");
  const { setBreadcrumbText } = useGlobalContext();
  const { id: moduleId } = useParams();
  const navigate = useNavigate();

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Lessons hook
  const { data: lessonsData, isLoading: lessonsLoading } =
    useModuleLessons(moduleId);
  console.log("Lessons data:", lessonsData);
  const lessons = lessonsData?.lessons || [];

  // Quizzes hook (enabled only when a lesson is picked for quiz)
  const { data: quizData, refetch: refetchQuizzes } = useLessonQuizzes(
    currentLesson?.id,
    !!currentLesson && showQuizModal
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
    setShowQuizModal(true);
    await refetchQuizzes();
  };

  // View Lesson
  const handleViewLesson = (lesson) => {
    setCurrentLesson(lesson);
    setShowViewModal(true);
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
      setShowQuizModal(false);
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="px-2"
          >
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
            {lessons.map((lesson) => {
              const isDisabled = lesson.isCompleted;
              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col justify-between border h-[260px]"
                >
                  <div>
                    <span className="text-sm text-gray-500">
                      Lesson {lesson.sequence}
                    </span>
                    <h2 className="text-lg font-semibold text-black mt-1">
                      {lesson.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
                      {lesson.description}
                    </p>

                    {/* XP and completion info */}
                    <div className="flex items-center justify-between text-xs mt-2 text-gray-600">
                      <span>⏱ {lesson.estimatedTime || "N/A"}</span>
                      <span>
                        ⭐ {lesson.obtainedXP} / {lesson.xp} XP
                      </span>
                    </div>

                    {lesson.isCompleted && lesson.completedAt && (
                      <div className="text-xs text-green-600 mt-1">
                        Completed on:{" "}
                        {format(new Date(lesson.completedAt), "MMM dd, yyyy")}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleViewLesson(lesson)}
                    >
                      View Lesson
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleQuizeStart(lesson)}
                      disabled={isDisabled}
                    >
                      {isDisabled ? "Completed" : "Start Quiz"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* View Lesson Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-black">
              {currentLesson?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm text-gray-700">
              {currentLesson?.description}
            </p>
            <div className="mt-3 text-sm text-gray-600">
              {currentLesson?.content || "Lesson content will appear here."}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
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
                  const optionText =
                    quizzes[currentQuizIndex]?.[`option${num}`];
                  return (
                    <div
                      key={num}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition"
                    >
                      <RadioGroupItem
                        value={num.toString()}
                        id={`option-${num}`}
                      />
                      <Label
                        htmlFor={`option-${num}`}
                        className="text-sm cursor-pointer"
                      >
                        {optionText || `Option ${num}`}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              <div className="pt-2">
                <Button className="w-full" onClick={handleSubmitAnswer}>
                  {currentQuizIndex === quizzes.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No quiz available for this lesson.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Lessons;
