import { Career } from "../../models/index.js";
import { Op } from "sequelize";

/**
 * Get all careers with pagination and search
 * @param {Object} params - { page, search }
 */
export const GetAllCareerExplorer = async ({ page = 1, search = "" }) => {
  const limit = 9; // 9 careers per page
  const offset = (page - 1) * limit;

  // Fetch careers
  const { rows, count } = await Career.findAndCountAll({
    where: {
      status: "published",
      ...(search && {
        title: { [Op.like]: `%${search}%` }, // case-insensitive search
      }),
    },
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return {
    careers: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
};

/**
 * Get single career by ID
 * @param {number} id
 */
export const GetSingleAllCareerExplorer = async (id) => {
  const career = await Career.findOne({
    where: { id, status: "published" },
  });

  if (!career) return null;

  return career.get({ plain: true }); // ✅ returns only the actual data
};
