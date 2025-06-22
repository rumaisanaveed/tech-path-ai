import { getItemFromStorage } from "@/utils/helpers/storage/localStorage";
import { createContext, useContext, useState } from "react";

const AssessmentContext = createContext();

export const AssessmentContextProvider = ({ children }) => {
  // save step, category and questions in the local storage
  const [step, setStep] = useState(() => getItemFromStorage("step") || "start");
  const [questions, setQuestions] = useState(
    () => getItemFromStorage("questions") || []
  );
  const [category, setCategory] = useState(
    () => getItemFromStorage("category") || "Critical thinking"
  );
  const [section, setSection] = useState(
    () => getItemFromStorage("section") || 1
  );

  return (
    <AssessmentContext.Provider
      value={{
        step,
        setStep,
        questions,
        setQuestions,
        category,
        setCategory,
        section,
        setSection,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessmentContext = () => useContext(AssessmentContext);
