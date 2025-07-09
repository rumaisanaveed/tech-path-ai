import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  startOrGetModuleProgress,
  getLessonsForModule,
  startOrGetLessonProgress,
  submitQuizAnswer,
  getUserModuleProgress,
  getAllModules,
} from "../controllers/moduleProgressController.js";

const router = express.Router();

// All routes require authentication
router.get("/module/all", verifyToken, getAllModules);
router.post("/module/start", verifyToken, startOrGetModuleProgress);
router.get("/module/:moduleId/lessons", verifyToken, getLessonsForModule);
router.post("/lesson/start", verifyToken, startOrGetLessonProgress);
router.post("/quiz/answer", verifyToken, submitQuizAnswer);
router.get("/module/:moduleId/progress", verifyToken, getUserModuleProgress);

export default router;
