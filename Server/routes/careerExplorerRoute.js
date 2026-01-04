import express from "express";
import { checkTokenOptional } from "../middleware/verifyToken.js";
import { getAllCareerExplorer, getSingleAllCareerExplorer } from "../controllers/careerExplorer/careerExplorerController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Career Explorer
 *   description: Public career exploration endpoints
 */

/**
 * @swagger
 * /career-explorer:
 *   get:
 *     summary: Get all published careers
 *     tags: [Career Explorer]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search careers by title
 *     responses:
 *       200:
 *         description: List of published careers with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 careers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       shortDesc:
 *                         type: string
 *                       longDesc:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       status:
 *                         type: string
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Failed to fetch career domains
 */
router.get("/", checkTokenOptional, getAllCareerExplorer);

/**
 * @swagger
 * /career-explorer/single/{id}:
 *   get:
 *     summary: Get single published career by ID
 *     tags: [Career Explorer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Career ID
 *     responses:
 *       200:
 *         description: Career details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 shortDesc:
 *                   type: string
 *                 longDesc:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Career not found
 *       500:
 *         description: Failed to fetch career
 */
router.get("/view-career/:id", checkTokenOptional, getSingleAllCareerExplorer);

export default router;
