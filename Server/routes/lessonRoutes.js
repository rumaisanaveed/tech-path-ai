import express from "express";

import {verifyToken } from "../middleware/verifyToken.js";
import { postLessonEnrollment,getAllUserLessons,getDetailsOfLesson,patchLessonProgress, getModuleProjects } from "../controllers/lessons/lessonController.js";

const router = express.Router();

//@POST || Enroll Lesson for User
router.post("/enroll-lesson/:moduleId", verifyToken, postLessonEnrollment);

router.get("/all-lessons/:moduleId", verifyToken, getAllUserLessons)

router.get("/details/:lessonId", verifyToken, getDetailsOfLesson)

//@PATCH || Update Lesson Progress
router.patch("/update-progress/:lessonId", verifyToken, patchLessonProgress)

router.get("/module-project/:moduleId", verifyToken, getModuleProjects)


export default router;