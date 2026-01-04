/**
 * @swagger
 * tags:
 *   name: Admin Blogs
 *   description: Admin blog management APIs
 */

import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";
import {
  createBlogController,
  getAllBlogsController,
  getBlogBySlugController,
  getBlogTagsController,
  updateBlogController,
  deleteBlogController
} from "../../../controllers/admin/blogs/blogController.js";
import { upload } from "../../../utils/S3.js";

const router = express.Router();

/**
 * @swagger
 * /admin/blogs/create-blog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Admin Blogs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - shortDesc
 *               - longDesc
 *               - coverImage
 *             properties:
 *               title:
 *                 type: string
 *                 example: How to Become a Frontend Developer
 *               shortDesc:
 *                 type: string
 *                 example: A beginner-friendly guide to frontend development
 *               longDesc:
 *                 type: string
 *                 example: Detailed article content goes here...
 *               timeToRead:
 *                 type: number
 *                 example: 5
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Frontend", "React", "Career"]
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     blogId:
 *                       type: number
 *                       example: 12
 *                     title:
 *                       type: string
 *                       example: How to Become a Frontend Developer
 *                     coverImage:
 *                       type: string
 *                       example: https://s3.amazonaws.com/your-bucket/image.jpg
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */

router.post(
  "/create-blog",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  createBlogController
);

/**
 * @swagger
 * /admin/blogs/all-blogs:
 *   get:
 *     summary: Get all blogs (Admin)
 *     tags: [Admin Blogs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 9
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: react
 *       - in: query
 *         name: tagName
 *         schema:
 *           type: string
 *           example: Frontend
 *     responses:
 *       200:
 *         description: Get all blogs - Admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get all blogs - Admin
 *                 data:
 *                   type: object
 *                   properties:
 *                     blogs:
 *                       type: array
 *                       items:
 *                         type: object
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: number
 *                         limit:
 *                           type: number
 *                         totalPages:
 *                           type: number
 *                         totalRecords:
 *                           type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */

router.get("/all-blogs", verifyToken, isAdmin, getAllBlogsController);

/**
 * @swagger
 * /admin/blogs/single-blog/{slug}:
 *   get:
 *     summary: Get blog by slug (Admin)
 *     tags: [Admin Blogs]
 *     security:
 *       - BearerAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog fetched successfully
 *                 data:
 *                   type: object
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */

router.get("/single-blog/:slug", verifyToken, isAdmin, getBlogBySlugController);

/**
 * @swagger
 * /admin/blogs/blog-tags:
 *   get:
 *     summary: Get all blog tags
 *     tags: [Admin Blogs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blog tags fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog tags fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["React", "Node", "Career"]
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */

router.get("/blog-tags", verifyToken, isAdmin, getBlogTagsController);

/**
 * @swagger
 * /admin/blogs/edit-blog/{slug}:
 *   patch:
 *     summary: Edit blog (Admin)
 *     tags: [Admin Blogs]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: how-to-become-a-frontend-developer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Importance of Data Structures and Algorithms
 *               shortDesc:
 *                 type: string
 *                 example: Why DSA matters for every software engineer
 *               longDesc:
 *                 type: string
 *                 example: "<p>Data structures and algorithms are the backbone...</p>"
 *               timeToRead:
 *                 type: integer
 *                 example: 5
 *               tags:
 *                 type: string
 *                 example: javascript, dsa, programming
 *               coverImage:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: Blog edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     title:
 *                       type: string
 *                       example: The Importance of Data Structures and Algorithms
 *                     coverImage:
 *                       type: string
 *                       example: https://careermentor-fyp.s3.eu-north-1.amazonaws.com/blogs/uuid.jpg
 *
 *       400:
 *         description: Bad request / validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Blog not found
 */

router.patch("/edit-blog/:slug", verifyToken, isAdmin, upload.single("coverImage"), updateBlogController);

/**
 * @swagger
 * /admin/blogs/{id}:
 *   delete:
 *     summary: Delete blog (Admin)
 *     tags: [Admin Blogs]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog deleted successfully
 *                 data:
 *                   type: null
 *
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Blog not found
 */

router.delete("/:id", verifyToken, isAdmin, deleteBlogController);

export default router;
