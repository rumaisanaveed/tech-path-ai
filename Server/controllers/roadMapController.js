import {
  errorResponse,
  successResponse,
} from "../utils/handlers/reponseHandler.js";
import { GetAllRoadmapsService,GetDashboardService,GetSingleRoadMapService } from "./roadMapService.js";

export const getAllRoadmapsController = async (req, res) => {
  try {
    const roadmaps  = await GetAllRoadmapsService();
    successResponse(res, {roadmaps }, "Roadmaps fetched successfully");
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    errorResponse(res, error, "Failed to fetch roadmaps");
  }
};


export const getDashboardController = async (req, res) => {
   const userId = req.userId;
  try {
    const dashboardData = await GetDashboardService(userId)
    successResponse(res, { dashboardData }, "Dashboard data fetched successfully");
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    errorResponse(res, error, "Failed to fetch dashboard data");
  }
}

export const getSingleRoadMapController = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    if (!roadmapId) {
      return errorResponse(res, "Roadmap ID is required", "Bad Request", 400);
    }

    const data = await GetSingleRoadMapService(roadmapId);

    return successResponse(
      res,
      data,
      "Roadmap fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return errorResponse(res, error.message, "Failed to fetch roadmap");
  }
};
