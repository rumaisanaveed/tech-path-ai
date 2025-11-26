import { Op } from "sequelize";
import { generateLessonProgress } from "../../helper/lessonHelper.js";
import {
  Lesson,
  LessonExample,
  LessonLearningPoint,
  LessonResource,
  Module,
  UserLessonProgress,
  UserModuleMapping,
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

  return insertedProgress;
};

export const GetAllUserLessons = async ({ moduleId, userId }) => {
  // Fetch module with lessons and user progress
  const modulePromise = Module.findByPk(moduleId, {
    attributes: ["id", "title", "description", "totalXp", "badge", "slug"],
    include: [
      {
        model: Lesson,
        as: "lessons",
        attributes: ["id", "title", "description", "sequence", "isMandatory"],
        include: [
          {
            model: UserLessonProgress,
            as: "userProgress",
            where: { userId },
            required: false,
            attributes: ["status", "locked", "xp_earned"],
          },
        ],
        order: [["sequence", "ASC"]],
      },
    ],
    order: [[{ model: Lesson, as: "lessons" }, "sequence", "ASC"]],
  });

  const moduleMappingPromise = UserModuleMapping.findOne({
    where: { userId, moduleId },
    attributes: ["progress", "status"],
  });

  const [module, moduleMapping] = await Promise.all([
    modulePromise,
    moduleMappingPromise,
  ]);

  if (!module) return null;

  const moduleData = module.get({ plain: true });

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
      xpEarned: progress.xp_earned ? parseFloat(progress.xp_earned) : 0,
    };
  });

  // --- Quiz unlock logic ---
  // Define lesson clusters for quizzes
  const quizClusters = [
    { quizId: 1, lessonIndices: [0, 1, 2] }, // Quiz 1 → lessons 1-3
    { quizId: 2, lessonIndices: [3, 4, 5] }, // Quiz 2 → lessons 4-6
    { quizId: 3, lessonIndices: [6, 7, 8, 9] }, // Quiz 3 → lessons 7-10
  ];

  const quizzes = quizClusters.map((cluster) => {
    const unlocked = cluster.lessonIndices.every(
      (i) => lessons[i]?.status === "completed"
    );
    return {
      quizId: cluster.quizId,
      unlocked,
      lessonIds: cluster.lessonIndices
        .map((i) => lessons[i]?.id)
        .filter(Boolean),
    };
  });

  return {
    id: moduleData.id,
    title: moduleData.title,
    description: moduleData.description,
    totalXP: moduleData.totalXp,
    badge: moduleData.badge,
    slug: moduleData.slug,
    moduleProgress: moduleMapping ? parseFloat(moduleMapping.progress) : 0,
    moduleStatus: moduleMapping?.status || "active",
    lessons,
    quizzes, // <<< Added this to the response
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

export const PatchLessonProgress = async (
  userId,
  lessonId,
  status,
  sequence
) => {
  const validStatuses = ["not_started", "in_progress", "completed"];
  if (!validStatuses.includes(status)) return null;

  // --- 1. Fetch lesson progress ---
  const progress = await UserLessonProgress.findOne({
    where: { userId, lessonId },
    attributes: ["id", "xp_earned", "moduleId", "status"],
  });

  if (!progress) return null;

  const previousStatus = progress.status;

  // --- 2. Update lesson status ---
  progress.status = status;
  await progress.save();

  const moduleId = progress.moduleId;

  // --- 3. Update module progress ---

  let unlockMessage = null;

  if (moduleId) {
    const moduleMapping = await UserModuleMapping.findOne({
      where: { userId, moduleId },
    });

    if (moduleMapping) {
      const lessonXp = parseFloat(progress.get("xp_earned") || 0);
      let currentProgress = parseFloat(moduleMapping.progress || 0);

      if (status === "completed" && previousStatus !== "completed") {
        currentProgress += lessonXp;
      } else if (
        previousStatus === "completed" &&
        status !== "completed" &&
        currentProgress > 0
      ) {
        currentProgress -= lessonXp;
        if (currentProgress < 0) currentProgress = 0;
      }

      moduleMapping.progress = currentProgress;
      await moduleMapping.save();
    }

    // --- 4. Batch unlock ---
    if (status === "completed") {
      unlockMessage = await unlockLessons(userId, moduleId);
    }
  }

  return {
  ...progress.get({ plain: true }),
  unlockMessage
};

};

export const unlockLessons = async (userId, moduleId) => {
  // 1. Count completed quizzes
  const completedCount = await UserLessonProgress.count({
    where: { userId, moduleId, status: "completed" },
  });

  // 2. Fetch all lessons sorted by sequence
  const allLessons = await Lesson.findAll({
    where: { moduleId },
    order: [["sequence", "ASC"]],
  });

  // Case 1: Completed 3 lesson → unlock seq 4,5,6
  if (completedCount === 3) {
    const toUnlock = allLessons
      .filter((l) => l.sequence >= 4 && l.sequence <= 6)
      .map((l) => l.id);

    await UserLessonProgress.update(
      { locked: 0 },
      { where: { userId, lessonId: toUnlock } }
    );

    return (
      "🎉 Amazing job! You've successfully completed your first milestone. " +
      "You've now unlocked access to the First quiz. Keep going! 🚀"
    );
  }

  // Case 2: Completed 6 lesson → unlock everything else
  if (completedCount === 6) {
    const toUnlock = allLessons.filter((l) => l.sequence > 6).map((l) => l.id);

    await UserLessonProgress.update(
      { locked: 0 },
      { where: { userId, lessonId: toUnlock } }
    );

     return (
      "🔥 Outstanding progress! You've completed 6 lessons and unlocked all remaining quizzes. "
    );
  }

  return null; // no unlock
};
