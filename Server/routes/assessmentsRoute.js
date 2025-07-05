import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createAssessmentSession,
  generateQuestionsByCategory,
  getAssessmentSession,
  predictionResult,
  submitAnswer,
} from "../controllers/assessmentQuestionsController.js";

const router = express.Router();

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Create a new assessment session
 *     tags:
 *       - Assessments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Assessment session created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/session", verifyToken, createAssessmentSession);

/**
 * @swagger
 * /generatequestions/{sessionId}/{categoryId}:
 *   post:
 *     summary: Generate questions by category for a session
 *     tags:
 *       - Assessments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The session ID
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Questions generated successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/generatequestions/:sessionId/:categoryId",
  verifyToken,
  generateQuestionsByCategory
);

/**
 * @swagger
 * /session/{sessionId}/{categoryId}:
 *   get:
 *     summary: Get assessment session questions by category
 *     tags:
 *       - Assessments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The session ID
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Assessment session data
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/session/:sessionId/:categoryId",
  verifyToken,
  getAssessmentSession
);

/**
 * @swagger
 * /session/{sessionId}/answer:
 *   post:
 *     summary: Submit an answer for a session
 *     tags:
 *       - Assessments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/session/:sessionId/answer", verifyToken, submitAnswer);

/**
 * @swagger
 * /session/result/{sessionId}:
 *   post:
 *     summary: Get prediction result for a session
 *     tags:
 *       - Assessments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The session ID
 *     responses:
 *       200:
 *         description: Prediction result returned
 *       401:
 *         description: Unauthorized
 */
router.post("/session/result/:sessionId", verifyToken, predictionResult);

export default router;
