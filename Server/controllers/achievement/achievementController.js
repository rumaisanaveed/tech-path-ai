import { successResponse, errorResponse } from "../../utils/handlers/reponseHandler.js";
import { 
  GetAchievementsServices,
  GetLeaderboardServicesCached, 
} from "./achivementServices.js";

export const getAchievementsController = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { careerDomainId } = req.params;

    const result = await GetAchievementsServices(userId, careerDomainId);

    return successResponse(res, result, "Achievements fetched successfully");
  } catch (error) {
    console.error("Achievements error:", error);

    if (error.message === "Domain not found") {
      return errorResponse(res, error.message, 404);
    }
    if (error.message === "No achievements found for this domain") {
      return errorResponse(res, error.message, 404);
    }

    return errorResponse(res, "Failed to fetch achievements", 500);
  }
};

export const getLeaderboardController = async (req, res) => {
  try {
    const { domainId } = req.params;
    const currentUserId = req.userId; // Get current user ID from auth middleware
    
    // Validate domainId
    if (!domainId || isNaN(parseInt(domainId))) {
      return errorResponse(res, "Invalid domain ID", 400);
    }

    // Use cached version (recommended for production)
    const data = await GetLeaderboardServicesCached(domainId, currentUserId);
    
    // Alternative: Use non-cached version
    // const data = await GetLeaderboardServices(domainId, currentUserId);
    
    return successResponse(res, data, "Leaderboard fetched successfully");
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return errorResponse(res, "Failed to fetch leaderboard", 500);
  }
};
