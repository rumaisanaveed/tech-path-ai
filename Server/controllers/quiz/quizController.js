import { getQuestionQuiz } from "../../openai/getQuestionQuiz.js";
import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import {
  PostQuizeSession,
  GetQuizSessions,
  StartQuizSession,
  SubmitQuizAnswer
} from "./quizServices.js";

export const postQuizSession = async (req, res) => {
  const { moduleId } = req.params;
  const userId = req.userId;

  try {
    const quizSession = await PostQuizeSession(userId, moduleId);
    return successResponse(
      res,
      quizSession,
      "Quiz session created successfully"
    );
  } catch (error) {
    console.error("Error in postQuizSession:", error);
    return errorResponse(res, error, "Internal Server Error");
  }
};

export const getQuizSessions = async (req, res) => {
  const { moduleId } = req.params;
  const userId = req.userId;
  try {
    const quizSessions = await GetQuizSessions(userId, moduleId);
    return successResponse(
      res,
      quizSessions,
      "Quiz sessions fetched successfully"
    );
  } catch (error) {
    console.error("Error in getQuizSessions:", error);
    return errorResponse(res, error, "Internal Server Error");
  }
};

export const startQuizSession = async (req, res) => {
  const { quizSessionId } = req.params;
  const userId = req.userId;
  try {
    const lessons = await StartQuizSession(quizSessionId, userId);

    const lessonsPlain = lessons.map((l) => ({ id: l.id, title: l.title }));
    const question = await getQuestionQuiz({ lessons: lessonsPlain });

    return successResponse(
      res,
      { lessons, question },
      "Quiz questions fetched successfully"
    );
  } catch (error) {
    console.error("Error in startQuizSession:", error);
    return errorResponse(res, error, "Internal Server Error");
  }
};

export const submitQuizAnswer = async (req, res) => {
  const { quizSessionId } = req.params;
  const userId = req.userId;
  const { totalQuestions, correctAnswers } = req.body;

  console.log("submitQuizAnswer called with:", {
    quizSessionId,
    userId,
    totalQuestions,
    correctAnswers,
  });

  try {
    const result = await SubmitQuizAnswer({
      quizSessionId,
      userId,
      totalQuestions,
      correctAnswers,
    });

    return successResponse(res, result, "Quiz submitted successfully");
  } catch (error) {
    console.error("Error in submitQuizAnswer:", error.message);
    return errorResponse(res, error, error.message || "Internal Server Error");
  }
};