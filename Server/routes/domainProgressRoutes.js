import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { enrollInModule,getAllUserModules,toggleModule } from "../controllers/modules/modulesController.js";

const router = express.Router();

//@POST || User Enroll in a module using gemini
router.post("/module/:domainId", verifyToken, enrollInModule)

//@GET || Get All modules of user 
router.get("/modules/:domainId", verifyToken, getAllUserModules)

//@PATCH || Toggle module progress
router.patch("/module/:moduleId", verifyToken, toggleModule)

export default router;