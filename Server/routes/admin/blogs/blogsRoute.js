import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";
import { createBlogController,getAllBlogsController,getBlogBySlugController,getBlogTagsController } from "../../../controllers/admin/blogs/blogController.js";
import { upload } from "../../../utils/S3.js";

const router = express.Router();

//@POST || Create Blog
router.post(
  "/create-blog",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  createBlogController
);

//@GET || Get All Blogs for Admin
router.get("/all-blogs", verifyToken, isAdmin, getAllBlogsController);

//GET || Get Blog by ID for Admin
router.get("/single-blog/:slug", verifyToken, isAdmin, getBlogBySlugController);

//GET || Get blog tags 
router.get("/blog-tags", verifyToken, isAdmin, getBlogTagsController);


export default router;
