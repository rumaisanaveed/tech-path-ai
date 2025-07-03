import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createAssessmentSession,
  generateQuestionsByCategory,
  getAssessmentSession,
  submitAnswer,
} from "../controllers/assessmentQuestionsController.js";

const router = express.Router();

router.post("/session", verifyToken, createAssessmentSession);

router.post("/generatequestions/:sessionId/:categoryId", verifyToken, generateQuestionsByCategory)

router.get("/session/:sessionId/:categoryId", verifyToken, getAssessmentSession);

router.post("/session/:sessionId/answer", verifyToken, submitAnswer);

export default router;
