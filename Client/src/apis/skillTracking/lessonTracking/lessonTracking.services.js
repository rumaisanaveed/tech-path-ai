import { useQuery, useMutation } from "@tanstack/react-query";
import { getModuleLessons, getLessonQuizzes, submitQuizAnswer } from "./lessonTracking.api";

// Hook: get all lessons of a module
export const useModuleLessons = (moduleId) =>
  useQuery({
    queryKey: ["moduleLessons", moduleId],
    queryFn: () => getModuleLessons(moduleId),
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

// Hook: get quizzes of a lesson
export const useLessonQuizzes = (lessonId, enabled) =>
  useQuery({
    queryKey: ["lessonQuizzes", lessonId],
    queryFn: () => getLessonQuizzes(lessonId),
    enabled: enabled && !!lessonId,
    refetchOnWindowFocus: false,
  });

// Hook: submit quiz answer
export const useSubmitQuiz = () =>
  useMutation({
    mutationFn: submitQuizAnswer,
  });
