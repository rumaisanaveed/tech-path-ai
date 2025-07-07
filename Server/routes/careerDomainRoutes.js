import express from "express";
import { addUserSkillController, archiveUserSkillController, enrollUserInDomainController, getAllCareerDomainsController, getUnrecommendedDomainSkillsByDomain, getUserDomainSkills } from "../controllers/domainController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


router.get("/get-all-career-domains", verifyToken,getAllCareerDomainsController);

router.post("/enroll-domain/:domainId", verifyToken, enrollUserInDomainController);

router.get("/user-domain/:domainId", verifyToken, getUserDomainSkills);

router.patch("/user/archive/:userSkillId", verifyToken, archiveUserSkillController);
router.post("/user/add", verifyToken, addUserSkillController);

router.get(
  "/unrecommended/:domainId",
  verifyToken,
  getUnrecommendedDomainSkillsByDomain
);



export default router;