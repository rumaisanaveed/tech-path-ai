import { Op } from "sequelize";
import { blogs, tag } from "../../models/index.js";

const normalizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags))
    return [...new Set(tags.map((t) => t.trim().toLowerCase()))];
  if (typeof tags === "string")
    return [...new Set(tags.split(",").map((t) => t.trim().toLowerCase()))];
  return [];
};

// Get all blogs for user
export const GetAllBlogsService = async ({
  page = 1,
  limit = 6,
  search = "",
  tagName,
}) => {
  const offset = (page - 1) * limit;

  const whereCondition = {};

  // Free-text search on title / shortDesc
  if (search) {
    whereCondition[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { shortDesc: { [Op.like]: `%${search}%` } },
    ];
  }

  // Build include for tags
  const includeConditions = [
    {
      model: tag,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  ];

  // If a specific tag is selected, filter by it
  if (tagName) {
    includeConditions[0].where = { name: tagName };
  }

  const { rows, count } = await blogs.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    distinct: true, // 🔥 important for count with joins
    order: [["createdAt", "DESC"]],
    attributes: ["id", "title", "coverImage", "createdAt", "slug"],
    include: includeConditions,
  });

  return {
    blogs: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

// Get blog by slug for user
export const GetBlogBySlugService = async (slug) => {
  const blog = await blogs.findOne({
    where: { slug },
    attributes: [
      "id",
      "title",
      "coverImage",
      "shortDesc",
      "longDesc",
      "publishedAt",
      "timeToRead",
    ],
    include: [
      { model: tag, attributes: ["id", "name"], through: { attributes: [] } },
    ],
  });

  if (!blog) throw new Error("Blog not found");

  const blogData = blog.toJSON();
  const tagIds = blogData.tags.map((t) => t.id);

  // Map tags to array of strings
  blogData.tags = blogData.tags.map((t) => t.name);

  // Recommended blogs
  let recommendedBlogs = [];
  if (tagIds.length > 0) {
    const recommended = await blogs.findAll({
      where: { id: { [Op.ne]: blogData.id } },
      include: [
        {
          model: tag,
          attributes: ["name"],
          where: { id: { [Op.in]: tagIds } },
          through: { attributes: [] },
          required: true,
        },
      ],
      limit: 4,
      order: [["createdAt", "DESC"]],
    });

    recommendedBlogs = recommended.map((b) => {
      const obj = b.toJSON();
      return {
        id: obj.id,
        title: obj.title,
        coverImage: obj.coverImage,
        shortDesc: obj.shortDesc,
        timeToRead: obj.timeToRead,
        tags: obj.tags.map((t) => t.name),
      };
    });
  }

  return { blog: blogData, recommendedBlogs };
};
