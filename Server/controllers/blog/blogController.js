import { errorResponse, successResponse } from "../../utils/handlers/reponseHandler.js";
import { GetAllBlogsService, GetBlogBySlugService } from "./blogServices.js";

export const getAllBlogsController = async (req, res) => {
  try {
    const { page = 1, limit = 7, search = "", tags = "" } = req.query;

    const data = await GetAllBlogsService({
      page: Number(page),
      limit: Number(limit),
      search,
      tags,
    });

    return successResponse(res, data, "Get all blogs");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err.message || "Something went wrong while getting blogs");
  }
};

export const getBlogBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return errorResponse(res, "Blog slug is required");

    const data = await GetBlogBySlugService(slug);
    return successResponse(res, data, "Blog fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err.message || "Something went wrong while fetching blog");
  }
};
