import { useMutation, useQuery } from "@tanstack/react-query";
import * as AssessmentAPI from "./assessment.api";
import { saveItemToStorage } from "@/utils/helpers/storage/localStorage";
import { useAssessmentContext } from "@/context/AssessmentContext";
import { toast } from "sonner";

export const StartSession = () => {
  return useMutation({
    mutationFn: AssessmentAPI.startSession,
  });
};

export const GenerateQuestionsByCategory = () => {
  return useMutation({
    mutationFn: ({ sessionId, categoryId }) =>
      AssessmentAPI.postSessionByCategory(sessionId, categoryId),
    onSuccess: (data) => {
      console.log("✅ Questions posted successfully:", data.questions);
    },
  });
};

export const GetQuestionsByCategory = ({ sessionId, categoryId }) => {
  const { setQuestions } = useAssessmentContext();

  return useQuery({
    queryKey: ["questions", sessionId, categoryId],
    queryFn: () => AssessmentAPI.getQuestionsByCategory(sessionId, categoryId),
    enabled: !!sessionId && !!categoryId,
    onSuccess: (data) => {
      saveItemToStorage(`questions`, data.questions);
      setQuestions(categoryId, data.questions);
      console.log("✅ Stored questions for category:", categoryId);
      console.log("Questions:", data.questions);
    },
  });
};

export const SubmitAnswer = () => {
  return useMutation({
    mutationFn: ({ sessionId, questionId, optionId }) =>
      AssessmentAPI.submitAnswerByCategory(sessionId, {
        questionId,
        optionId,
      }),
    onSuccess: (data) => {
      console.log("✅ Answer submitted:", data);
      toast.success("Answer submitted successfully");
    },
  });
};

export const PostResults = () => {
  return useMutation({
    mutationFn: (sessionId) => AssessmentAPI.postResults(sessionId),
    onSuccess: (data) => {
      console.log("✅ Results posted", data);
    },
  });
};

export const GetFinalResults = (sessionId) => {
  return useQuery({
    queryKey: ["results", sessionId],
    queryFn: () => AssessmentAPI.getResults(sessionId),
    enabled: !!sessionId,
    onSuccess: (data) => {
      console.log("✅ Final results:", data);
    },
  });
};
