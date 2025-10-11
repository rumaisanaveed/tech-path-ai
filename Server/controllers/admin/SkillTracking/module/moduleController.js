// controllers/moduleController.js
import {
  errorResponse,
  successResponse,
} from "../../../../utils/handlers/reponseHandler.js";
import { CreateModule, DeleteModule, GetAllModules } from "./moduleService.js";

export const createModule = async (req, res) => {
  try {
    const { domainId } = req.params;
    const {
      title,
      description,
      badge,
      totalXp,
      typeId,
      sequence,
      isFeatured,
      prerequisiteModuleId,
    } = req.body;

    console.log(req.body);
    console.log("Domain ID:", domainId);

    if (totalXp < 130)
      return errorResponse(
        res,
        "Total XP must be greater than or equal to 130",
        400
      );

    if (!title || !description || !badge || !totalXp || !typeId)
      return errorResponse(res, "All fields are required", 400);

    const module = await CreateModule({
      domainId,
      title,
      description,
      badge,
      totalXp,
      typeId,
      sequence,
      isFeatured,
      prerequisiteModuleId,
      createdBy: req.userId,
    });

    return successResponse(res, module, "Module created successfully", 201);
  } catch (error) {
    console.error("❌ Error creating module:", error);
    return errorResponse(res, error, "Internal Server Error");
  }
};

export const getAllModules = async (req, res) => {
  const { domainId } = req.params;
  const { page = 1, limit = 5 } = req.query; // default 9 modules per page

  try {
    if (!domainId) return errorResponse(res, "Domain ID is required", 400);

    const { modules, totalModules, totalPages, currentPage } =
      await GetAllModules({
        domainId,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      });

    return successResponse(
      res,
      { modules, totalModules, totalPages, currentPage },
      "Modules fetched successfully",
      200
    );
  } catch (error) {
    console.error("❌ Error fetching modules:", error);
    return errorResponse(res, error, "Internal Server Error");
  }
};

export const deleteModule = async (req, res) => {
  const { moduleId, domainId } = req.params;
  try {
    if (!moduleId) return errorResponse(res, "Module ID is required", 400);
    if (!domainId) return errorResponse(res, "Domain ID is required", 400);

    await DeleteModule({ moduleId, domainId });
    return successResponse(res, null, "Module deleted successfully", 200);
  } catch (error) {
    console.error("❌ Error deleting module:", error);
    return errorResponse(res, error, "Internal Server Error");
  }
};
