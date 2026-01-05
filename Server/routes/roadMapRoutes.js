import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllRoadmapsController, getDashboardController,getSingleRoadMapController } from "../controllers/roadMapController.js";

const router = express.Router();


router.get("/all", verifyToken, getAllRoadmapsController)

router.get("/dashboard", verifyToken, getDashboardController)


router.get("/:roadmapId", verifyToken, getSingleRoadMapController)

export default router;