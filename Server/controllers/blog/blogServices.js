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
  limit = 7,
  search = "",
  tags,
}) => {
  const offset = (page - 1) * limit;
  const normalizedTags = normalizeTags(tags);

  const whereCondition = {};
  if (search) {
    whereCondition[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { shortDesc: { [Op.like]: `%${search}%` } },
    ];
  }

  const tagFilter =
    normalizedTags.length > 0 ? { name: { [Op.in]: normalizedTags } } : null;

  const { rows, count } = await blogs.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "title",
      "coverImage",
      "shortDesc",
      "timeToRead",
      "createdAt",
    ],
    include: [
      {
        model: tag,
        attributes: ["name"],
        where: tagFilter,
        through: { attributes: [] },
        required: tagFilter ? true : false,
      },
    ],
    distinct: true,
  });

  // Map tags to array of strings for frontend
  const blogsWithTags = rows.map((b) => {
    const blogObj = b.toJSON();
    blogObj.tags = blogObj.tags.map((t) => t.name);
    return blogObj;
  });

  return {
    blogs: blogsWithTags,
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
      limit: 5,
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
