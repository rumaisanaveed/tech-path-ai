
import { Op } from "sequelize";
import { uploadFileToS3, deleteFileFromS3 } from "../../../utils/S3.js";
import slugify from "slugify";
import Career from "../../../models/careerExplorer/careerExplorer.js";

// Utility Functions
const generateSlug = (title, id = null) => {
  const baseSlug = slugify(title, { lower: true, strict: true });
  return id ? `${baseSlug}-${id}` : baseSlug;
};

const generateMetaTitle = (title) => {
  // Keep it under 160 characters for SEO
  return title.length > 160 ? title.substring(0, 157) + '...' : title;
};

const generateMetaDescription = (shortDesc) => {
  // Keep it under 255 characters for SEO
  return shortDesc.length > 255 ? shortDesc.substring(0, 252) + '...' : shortDesc;
};

const generateMetaKeywords = (title) => {
  // Extract meaningful keywords from title
  const words = title
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 3)
    .slice(0, 5);
  return words.join(', ');
};

const sanitizeHtml = (html) => {
  // Basic HTML sanitization - you may want to use a library like DOMPurify for production
  return html.trim();
};

// Service Functions
export const addCareerService = async (careerData) => {
  try {
    const { title, shortDesc, longDesc, imageUrl, status } = careerData;

    // Validation
    if (!title || !shortDesc || !longDesc) {
      throw {
        status: 400,
        message: "Title, short description, and long description are required",
      };
    }

    // Check if title already exists
    const existingCareer = await Career.findOne({
      where: { title: { [Op.like]: title } }
    });

    if (existingCareer) {
      throw {
        status: 409,
        message: "A career with this title already exists",
      };
    }

    // Generate SEO fields
    const metaTitle = generateMetaTitle(title);
    const metaDescription = generateMetaDescription(shortDesc);
    const metaKeywords = generateMetaKeywords(title);
    
    // Create career first to get the ID
    const newCareer = await Career.create({
      title,
      slug: generateSlug(title), // Temporary slug
      metaTitle,
      metaDescription,
      metaKeywords,
      imageUrl: imageUrl || null,
      shortDesc,
      longDesc: sanitizeHtml(longDesc),
      status: status || 'published',
    });

    // Update slug with ID for uniqueness
    const uniqueSlug = generateSlug(title, newCareer.id);
    await newCareer.update({ slug: uniqueSlug });

    return {
      career: newCareer,
      message: "Career added successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const getAllCareersService = async (filters = {}) => {
  try {
    const { status, search, page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC' } = filters;

    const whereClause = {};

    // Filter by status
    if (status && ['draft', 'published'].includes(status)) {
      whereClause.status = status;
    }

    // Search functionality
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { shortDesc: { [Op.like]: `%${search}%` } },
        { metaKeywords: { [Op.like]: `%${search}%` } },
      ];
    }

    // Pagination
    const offset = (page - 1) * limit;

    const { count, rows } = await Career.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order]],
      attributes: {
        exclude: ['longDesc'] // Exclude long description for list view
      }
    });

    return {
      careers: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getCareerByIdService = async (careerId) => {
  try {
    if (!careerId || isNaN(careerId)) {
      throw {
        status: 400,
        message: "Invalid career ID",
      };
    }

    const career = await Career.findByPk(careerId);

    if (!career) {
      throw {
        status: 404,
        message: "Career not found",
      };
    }

    return { career };
  } catch (error) {
    throw error;
  }
};

export const updateCareerService = async (careerId, careerData) => {
  try {
    if (!careerId || isNaN(careerId)) {
      throw {
        status: 400,
        message: "Invalid career ID",
      };
    }

    const career = await Career.findByPk(careerId);

    if (!career) {
      throw {
        status: 404,
        message: "Career not found",
      };
    }

    const { title, shortDesc, longDesc, imageUrl, status, regenerateMeta } = careerData;

    const updateData = {};

    // Update title and regenerate SEO fields if title changed
    if (title && title !== career.title) {
      // Check if new title already exists
      const existingCareer = await Career.findOne({
        where: { 
          title: { [Op.like]: title },
          id: { [Op.ne]: careerId }
        }
      });

      if (existingCareer) {
        throw {
          status: 409,
          message: "A career with this title already exists",
        };
      }

      updateData.title = title;
      updateData.slug = generateSlug(title, careerId);
      updateData.metaTitle = generateMetaTitle(title);
      updateData.metaKeywords = generateMetaKeywords(title);
    }

    // Update short description and regenerate meta description if changed
    if (shortDesc && shortDesc !== career.shortDesc) {
      updateData.shortDesc = shortDesc;
      updateData.metaDescription = generateMetaDescription(shortDesc);
    }

    // Update long description
    if (longDesc) {
      updateData.longDesc = sanitizeHtml(longDesc);
    }

    // Update image URL
    if (imageUrl !== undefined) {
      // If new image is provided and old image exists, delete old image
      if (imageUrl && career.imageUrl && imageUrl !== career.imageUrl) {
        try {
          await deleteFileFromS3(career.imageUrl);
        } catch (err) {
          console.warn("Failed to delete old image from S3:", err.message);
        }
      }
      updateData.imageUrl = imageUrl;
    }

    // Update status
    if (status && ['draft', 'published'].includes(status)) {
      updateData.status = status;
    }

    // Force regenerate meta fields if requested
    if (regenerateMeta) {
      updateData.metaTitle = generateMetaTitle(title || career.title);
      updateData.metaDescription = generateMetaDescription(shortDesc || career.shortDesc);
      updateData.metaKeywords = generateMetaKeywords(title || career.title);
    }

    // Perform update
    await career.update(updateData);

    return {
      career: await Career.findByPk(careerId),
      message: "Career updated successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const deleteCareerService = async (careerId) => {
  try {
    if (!careerId || isNaN(careerId)) {
      throw {
        status: 400,
        message: "Invalid career ID",
      };
    }

    const career = await Career.findByPk(careerId);

    if (!career) {
      throw {
        status: 404,
        message: "Career not found",
      };
    }

    // Delete image from S3 if exists
    if (career.imageUrl) {
      try {
        await deleteFileFromS3(career.imageUrl);
      } catch (err) {
        console.warn("Failed to delete image from S3:", err.message);
        // Continue with deletion even if S3 deletion fails
      }
    }

    await career.destroy();

    return {
      message: "Career deleted successfully",
    };
  } catch (error) {
    throw error;
  }
};