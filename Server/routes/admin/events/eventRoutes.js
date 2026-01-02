import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";
import { upload } from "../../../utils/S3.js";
import {
  postEventController,
  getEventController,
  updateEventController,
  getEnrolledUsersController,
  updateEventStatusController,
} from "../../../controllers/admin/events/eventControllerAdmin.js";

const router = express.Router();

/**
 * @swagger
 * /admin/events/create-event:
 *   post:
 *     summary: Create a new event
 *     tags: [Admin Events]
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
 *               - eventDate
 *               - registration_type
 *             properties:
 *               title:
 *                 type: string
 *               shortDesc:
 *                 type: string
 *               eventDate:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               venue:
 *                 type: string
 *               registration_type:
 *                 type: string
 *                 enum: [internal, external]
 *               registration_link:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post(
  "/create-event",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  postEventController
);

/**
 * @swagger
 * /admin/events/all-events:
 *   get:
 *     summary: Get all events (Admin)
 *     tags: [Admin Events]
 *     security:
 *       - BearerAuth: []
 */
router.get("/all-events", verifyToken, isAdmin, getEventController);

/**
 * @swagger
 * /admin/events/update-event/{eventId}:
 *   patch:
 *     summary: Update event details
 *     tags: [Admin Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 */
router.patch(
  "/update-event/:eventId",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  updateEventController
);

/**
 * @swagger
 * /admin/events/enrolled-users/{eventId}:
 *   get:
 *     summary: Get enrolled users
 *     tags: [Admin Events]
 *     security:
 *       - BearerAuth: []
 */
router.get(
  "/enrolled-users/:eventId",
  verifyToken,
  isAdmin,
  getEnrolledUsersController
);

/**
 * @swagger
 * /admin/events/update-event-status/{eventId}:
 *   patch:
 *     summary: Update event status
 *     tags: [Admin Events]
 *     security:
 *       - BearerAuth: []
 */
router.patch(
  "/update-event-status/:eventId",
  verifyToken,
  isAdmin,
  updateEventStatusController
);

export default router;
