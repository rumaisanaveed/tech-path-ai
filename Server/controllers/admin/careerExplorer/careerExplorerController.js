import { errorResponse, successResponse } from '../../../utils/handlers/reponseHandler.js';
import {
  addCareerService,
  getAllCareersService,
  getCareerByIdService,
  updateCareerService,
  deleteCareerService
} from '../../admin/careerExplorer/careerExplorerService.js';
import { uploadFileToS3 } from '../../../utils/S3.js';

export const addCareerController = async (req, res) => {
  try {
    const { title, shortDesc, longDesc, status } = req.body;

    // Validation
    if (!title || !shortDesc || !longDesc) {
      return errorResponse(res, {
        status: 400,
        message: "Title, short description, and long description are required"
      });
    }

    // Validate field lengths
    if (title.length > 150) {
      return errorResponse(res, {
        status: 400,
        message: "Title must not exceed 150 characters"
      });
    }

    if (shortDesc.length > 300) {
      return errorResponse(res, {
        status: 400,
        message: "Short description must not exceed 300 characters"
      });
    }

    let imageUrl = null;

    // Handle image upload if present
    if (req.file) {
      try {
        imageUrl = await uploadFileToS3(req.file, 'careers', title);
      } catch (uploadError) {
        return errorResponse(res, {
          status: 500,
          message: "Failed to upload image to S3",
          error: uploadError.message
        });
      }
    }

    // Create career
    const result = await addCareerService({
      title,
      shortDesc,
      longDesc,
      imageUrl,
      status: status || 'published'
    });

    return successResponse(
      res,
      { career: result.career },
      result.message,
      201
    );
  } catch (error) {
    console.error("Error in addCareerController:", error);
    return errorResponse(res, error, "Failed to add career");
  }
};

export const getAllCareersController = async (req, res) => {
  try {
    const { status, search, page, limit, sortBy, order } = req.query;

    const filters = {
      status,
      search,
      page: page || 1,
      limit: limit || 10,
      sortBy: sortBy || 'createdAt',
      order: order || 'DESC'
    };

    // Validate sort field
    const validSortFields = ['id', 'title', 'createdAt', 'updatedAt', 'status'];
    if (filters.sortBy && !validSortFields.includes(filters.sortBy)) {
      return errorResponse(res, {
        status: 400,
        message: "Invalid sort field"
      });
    }

    // Validate order
    if (filters.order && !['ASC', 'DESC'].includes(filters.order.toUpperCase())) {
      return errorResponse(res, {
        status: 400,
        message: "Order must be ASC or DESC"
      });
    }

    const result = await getAllCareersService(filters);

    return successResponse(
      res,
      {
        careers: result.careers,
        pagination: result.pagination
      },
      "Careers fetched successfully"
    );
  } catch (error) {
    console.error("Error in getAllCareersController:", error);
    return errorResponse(res, error, "Failed to fetch careers");
  }
};

export const getCareerByIdController = async (req, res) => {
  try {
    const { careerId } = req.params;

    if (!careerId) {
      return errorResponse(res, {
        status: 400,
        message: "Career ID is required"
      });
    }

    const result = await getCareerByIdService(careerId);

    return successResponse(
      res,
      { career: result.career },
      "Career fetched successfully"
    );
  } catch (error) {
    console.error("Error in getCareerByIdController:", error);
    return errorResponse(res, error, "Failed to fetch career");
  }
};

export const updateCareerController = async (req, res) => {
  try {
    const { careerId } = req.params;
    const { title, shortDesc, longDesc, status, regenerateMeta } = req.body;

    if (!careerId) {
      return errorResponse(res, {
        status: 400,
        message: "Career ID is required"
      });
    }

    // Validate field lengths if provided
    if (title && title.length > 150) {
      return errorResponse(res, {
        status: 400,
        message: "Title must not exceed 150 characters"
      });
    }

    if (shortDesc && shortDesc.length > 300) {
      return errorResponse(res, {
        status: 400,
        message: "Short description must not exceed 300 characters"
      });
    }

    let imageUrl = undefined;

    // Handle image upload if present
    if (req.file) {
      try {
        imageUrl = await uploadFileToS3(req.file, 'careers', title || `career-${careerId}`);
      } catch (uploadError) {
        return errorResponse(res, {
          status: 500,
          message: "Failed to upload image to S3",
          error: uploadError.message
        });
      }
    }

    // Update career
    const result = await updateCareerService(careerId, {
      title,
      shortDesc,
      longDesc,
      imageUrl,
      status,
      regenerateMeta: regenerateMeta === 'true' || regenerateMeta === true
    });

    return successResponse(
      res,
      { career: result.career },
      result.message
    );
  } catch (error) {
    console.error("Error in updateCareerController:", error);
    return errorResponse(res, error, "Failed to update career");
  }
};

export const deleteCareerController = async (req, res) => {
  try {
    const { careerId } = req.params;

    if (!careerId) {
      return errorResponse(res, {
        status: 400,
        message: "Career ID is required"
      });
    }

    const result = await deleteCareerService(careerId);

    return successResponse(
      res,
      {},
      result.message
    );
  } catch (error) {
    console.error("Error in deleteCareerController:", error);
    return errorResponse(res, error, "Failed to delete career");
  }
};