import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  enrollCareerDomain,
  getAllCareerDomains,
  getCurrentCareerDomain,
  unenrollCareerDomain,
} from "../controllers/domain/domainController.js";

const router = express.Router();

//@POST || User Enroll in a domain
router.post("/enroll", verifyToken, enrollCareerDomain);

//@GET || Get Current Career Domains
router.get("/current", verifyToken, getCurrentCareerDomain);

//@GET || Get All Career Domains
router.get("/all", verifyToken, getAllCareerDomains);

//@DELETE || User Unenroll from a domain
router.delete("/unenroll/:careerDomainId", verifyToken, unenrollCareerDomain);


export default router;