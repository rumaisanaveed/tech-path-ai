import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  enrollCareerDomain,
  getAllCareerDomains,
  getCurrentCareerDomain,
} from "../controllers/domain/domainController.js";

const router = express.Router();

router.post("/enroll", verifyToken, enrollCareerDomain);

// Get the current career domain for the user
router.get("/current", verifyToken, getCurrentCareerDomain);

router.get("/all", verifyToken, getAllCareerDomains);


export default router;
