import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import { EnrollInModule, GetAllUserModules, ToggleModule } from "./modulesServices.js";

export const enrollInModule = async (req, res) => {
  try {
    const userId = req.userId;
    const { userResponse } = req.body;
    const  {domainId}  = req.params;

    console.log("EnrollInModule Request Body:", { userId, userResponse, domainId });

    const enrollIntoModules = await EnrollInModule(
      userId,
      userResponse,
      domainId
    );

    return successResponse(
      res,
      { enrollIntoModules },
      "Enrolled in module successfully"
    );
  } catch (error) {
    console.error("Error enrolling in module:", error);
    errorResponse(res, error, "Failed to enroll in module");
  }
};

export const getAllUserModules = async (req, res) => {
  try {
    const userId = req.userId;
    const { domainId } = req.params;
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = 6; // 6 modules per page

    const userModules = await GetAllUserModules(userId, domainId, page, limit);

    return successResponse(
      res,
      { userModules },
      "Fetched all user modules successfully"
    );
  } catch (error) {
    console.log("Error getting all user modules:", error);
    errorResponse(res, error, "Failed to get all user modules");
  }
};

export const toggleModule = async (req, res) => {
  try {
    const userId = req.userId;
    const { moduleId } = req.params;
    const { status } = req.body;

    const validStatuses = ["active", "completed", "pending"];
    if (!validStatuses.includes(status)) {
      return errorResponse(res, null, "Invalid status value", 400);
    }

    const result = await ToggleModule(userId, moduleId, status);

    if (result?.error) {
      return errorResponse(res, null, result.message, result.statusCode);
    }

    return successResponse(
      res,
      result,
      "Module status updated successfully"
    );
  } catch (error) {
    console.log("Error toggling module status:", error);
    return errorResponse(res, error, "Failed to toggle module status", 500);
  }
};

