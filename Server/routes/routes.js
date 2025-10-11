import express from "express";

import authRoutes from "./authRoute.js";
import blogsRoutes from "./blogsRoutes.js";
import assessmentsRoutes from "./assessmentsRoute.js";
import careerDomainRoutes from "./careerDomainRoutes.js";
import domainProgressRoutes from "./domainProgressRoutes.js";
import lessonRoutes from "./lessonRoutes.js";


const router = express.Router();

router.use("/auth", authRoutes)
router.use("/blogs", blogsRoutes)
router.use("/assessments", assessmentsRoutes)

router.use("/careerdomain", careerDomainRoutes)
router.use("/enrollment", domainProgressRoutes)
router.use("/lessons", lessonRoutes)

export default router;