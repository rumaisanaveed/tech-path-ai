import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getModuleLessons,
  getLessonQuizzes,
  submitQuizAnswer,
  getAllModuleLessons,
  postLesson,
  getSingleLesson,
  getAllUserLessons,
  deleteSingleLesson,
  getSingleUserLesson,
  updateStatusLesson,
} from "./lessonTracking.api";
import { toast } from "sonner";

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

//--------------User-------------
export const useAllUserLessons = (moduleId) => {
  return useQuery({
    queryKey: ["allUserLessons", moduleId],
    queryFn: () => getAllUserLessons(moduleId),
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetSingleLessonDetails = (lessonId) => {
  return useQuery({
    queryKey: ["singleLessonDetails", lessonId],
    queryFn: () => getSingleUserLesson(lessonId),
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
    staleTime: 0, //1000 * 60 * 5
    cacheTime: 0,
  });
};

export const useUpdateStatusLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, status, sequence }) =>
      updateStatusLesson({ lessonId, status, sequence }),
    onSuccess: (data, lessonId) => {
      // Refetch lesson details after a successful status update
      queryClient.invalidateQueries(["singleLessonDetails", lessonId]);
      toast.success(data.message || "Lesson status updated successfully!");
      console.log("Lesson status updated:", data);
    },
  });
};

//--------------ADMIN-------------

export const useAllModuleLessonAdmin = (moduleId) => {
  return useQuery({
    queryKey: ["allModuleLessons", moduleId],
    queryFn: () => getAllModuleLessons(moduleId),
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, //1000 * 60 * 5
  });
};

export const useAddNewLessonAdmin = (moduleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLesson) => postLesson({ moduleId, ...newLesson }),
    onSuccess: () => {
      // Refetch lessons after a successful addition
      queryClient.invalidateQueries(["allModuleLessons", moduleId]);
    },
    onError: (error) => {
      console.error("Error adding new lesson:", error);
      toast.error(error?.response?.data?.message || "Failed to add new lesson");
    },
  });
};

export const useGetSingleLessonAdmin = (lessonId) => {
  return useQuery({
    queryKey: ["singleLesson", lessonId],
    queryFn: () => getSingleLesson(lessonId),
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
  });
};

export const useDeleteLessonAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId) => deleteSingleLesson(lessonId),
    onSuccess: (data) => {
      // Refetch lessons after a successful deletion
      queryClient.invalidateQueries(["allModuleLessons"]);
      toast.success(data.message || "Lesson deleted successfully!");
    },
  });
};
