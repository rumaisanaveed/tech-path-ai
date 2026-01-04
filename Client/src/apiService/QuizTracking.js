import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// export const UnlockQuiz = (moduleId) => {
//   return useQuery({
//     queryKey: ["unlockQuiz", moduleId],
//     queryFn: async (moduleId) => {
//       const url = API_ROUTES.QUIZZES.UNLOCK_QUIZ(moduleId);
//       const res = await axiosReq(API_MODES.POST, url);
//       return res.data;
//     },
//     enabled: !!moduleId,
//     refetchOnWindowFocus: false,
//   });
// };

export const GetAllQuizes = (moduleId) => {
  return useQuery({
    queryKey: ["allQuizzes", moduleId],
    queryFn: async () => {
      const url = API_ROUTES.QUIZZES.GET_ALL_QUIZZES(moduleId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
  });
};

export const StartQuiz = (quizId) => {
  return useQuery({
    queryKey: ["startQuiz", quizId],
    queryFn: async () => {
      const url = API_ROUTES.QUIZZES.START_QUIZ(quizId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!quizId,
    refetchOnWindowFocus: false,
  });
};

export const SubmitQuizAnswers = (moduleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ quizSessionId, totalQuestions, correctAnswers }) => {
      const url = API_ROUTES.QUIZZES.SUBMIT_ANSWERS(quizSessionId);
      const res = await axiosReq(API_MODES.PATCH, url, {
        totalQuestions,
        correctAnswers,
      });
      return res.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Quiz submitted successfully!");
      // 🔥 THIS IS THE KEY
      queryClient.invalidateQueries(["allQuizzes", moduleId]);
      queryClient.invalidateQueries(["allUserLessons", moduleId]);
    },
  });
};