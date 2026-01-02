import { AddUserLesson, GetAllUserLessons } from "@/apiService/LessonTracking";
import { GetAllQuizes } from "@/apiService/QuizTracking";
import peekImg from "@/assets/mascot/peaking.webp";
import tabletImg from "@/assets/mascot/tablet.webp";
import { CustomLessonProgressBar } from "@/components/CustomLessonProgressBar";
import BuddyLessons from "@/components/skillTracking/buddy/BuddyLessons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ArrowLeft, BookOpen, Eye, Lock, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizModal from "./domainTracker/components/QuizModal";
import ViewLessonModal from "./domainTracker/components/ViewLessonModal";
import { LessonsListSkeleton } from "@/components/skeletons/skillTracking/modules/LessonsListSkeleton";
import { QuizListSkeleton } from "@/components/skeletons/skillTracking/modules/QuizListSkeleton";
import { ModuleCardSkeleton } from "@/components/skeletons/skillTracking/modules/ModulesSkeletons";
import { FullPageError } from "@/components/fullPageError/FullPageError";

const Lessons = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showBuddyWelcome, setShowBuddyWelcome] = useState(true); // show by default if all locked
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const {
    data: lessonsData,
    isLoading: isLoadingLessons,
    isError: isErrorLoadingLessons,
    refetch: refetchLessons,
  } = GetAllUserLessons(moduleId);

  const { data: quizData, isLoading: isLoadingQuizzes } =
    GetAllQuizes(moduleId);

  const { mutate: addLesson } = AddUserLesson(moduleId);

  if (isErrorLoadingLessons || !lessonsData?.success) {
    return (
      <FullPageError
        title="Unable to load lessons"
        subtitle="Something went wrong while fetching the lessons. Please check your internet connection or try again."
        onRetry={refetchLessons}
      />
    );
  }
  console.log("quizData", quizData);

  const quizzes = Object.values(quizData).filter((q) => typeof q === "object");

  const module = lessonsData;
  const allLocked = module.lessons?.every((lesson) => lesson.locked);

  const handleViewLesson = (lesson) => {
    if (lesson.locked) return;
    setSelectedLesson(lesson);
    setIsViewModalOpen(true);
  };

  const handleGetStarted = () => {
    addLesson();
    setShowBuddyWelcome(false);
  };

  return (
    <DashboardLayout>
      {/* Buddy Welcome Modal */}
      {allLocked && showBuddyWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full text-center relative">
            <img src={tabletImg} alt="Lumo" className="w-20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Hey, welcome to the module!
            </h2>
            <p className="text-gray-700 font-medium mb-2">{module.title}</p>
            <p className="text-gray-600 mb-4">
              There are {module.lessons.length} lessons in this module. You need
              to complete all of them to achieve full XP. It also has{" "}
              {module.quizzes?.length || 0} quizzes that unlock based on your
              lesson progress.
            </p>
            <Button onClick={handleGetStarted} size="lg">
              Get Started
            </Button>
          </div>
        </div>
      )}

      <BuddyLessons />

      <div className="p-6 space-y-6">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back to Modules
          </Button>
        </div>

        {/* Module Header */}
        {isLoadingLessons ? (
          <ModuleCardSkeleton />
        ) : (
          <Card className="rounded-2xl border border-gray-100 shadow-md bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    {module.title}
                  </h1>
                  <p className="text-sm text-gray-600 max-w-2xl">
                    {module.description}
                  </p>
                </div>
                <Badge className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
                  {module.badge || "Module"}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  <span>{module.totalXP ?? 0} XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={14} className="text-blue-500" />
                  <span>
                    {module.lessons?.filter(
                      (lesson) => lesson.status === "completed"
                    ).length || 0}{" "}
                    / {module.lessons?.length || 0}{" "}
                    {module.lessons?.length === 1 ? "Lesson" : "Lessons"}{" "}
                    Completed
                  </span>
                </div>
              </div>

              <CustomLessonProgressBar
                xpearned={module.moduleProgress || 0}
                totalXP={module.totalXP || 0}
              />
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Lessons</h2>
          {/* Quiz List */}
          {isLoadingQuizzes ? (
            <QuizListSkeleton />
          ) : (
            <div className="flex gap-3">
              {quizzes.map((quiz) => (
                <Button
                  key={quiz.id}
                  variant="outline"
                  size="sm"
                  disabled={quiz.locked}
                  className={`${
                    quiz.locked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    if (!quiz.locked) {
                      setSelectedQuiz(quiz);
                      setIsQuizModalOpen(true);
                    }
                  }}
                >
                  {quiz.quizTitle}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Lessons List */}
        {isLoadingLessons ? (
          <LessonsListSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {module.lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`rounded-xl border border-gray-100 shadow-sm transition relative ${
                  lesson.locked
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-md"
                }`}
              >
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="flex justify-between text-xs text-gray-700 mb-3">
                    <span className="font-medium">Status: {lesson.status}</span>
                    <span className="font-medium">Seq: {lesson.sequence}</span>
                  </div>

                  {lesson.locked ? (
                    <div className="relative group select-none flex flex-col items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <img
                            src={peekImg}
                            alt="Peek"
                            className="absolute -top-14 left-1/2 -translate-x-1/2 w-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[50] pointer-events-auto"
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="z-[60] text-center"
                        >
                          Complete previous lesson
                        </TooltipContent>
                      </Tooltip>

                      <div className="flex items-center justify-center gap-1 text-gray-600 font-medium text-sm">
                        <Lock size={14} /> Locked
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-1"
                      onClick={() => handleViewLesson(lesson)}
                    >
                      <Eye size={14} /> View Lesson
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* View Lesson Modal */}
      <ViewLessonModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        lesson={selectedLesson}
      />
      {/* Quiz Modal */}
      <QuizModal
        open={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        quiz={selectedQuiz}
      />
    </DashboardLayout>
  );
};

export default Lessons;
