import express from "express";
import { isAdmin, verifyToken } from "../../middleware/verifyToken.js";
import { approveBlogController, getAllBlogsController } from "../../controllers/admin/adminController.js";
import { addDomainController, createCareerDomain } from "../../controllers/admin/careerDomain/careerDomainController.js";
import { upload } from "../../utils/S3.js";

const router = express.Router();

//blogs approval route

router.get("/all-blogs-admin", verifyToken, isAdmin, getAllBlogsController);
router.patch("/approve-blog/:blogId", verifyToken,isAdmin, approveBlogController);


//Carrer Domain Routes ___ADD MIDDLEWARE ISADMIN__
router.post("/career-domain", verifyToken,  upload.single("coverImage"),createCareerDomain);
router.post("/add-career-domain/:domainId", verifyToken, addDomainController);

export default router;
