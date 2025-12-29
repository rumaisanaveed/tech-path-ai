import express from "express";
import { getAllBlogsController,getBlogBySlugController } from "../controllers/blog/blogController.js";

const router = express.Router();

router.get("/all-blogs", getAllBlogsController);

router.get("/single-blog/:slug", getBlogBySlugController);

export default router;
