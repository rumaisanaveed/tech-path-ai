import express from "express";
import {
  getAllBlogsController,
  getBlogBySlugController,
} from "../controllers/blog/blogController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Public blog endpoints
 */

/**
 * @swagger
 * /blogs/all-blogs:
 *   get:
 *     summary: Get all published blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 9
 *         description: Number of blogs per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: react
 *         description: Search blogs by title or content
 *       - in: query
 *         name: tagName
 *         schema:
 *           type: string
 *           example: Frontend
 *         description: Filter blogs by tag
 *     responses:
 *       200:
 *         description: Blogs fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/all-blogs", getAllBlogsController);

/**
 * @swagger
 * /blogs/single-blog/{slug}:
 *   get:
 *     summary: Get a single blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *           example: how-to-become-a-frontend-developer
 *     responses:
 *       200:
 *         description: Blog fetched successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.get("/single-blog/:slug", getBlogBySlugController);

export default router;
