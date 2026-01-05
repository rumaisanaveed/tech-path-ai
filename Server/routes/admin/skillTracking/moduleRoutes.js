import express from "express";
import { isAdmin, verifyToken } from "../../../middleware/verifyToken.js";

import {
  createModule,
  deleteModule,
  getAllModules,
  createModuleProject
} from "../../../controllers/admin/SkillTracking/module/moduleController.js";

const router = express.Router();

//@POST || Creting a new module
router.post("/create-module/:domainId", verifyToken, isAdmin, createModule);

//@GET || GET ALL MODULES DATA
router.get("/all-modules/:domainId", verifyToken, isAdmin, getAllModules);

//@DELETE || DELETE A MODULE
router.delete(
  "/delete-module/:moduleId/:domainId",
  verifyToken,
  isAdmin,
  deleteModule
);

router.post("/create-module-project/:moduleId", verifyToken, isAdmin, createModuleProject);


export default router;
