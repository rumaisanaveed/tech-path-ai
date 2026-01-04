import { StartQuiz, SubmitQuizAnswers } from "@/apiService/QuizTracking";
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

const QuizModal = ({ open, onClose, quiz }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [preparing, setPreparing] = useState(true);
  const [quizSummary, setQuizSummary] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const { data, isLoading } = StartQuiz(quiz?.id, {
    enabled: open && !!quiz?.id && !hasStarted,
  });

  const submitMutation = SubmitQuizAnswers();

  useEffect(() => {
    if (data?.question && Array.isArray(data.question)) {
      const parsed = data.question.map((q) => ({
        text: q.questionText,
        options: Object.entries(q.options).map(([key, value]) => ({
          key,
          text: value,
        })),
        correctAnswer: q.correctAnswer, // key like "A", "B"
      }));
      setQuestions(parsed);
      setPreparing(false);
      setHasStarted(true);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      setQuestions([]);
      setUserAnswers([]);
      setCurrentIndex(0);
      setPreparing(true);
      setQuizSummary(null);
      setHasStarted(false);
    }
  }, [open]);

  if (!quiz) return null;

  if (isLoading || preparing)
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full flex flex-col items-center justify-center py-16">
          <Loader2 className="animate-spin w-12 h-12 text-[#59A4C0] mb-4" />
          <p className="text-gray-700 text-center">Preparing your quiz...</p>
        </DialogContent>
      </Dialog>
    );

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (optionKey) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = optionKey;
    setUserAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed
      let correctCount = 0;
      questions.forEach((q, i) => {
        if (userAnswers[i] === q.correctAnswer) correctCount++;
      });

      try {
        const result = await submitMutation.mutateAsync({
          quizSessionId: quiz.id,
          totalQuestions: questions.length,
          correctAnswers: correctCount,
        });

        // Show the summary
        setQuizSummary({
          totalQuestions: questions.length,
          correctAnswers: correctCount,
          earnedXP: result.earnedXP,
          progress: result.progress,
        });
      } catch (error) {
        console.error("Error submitting quiz:", error);
        alert("Failed to submit quiz. Try again.");
        onClose();
      }
    }
  };

  if (quizSummary) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full flex flex-col items-center justify-center py-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Quiz Summary
            </DialogTitle>
          </DialogHeader>
          <Separator className="my-4" />

          <p className="text-gray-800 text-center mb-2">
            You answered <strong>{quizSummary.correctAnswers}</strong> out of{" "}
            <strong>{quizSummary.totalQuestions}</strong> questions correctly.
          </p>
          <p className="text-gray-800 text-center mb-2">
            🎯 Earned XP: <strong>{quizSummary.earnedXP}</strong>
          </p>
          <p className="text-gray-800 text-center">
            📈 Module Progress: <strong>{quizSummary.progress}%</strong>
          </p>

          <Button className="mt-6 w-full" onClick={onClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[80vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {quiz.quizTitle}
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-3" />

        {currentQuestion && (
          <div className="flex flex-col space-y-6">
            {/* Progress */}
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
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt) => (
                <Button
                  key={opt.key}
                  variant={
                    userAnswers[currentIndex] === opt.key
                      ? "default"
                      : "outline"
                  }
                  className="w-full text-left break-words whitespace-normal"
                  onClick={() => handleSelectAnswer(opt.key)}
                >
                  {opt.text}
                </Button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-2 mt-4 flex-wrap">
              {currentIndex > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 min-w-[120px]"
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                  Previous
                </Button>
              )}
              <Button className="flex-1 min-w-[120px]" onClick={handleNext}>
                {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            </div>

            {/* Close */}
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
