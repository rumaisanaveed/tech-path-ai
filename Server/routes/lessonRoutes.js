import express from "express";

import {verifyToken } from "../middleware/verifyToken.js";
import { postLessonEnrollment,getAllUserLessons,getDetailsOfLesson } from "../controllers/lessons/lessonController.js";

const router = express.Router();

//@POST || Enroll Lesson for User
router.post("/enroll-lesson", verifyToken, postLessonEnrollment);

router.get("/all-lessons/:moduleId", verifyToken, getAllUserLessons)

router.get("/details/:lessonId", verifyToken, getDetailsOfLesson)


export default router;