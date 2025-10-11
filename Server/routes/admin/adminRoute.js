import express from "express";

import domainRoutes from "./skillTracking/domainRoute.js";
import moduleRoutes from "./skillTracking/moduleRoutes.js";
import lessonRoutes from "./skillTracking/lessonRoutes.js";

const router = express.Router();

//blogs approval route

// router.get("/all-blogs-admin", verifyToken, isAdmin, getAllBlogsController);
// router.patch("/approve-blog/:blogId", verifyToken,isAdmin, approveBlogController);

// //Carrer Domain Routes ___ADD MIDDLEWARE ISADMIN__
// router.post("/post-module", verifyToken, isAdmin,  postModules);

//SkillTracking || DOMAIN
router.use("/skill-tracking", domainRoutes);

//ModulesTracking || MODULES
router.use("/skill-modules", moduleRoutes);

// Lesson Routes
router.use("/skill-lessons", lessonRoutes);

export default router;
