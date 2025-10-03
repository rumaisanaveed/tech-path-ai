import express from "express";
import { isAdmin, verifyToken } from "../../middleware/verifyToken.js";
import { approveBlogController, getAllBlogsController } from "../../controllers/admin/adminController.js";
import { upload } from "../../utils/S3.js";
import { postModules } from "../../controllers/admin/SkillTracking/moduleController.js";
import domainRoutes from "./skillTracking/domainRoute.js";

const router = express.Router();

//blogs approval route

// router.get("/all-blogs-admin", verifyToken, isAdmin, getAllBlogsController);
// router.patch("/approve-blog/:blogId", verifyToken,isAdmin, approveBlogController);


// //Carrer Domain Routes ___ADD MIDDLEWARE ISADMIN__
// router.post("/post-module", verifyToken, isAdmin,  postModules);

//SkillTracking || DOMAIN
router.use("/skill-tracking", domainRoutes)




export default router;
