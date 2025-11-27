import {
  CareerDomain,
  Lesson,
  UserCareerDomain,
  UserLessonProgress,
  UserModuleMapping,
  Module
} from "../models/index.js";

export const GetAllRoadmapsService = async (req, res) => {
  const data = await CareerDomain.findAll();
  return data;
};

export const GetDashboardService = async (userId) => {
  try {
    if (!userId) return null;

    // ===============================
    // 1. Domains
    // ===============================
    const enrolledDomains = await UserCareerDomain.findAll({
      where: { userId },
      attributes: ["careerDomainId", "enrolledAt"],
    });

    const domainIds = enrolledDomains.map((d) => d.careerDomainId);

    const domains = await CareerDomain.findAll({
      where: { id: domainIds },
      attributes: ["id", "title", "description"],
    });

    const formattedDomains = enrolledDomains.map((d) => {
      const meta = domains.find((item) => item.id === d.careerDomainId);
      return {
        id: d.careerDomainId,
        title: meta?.title || null,
        description: meta?.description || null,
        enrolledAt: d.enrolledAt,
      };
    });

    // ===============================
    // 2. Total Modules
    // ===============================
    const userModules = await UserModuleMapping.findAll({
      where: { userId },
      attributes: ["moduleId", "progress"],
    });

    const totalModules = userModules.length;

    // ===============================
    // 3. Progress Summation
    // ===============================
    const progressRows = userModules;

    const totalProgressRaw = progressRows.reduce(
      (acc, item) => acc + parseFloat(item.progress ?? 0),
      0
    );

    // ===============================
    // 4. Level Calculation
    // ===============================
    let level = 1;
    if (totalProgressRaw >= 100) level = 2;
    if (totalProgressRaw >= 300) level = 3;
    if (totalProgressRaw >= 600) level = 4;
    if (totalProgressRaw >= 1000) level = 5;

    // ===============================
    // 5. Continue Learning Section
    // ===============================

    // Find module with progress > 0
    const startedModule = userModules.find((m) => parseFloat(m.progress) > 0);

    let continueLearning = null;

    if (startedModule) {
      const moduleId = startedModule.moduleId;

      // 5A. Fetch module details
      const moduleMeta = await Module.findOne({
        where: { id: moduleId },
        attributes: ["id", "title", "totalXP"],
      });

      // 5B. Fetch all lessons of the module
      const lessons = await Lesson.findAll({
        where: { moduleId },
        order: [["sequence", "ASC"]],
        attributes: ["id", "title", "sequence"],
      });

      // 5C. Fetch user's lesson progress
      const userLessonProgress = await UserLessonProgress.findAll({
        where: { userId },
        attributes: ["lessonId", "status"],
      });

      // 5D. Determine NEXT lesson
      let nextLesson = null;

      for (const lesson of lessons) {
        const progress = userLessonProgress.find(
          (p) => p.lessonId === lesson.id
        );

        if (!progress || progress.status !== "completed") {
          nextLesson = lesson;
          break;
        }
      }

      continueLearning = {
        moduleId: moduleMeta.id,
        moduleTitle: moduleMeta.title,
        totalXP: moduleMeta.totalXP,
        nextLesson: nextLesson
          ? {
              lessonId: nextLesson.id,
              title: nextLesson.title,
              sequence: nextLesson.sequence,
            }
          : null,
      };
    }

    // ===============================
    // FINAL OUTPUT
    // ===============================

    return {
      domains: formattedDomains,
      totalModules,
      totalProgressRaw,
      level,
      continueLearning, // <— NEW SECTION
    };

  } catch (err) {
    console.error("GetDashboardService Error:", err);
    return null;
  }
};
