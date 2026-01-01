import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";
import {
  addCareerController,
  getAllCareersController,
  getCareerByIdController,
  updateCareerController,
  deleteCareerController,
} from "../../../controllers/admin/careerExplorer/careerExplorerController.js";
import { upload } from "../../../utils/S3.js";

const router = express.Router();

// Create a new career (with optional image upload)
router.post(
  "/add-career",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  addCareerController
);

// Get all careers (with filtering, pagination, search)
router.get("/all-careers", verifyToken, isAdmin, getAllCareersController);

// Get a single career by ID
router.get("/career/:careerId", verifyToken, isAdmin, getCareerByIdController);

// Update a career (with optional image upload)
router.put(
  "/update-career/:careerId",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  updateCareerController
);

// Delete a career
router.delete(
  "/delete-career/:careerId",
  verifyToken,
  isAdmin,
  deleteCareerController
);

export default router;