import express from "express";

import domainRoutes from "./skillTracking/domainRoute.js";
import moduleRoutes from "./skillTracking/moduleRoutes.js";
import lessonRoutes from "./skillTracking/lessonRoutes.js";

import blogRoutes from "./blogs/blogsRoute.js";
import eventRoutes from "./events/eventRoutes.js";
import careerExplorerRoutes from "./careerExplorer/careerExplorerRoute.js";

const router = express.Router();

//SkillTracking || DOMAIN
router.use("/skill-tracking", domainRoutes);

//ModulesTracking || MODULES
router.use("/skill-modules", moduleRoutes);

// Lesson Routes
router.use("/skill-lessons", lessonRoutes);

//Blogs Routes
router.use("/blogs", blogRoutes)

//Events Routes
router.use("/events", eventRoutes)

//Career Explorer Routes
router.use("/career-explorer", careerExplorerRoutes)

export default router;
