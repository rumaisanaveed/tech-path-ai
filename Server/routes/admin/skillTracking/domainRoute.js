//Admin is going to Crete Update delete and Read all domains from this route "frontend" "backend" etc
import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";
import { createNewDomain, deleteDomain, getAllDomains, getSingleDomain, toggleDomainStatus } from "../../../controllers/admin/SkillTracking/domain/domainController.js";
import { upload } from "../../../utils/S3.js";

const router = express.Router();

//@GET || GET ALL DOMAINS DATA
 router.get("/all-domains", verifyToken, isAdmin, getAllDomains);

//@POST || Creting a new domain
router.post("/create-domain", verifyToken, isAdmin,upload.single("file") ,createNewDomain)

//@PATCH || Toggle Activee/Inactive Domain
router.patch("/toggle-domain/:domainId", verifyToken, isAdmin, toggleDomainStatus);

//@DELETE || Deleting a domain
router.delete("/delete-domain/:domainId", verifyToken, isAdmin, deleteDomain);

//@GET || GET A SINGLE DOMAIN DATA
router.get("/single-domain/:domainId", verifyToken, isAdmin, getSingleDomain);

export default router;