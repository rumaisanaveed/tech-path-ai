import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import {
  GetAllCareerExplorer,
  GetSingleAllCareerExplorer,
} from "./careerExplorerServices.js";

/**
 * Fetch all careers with pagination & search
 */
export const getAllCareerExplorer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const data = await GetAllCareerExplorer({ page, search });

    successResponse(res, data, "Career domains fetched successfully");
  } catch (error) {
    console.error("Error fetching career domains:", error);
    errorResponse(res, "Failed to fetch career domains", 500);
  }
};

/**
 * Fetch single career by ID
 */
export const getSingleAllCareerExplorer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await GetSingleAllCareerExplorer(id);

    if (!career) {
      return errorResponse(res, "Career not found", 404);
    }

    successResponse(res, career, "Career fetched successfully");
  } catch (error) {
    console.error("Error fetching career:", error);
    errorResponse(res, "Failed to fetch career", 500);
  }
};
