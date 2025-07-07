import { getItemFromStorage } from "@/utils/helpers/storage/localStorage";
import { createContext, useContext, useState } from "react";

const AssessmentContext = createContext();

export const AssessmentContextProvider = ({ children }) => {
  // save step, category and questions in the local storage
  const [step, setStep] = useState(() => getItemFromStorage("step") || "start");
  const [sessionId, setSessionId] = useState(
    () => getItemFromStorage("sessionId") || ""
  );
  const [questions, setQuestions] = useState(
    () => getItemFromStorage("questions") || []
  );
  const [categoryName, setCategoryName] = useState(
    () => getItemFromStorage("category") || ""
  );
  const [section, setSection] = useState(
    () => getItemFromStorage("section") || 1
  );
  const [categoryNo, setCategoryNo] = useState(1);

  return (
    <AssessmentContext.Provider
      value={{
        step,
        setStep,
        questions,
        setQuestions,
        categoryName,
        setCategoryName,
        sessionId,
        setSessionId,
        section,
        setSection,
        categoryNo,
        setCategoryNo,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessmentContext = () => useContext(AssessmentContext);
