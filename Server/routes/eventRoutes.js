import express from "express";
import {
  getAllEventsController,
  getEventDetailsController,
  postEventEnrollmentController,
  cancelEventEnrollmentController,
} from "../controllers/event/eventController.js";
import { checkTokenOptional, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */
router.get("/", getAllEventsController);

/**
 * @swagger
 * /events/details/{id}:
 *   get:
 *     summary: Get event details
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details fetched
 *       404:
 *         description: Event not found
 */
router.get("/details/:id", checkTokenOptional, getEventDetailsController);

/**
 * @swagger
 * /events/enrollment/{eventId}:
 *   post:
 *     summary: Enroll in an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrolled successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/enrollment/:eventId", verifyToken, postEventEnrollmentController);

/**
 * @swagger
 * /events/enrollment/cancel/{eventId}:
 *   patch:
 *     summary: Cancel event enrollment
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment cancelled
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/enrollment/cancel/:eventId",
  verifyToken,
  cancelEventEnrollmentController
);

export default router;
