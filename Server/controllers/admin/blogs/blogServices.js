import { blogs, tag, blog_tag_mapping } from "../../../models/index.js";
import { Op } from "sequelize";
import { uploadFileToS3, deleteFileFromS3 } from "../../../utils/S3.js";

// Utility to calculate reading time
export const calculateTimeToRead = (htmlContent) => {
  if (!htmlContent) return 1;
  const text = htmlContent.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200); // 200 words per minute
};
export const generateUniqueSlug = async (title) => {
  let baseSlug = title.toLowerCase().trim().replace(/\s+/g, "-");
  let slug = baseSlug;

  // Check if slug exists
  let count = 1;
  while (await blogs.findOne({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

export const generateSEO = ({ title, shortDesc }) => {
  return {
    metaTitle: title,
    metaDescription: shortDesc,
    metaKeywords: title.split(" ").join(", "),
  };
};

export const normalizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags))
    return [...new Set(tags.map((t) => t.trim().toLowerCase()))];
  if (typeof tags === "string")
    return [...new Set(tags.split(",").map((t) => t.trim().toLowerCase()))];
  return [];
};

export const createBlogService = async ({
  userId,
  title,
  shortDesc,
  longDesc,
  timeToRead,
  tags,
  file,
}) => {
  const transaction = await blogs.sequelize.transaction();
  let coverImageUrl = null;

  try {
    if (file) coverImageUrl = await uploadFileToS3(file, "blogs", title);

    const normalizedTags = normalizeTags(tags);
    const timeToReadValue = timeToRead || calculateTimeToRead(longDesc);
    const slug = await generateUniqueSlug(title);
    const { metaTitle, metaDescription, metaKeywords } = generateSEO({
      title,
      shortDesc,
    });

    const newBlog = await blogs.create(
      {
        title,
        shortDesc,
        longDesc,
        timeToRead: timeToReadValue,
        coverImage: coverImageUrl,
        user_id: userId,
        slug,
        metaTitle,
        metaDescription,
        metaKeywords,
      },
      { transaction }
    );

    if (normalizedTags.length) {
      const tagInstances = await Promise.all(
        normalizedTags.map(async (name) => {
          const [tagInstance, created] = await tag.findOrCreate({
            where: { name },
            defaults: { usageCount: 1 },
            transaction,
          });
          if (!created)
            await tagInstance.increment("usageCount", { by: 1, transaction });
          return tagInstance;
        })
      );

      await blog_tag_mapping.bulkCreate(
        tagInstances.map((t) => ({ blog_id: newBlog.id, tag_id: t.id })),
        { transaction }
      );
    }

    await transaction.commit();
    return newBlog;
  } catch (error) {
    await transaction.rollback();
    if (coverImageUrl) await deleteFileFromS3(coverImageUrl);
    throw error;
  }
};

export const getAllBlogsService = async ({ page, limit, search, tagName }) => {
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
    attributes: ["id", "title", "coverImage", "createdAt"],
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


export const getBlogBySlugService = async (slug) => {
  const blog = await blogs.findOne({
    where: { slug },
    attributes: [
      "id",
      "title",
      "coverImage",
      "shortDesc",
      "longDesc",
      "slug",
      "metaTitle",
      "metaDescription",
      "metaKeywords",
      "publishedAt",
      "timeToRead",
    ],
    include: [
      {
        model: tag,
        as: "tags",
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  if (!blog) {
    throw new Error("Blog not found");
  }

  const blogData = blog.toJSON();

  // map tags to array of strings
  blogData.tags = blogData.tags.map((t) => t.name);

  return blogData;
};

export const getBlogTagsService = async () => {
  const tags = await tag.findAll({
    where: {
      usageCount: { [Op.gt]: 0 },
    },
    order: [["usageCount", "DESC"]],
    limit: 10,
    attributes: ["id", "name", "usageCount"],
  });

  return tags;
};