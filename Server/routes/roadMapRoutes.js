import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllRoadmapsController, getDashboardController } from "../controllers/roadMapController.js";

const router = express.Router();


router.get("/all", verifyToken, getAllRoadmapsController)

router.get("/dashboard", verifyToken, getDashboardController)


export default router;