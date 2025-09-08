import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getRoadMapByDomain } from "../controllers/roadMapControllers.js";

const router = express.Router();

router.get("/:domainId", verifyToken, getRoadMapByDomain)

export default router;
