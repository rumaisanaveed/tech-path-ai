import { useMutation } from "@tanstack/react-query";
import * as AssessmentAPI from "./assessment.api";
import { saveItemToStorage } from "@/utils/helpers/storage/localStorage";
import { useAssessmentContext } from "@/context/AssessmentContext";

export const StartAssessment = () => {
  const { setStep, setQuestions } = useAssessmentContext();
  return useMutation({
    mutationFn: AssessmentAPI.startAssessment,
    onSuccess: (data) => {
      setStep("question");
      setQuestions(data.questions);
      saveItemToStorage("step", "question");
      saveItemToStorage("sessionId", data.sessionId);
      saveItemToStorage("questions", data.questions);
      console.log("Assessment started", data);
    },
  });
};
