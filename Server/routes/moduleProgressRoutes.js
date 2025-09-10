import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  getAllModules,
  startOrGetModuleProgress,
  getLessonsForModule,
  startOrGetLessonProgress,
  submitQuizAnswer,
  getUserModuleProgress,
  getQuizzesForLesson,
  getUserEnrolledModules,
  getUserEnrolledLessonsForModule,
  getUserQuizzesForLessonWithStatus,
} from "../controllers/modules/modulesController.js";

const router = express.Router();

// All routes require authentication

//@GET || all modules available
router.get("/module/all", verifyToken, getAllModules);

//@POST || start or get module progress
router.post("/module/start", verifyToken, startOrGetModuleProgress);

//@GET || get lessons for a module
router.get("/module/:moduleId/lessons", verifyToken, getLessonsForModule);

// @POST || start or get lesson progress
router.post("/lesson/start", verifyToken, startOrGetLessonProgress);

// @POST || submit or update quiz answer
router.post("/quiz/answer", verifyToken, submitQuizAnswer);

router.get("/module/:moduleId/progress", verifyToken, getUserModuleProgress);
router.get("/lesson/:lessonId/quizzes", verifyToken, getQuizzesForLesson);

// Get all modules a user is currently enrolled in
router.get("/module/enrolled/:domainId", verifyToken, getUserEnrolledModules);

// Get all lessons a user is enrolled in for a given module
router.get(
  "/module/:moduleId/enrolled-lessons",
  verifyToken,
  getUserEnrolledLessonsForModule
);

// Get all quizzes for a lesson, showing which have been attempted and which are pending
router.get(
  "/lesson/:lessonId/user-quizzes",
  verifyToken,
  getUserQuizzesForLessonWithStatus
);

export default router;
