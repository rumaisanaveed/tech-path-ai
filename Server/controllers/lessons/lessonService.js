import { generateLessonProgress } from "../../helper/lessonHelper.js";
import {
  Lesson,
  LessonExample,
  LessonLearningPoint,
  LessonResource,
  Module,
  UserLessonProgress,
  XpWeight,
} from "../../models/index.js";

export const PostLessonEnrollment = async ({ userId, moduleId }) => {
  // 1️⃣ Check if user already enrolled in this module
  const existingProgress = await UserLessonProgress.findOne({
    where: { userId, moduleId },
  });
  if (existingProgress) {
    throw new Error("User is already enrolled in this module");
  }

  // 2️⃣ Fetch module
  const module = await Module.findByPk(moduleId, {
    attributes: ["id", "totalXP", "xpWeightId"],
  });
  if (!module) throw new Error("Module not found");

  // 3️⃣ Fetch XP weight
  const xpWeight = await XpWeight.findByPk(module.xpWeightId);
  if (!xpWeight) throw new Error("XP Weight not found");

  // 4️⃣ Fetch lessons ordered by sequence
  const lessons = await Lesson.findAll({
    where: { moduleId },
    attributes: ["id", "sequence"],
    order: [["sequence", "ASC"]],
  });
  if (!lessons.length) throw new Error("No lessons found for this module");

  // 5️⃣ Calculate total lesson XP
  const totalLessonXP = module.totalXP * xpWeight.lesson_weight;

  // 6️⃣ Generate lesson progress array
  const lessonProgress = generateLessonProgress(
    userId,
    module.id,
    lessons,
    totalLessonXP
  );

  // 7️⃣ Insert all lesson progress into DB
  const insertedProgress = await UserLessonProgress.bulkCreate(lessonProgress, {
    returning: true,
  });

  // 8️⃣ Optional: Console log for debugging
  insertedProgress.forEach((item, i) => {
    console.log(`Inserted Lesson Progress ${i + 1}:`, item.dataValues);
  });

  return insertedProgress;
};

export const GetAllUserLessons = async ({ moduleId, userId }) => {
  // Fetch module with lessons and user progress in one query
  const module = await Module.findByPk(moduleId, {
    attributes: ["id", "title", "description", "totalXP", "badge", "slug"],
    include: [
      {
        model: Lesson,
        as: "lessons",
        attributes: ["id", "title", "description", "isMandatory", "sequence"],
        include: [
          {
            model: UserLessonProgress,
            as: "userProgress",
            where: { userId },
            required: false, // include lessons even if no progress yet
            attributes: ["status", "locked", "xpEarned"],
          },
        ],
        order: [["sequence", "ASC"]],
      },
    ],
    order: [[{ model: Lesson, as: "lessons" }, "sequence", "ASC"]],
  });

  if (!module) return null;

  const moduleData = module.get({ plain: true });

  // Map lessons and merge progress
  const lessons = moduleData.lessons.map((lesson) => {
    const progress = lesson.userProgress?.[0] || {};
    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      isMandatory: lesson.isMandatory,
      sequence: lesson.sequence,
      status: progress.status || "not_started",
      locked: progress.locked !== undefined ? progress.locked : true,
      xpEarned: progress.xpEarned ? parseFloat(progress.xpEarned) : 0,
    };
  });

  return {
    id: moduleData.id,
    title: moduleData.title,
    description: moduleData.description,
    totalXP: moduleData.totalXP,
    badge: moduleData.badge,
    slug: moduleData.slug,
    lessons,
  };
};

export const GetDetailLesson = async (lessonId, userId) => {
  if (!lessonId || !userId) return null;

  // 1. Fetch lesson
  const lesson = await Lesson.findByPk(lessonId, {
    attributes: [
      "id",
      "title",
      "description",
      "isMandatory",
      "sequence",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: LessonExample,
        as: "examples",
        attributes: ["id", "codeSnippet", "description", "descriptionPoints"],
        order: [["createdAt", "ASC"]],
      },
      {
        model: LessonLearningPoint,
        as: "learningPoints",
        attributes: ["id", "point", "subPoints"],
        order: [["id", "ASC"]],
      },
      {
        model: LessonResource,
        as: "resources",
        attributes: ["id", "type", "url"],
        order: [["id", "ASC"]],
      },
    ],
  });

  if (!lesson) return null;

  const result = lesson.get({ plain: true });

  // 2. Parse JSON fields where needed
  result.learningPoints = result.learningPoints?.map((lp) => ({
    ...lp,
    subPoints:
      typeof lp.subPoints === "string"
        ? JSON.parse(lp.subPoints)
        : lp.subPoints || [],
  }));

  result.examples = result.examples?.map((ex) => ({
    ...ex,
    descriptionPoints:
      typeof ex.descriptionPoints === "string"
        ? JSON.parse(ex.descriptionPoints)
        : ex.descriptionPoints || [],
  }));

  // 3. Fetch user progress for this lesson
  const progress = await UserLessonProgress.findOne({
    where: { userId, lessonId },
    attributes: ["id", "status", "locked", "xpEarned"],
  });

  // 4. If no progress exists → provide default
  result.userProgress = progress
    ? progress.get({ plain: true })
    : {
        id: null,
        status: "not_started",
        locked: false, // or true if you lock based on sequence
        xpEarned: 0,
      };

  return result;
};

export const PatchLessonProgress = async (userId, lessonId, status) => {
  // Validate status
  const validStatuses = ["not_started", "in_progress", "completed"];
  if (!validStatuses.includes(status)) return null;
  // Find existing progress
  const progress = await UserLessonProgress.findOne({
    where: { userId, lessonId },
    attributes: ["id","xp_earned"],
  });
  if (!progress) return null;
  // Update progress
  progress.status = status;
  await progress.save();
  return progress.get({ plain: true });
};
