import express from "express";
import { isAdmin, verifyToken } from "../../middleware/verifyToken.js";
import { approveBlogController, getAllBlogsController } from "../../controllers/admin/adminController.js";
import { upload } from "../../utils/S3.js";

const router = express.Router();

//blogs approval route

router.get("/all-blogs-admin", verifyToken, isAdmin, getAllBlogsController);
router.patch("/approve-blog/:blogId", verifyToken,isAdmin, approveBlogController);


//Carrer Domain Routes ___ADD MIDDLEWARE ISADMIN__


export default router;
