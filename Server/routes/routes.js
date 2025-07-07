import express from "express";

import authRoutes from "./authRoute.js";
import blogsRoutes from "./blogsRoutes.js";
import assessmentsRoutes from "./assessmentsRoute.js";
import adminRoutes from "./admin/adminRoute.js";
import careerDomainRoutes from "./careerDomainRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes)
router.use("/blogs", blogsRoutes)
router.use("/assessments", assessmentsRoutes)
router.use("/careerdomain/skill", careerDomainRoutes)


router.use("/admin", adminRoutes)

export default router;