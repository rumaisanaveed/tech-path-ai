import express from "express";

import authRoutes from "./authRoute.js";
import blogsRoutes from "./blogsRoutes.js";
import assessmentsRoutes from "./assessmentsRoute.js";
import careerDomainRoutes from "./careerDomainRoutes.js";
import domainProgressRoutes from "./domainProgressRoutes.js";
import lessonRoutes from "./lessonRoutes.js";
import quizRoutes from "./quizRoutes.js";
import roadMapRoutes from "./roadMapRoutes.js";
import eventRoutes from "./eventRoutes.js";
import explorerRoutes from "./careerExplorerRoute.js";

import achivevementRoutes from "./achivevementRoutes.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Blogs
 *     description: Public blog endpoints
 *   - name: AdminBlogs
 *     description: Administrative blog management
 */

router.use("/auth", authRoutes);
router.use("/blogs", blogsRoutes);
router.use("/assessments", assessmentsRoutes);

router.use("/careerdomain", careerDomainRoutes);
router.use("/enrollment", domainProgressRoutes);
router.use("/lessons", lessonRoutes);

router.use("/quiz", quizRoutes);

router.use("/roadmaps", roadMapRoutes);

router.use("/events", eventRoutes);

router.use("/career-explorer", explorerRoutes);

router.use("/achivement", achivevementRoutes);

export default router;
