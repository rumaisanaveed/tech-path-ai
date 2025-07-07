import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createAssessmentSession,
  currentPredictionResult,
  generateQuestionsByCategory,
  getAssessmentSession,
  pastPredictionResult,
  predictionResult,
  submitAnswer,
} from "../controllers/assessmentQuestionsController.js";

const router = express.Router();

/**
 * @swagger
 * /assessment/session:
 *   post:
 *     summary: Create a new assessment session
 *     security:
 *       - bearerAuth: []
 *     tags: [Assessment]
 *     responses:
 *       201:
 *         description: Session created
 *       401:
 *         description: Unauthorized
 */
router.post("/session", verifyToken, createAssessmentSession);

/**
 * @swagger
 * /assessment/generatequestions/{sessionId}/{categoryId}:
 *   post:
 *     summary: Generate questions by category for a session
 *     security:
 *       - bearerAuth: []
 *     tags: [Assessment]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Questions generated
 *       400:
 *         description: Bad Request or Questions already exist
 */
router.post(
  "/generatequestions/:sessionId/:categoryId",
  verifyToken,
  generateQuestionsByCategory
);

/**
 * @swagger
 * /assessment/session/{sessionId}/{categoryId}:
 *   get:
 *     summary: Get all questions for a session and category
 *     security:
 *       - bearerAuth: []
 *     tags: [Assessment]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Questions retrieved
 *       404:
 *         description: Session or category not found
 */
router.get(
  "/session/:sessionId/:categoryId",
  verifyToken,
  getAssessmentSession
);

/**
 * @swagger
 * /assessment/session/{sessionId}/answer:
 *   post:
 *     summary: Submit answer to a question
 *     security:
 *       - bearerAuth: []
 *     tags: [Assessment]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: integer
 *               optionId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Answer submitted successfully
 *       409:
 *         description: Duplicate answer
 */
router.post("/session/:sessionId/answer", verifyToken, submitAnswer);

/**
 * @swagger
 * /assessment/session/result/{sessionId}:
 *   post:
 *     summary: Predict career based on completed answers
 *     security:
 *       - bearerAuth: []
 *     tags: [Assessment]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prediction result
 *       400:
 *         description: Prediction already completed
 */
router.post("/session/result/:sessionId", verifyToken, predictionResult);

/**
 * @swagger
 * /assessment/result/current-results/{sessionId}:
 *   get:
 *     summary: Get current prediction result by session ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Assessment]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Current prediction retrieved
 *       404:
 *         description: Not found
 */
router.get(
  "/result/current-results/:sessionId",
  verifyToken,
  currentPredictionResult
);

/**
 * @swagger
 * /assessment/result/past-results:
 *   get:
 *     summary: Get all past prediction sessions of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     tags: [Assessment]
 *     responses:
 *       200:
 *         description: List of past predictions
 */
router.get("/result/past-results", verifyToken, pastPredictionResult);

export default router;
