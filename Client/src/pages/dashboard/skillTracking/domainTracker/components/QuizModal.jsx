import { StartQuiz } from "@/apiService/QuizTracking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// TODO
const QuizModal = ({ open, onClose, quiz }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [preparing, setPreparing] = useState(true);

  const { data, isLoading } = StartQuiz(quiz?.id, {
    enabled: !!quiz,
  });

  // Parse quiz question string into array of question objects
  useEffect(() => {
    if (data?.question) {
      const rawQuestions = data.question.split(/\n(?=Question \d+:)/g);
      const parsed = rawQuestions.map((q) => {
        const [questionLine, ...options] = q.split("\n").filter(Boolean);
        return {
          text: questionLine.replace(/^Question \d+:\s*/, ""),
          options: options.map((opt) => opt.trim()),
        };
      });
      console.log("Parsed Questions:", parsed);
      setQuestions(parsed);
      setPreparing(false);
    }
  }, [data]);

  if (!quiz) return null;

  if (isLoading || preparing)
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md flex flex-col items-center justify-center py-16">
          <Loader2 className="animate-spin w-12 h-12 text-[#59A4C0] mb-4" />
          <p className="text-gray-700 text-center">Preparing your quiz...</p>
        </DialogContent>
      </Dialog>
    );

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (option) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed
      questions.forEach((q, i) => {
        // console.log(`Q${i + 1}: ${q.text}`);
        // console.log(`Selected Answer: ${userAnswers[i] || "No answer"}`);
      });
      alert("Quiz completed! Check console for results.");
      onClose();
    }
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {quiz.quizTitle}
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-3" />

        {currentQuestion && (
          <div className="space-y-6 overflow-y-auto flex-1 pr-2">
            {/* Question Progress Bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentIndex + 1}/{questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-[#FFD272] rounded-full h-3 overflow-hidden">
              <div
                className="h-3 transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: "#59A4C0",
                }}
              />
            </div>

            {/* Question */}
            <p className="text-gray-800 font-medium mt-4 break-words whitespace-pre-wrap">
              {currentQuestion.text}
            </p>

            {/* Options */}
            <div className="grid gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant={
                    userAnswers[currentIndex] === opt ? "default" : "outline"
                  }
                  className="w-full text-left break-words whitespace-pre-wrap"
                  onClick={() => handleSelectAnswer(opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-2 mt-4">
              {currentIndex > 0 && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                  Previous
                </Button>
              )}
              <Button className="flex-1" onClick={handleNext}>
                {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              className="w-full mt-2 text-gray-700"
              onClick={onClose}
            >
              Close Quiz
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
