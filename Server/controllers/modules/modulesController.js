import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import { EnrollInModule, GetAllUserModules } from "./modulesServices.js";

export const enrollInModule = async (req, res) => {
  try {
    const userId = req.userId;
    const { userResponse } = req.body;
    const { domainId } = req.params;

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
      errorResponse(res, null, "Invalid status value");
    }

    const toggled = await ToggleModule(userId, moduleId, status);
    return successResponse(
      res,
      { toggled },
      "Module status toggled successfully"
    );
  } catch (error) {
    console.log("Error toggling module status:", error);
    errorResponse(res, error, "Failed to toggle module status");
  }
};
