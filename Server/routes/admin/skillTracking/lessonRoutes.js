import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";
import { getModuleAndLessons, getSingleLesson, postLesson } from "../../../controllers/admin/SkillTracking/lesson/lessonController.js";

const router = express.Router();

//@POST || Create Lesson 

router.post("/create-lesson/:moduleId", verifyToken, isAdmin, postLesson)

//@GET || GET ALL LESSON DATA
router.get("/get-module-lesson/:moduleId", verifyToken, isAdmin, getModuleAndLessons)

//@GET || GET SINGLE LESSON DATA
 router.get("/get-single-lesson/:lessonId", verifyToken, isAdmin, getSingleLesson)

export default router;