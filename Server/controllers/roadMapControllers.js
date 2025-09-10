import { Module, Lesson, UserLessonProgress, CareerDomain } from "../models/index.js";
import UserCareerDomain from "../models/skilltracking/userCareerDomain.js";
import DomainModuleMapping from "../models/skilltracking/domainModuleMapping.js";

export const getRoadMapByDomain = async (req, res) => {
  try {
    const { domainId } = req.params;
    const userId = req.userId;

    if (!domainId || !userId)
      return res.status(400).json({ message: "Domain ID and User ID are required." });

    console.log(`[Roadmap] Fetching roadmap for domainId=${domainId}, userId=${userId}`);

    // 1. Fetch domain details
    const domain = await CareerDomain.findByPk(domainId, {
      attributes: ["id", "title", "description", "coverImage"],
    });
    if (!domain) return res.status(404).json({ message: "Domain not found." });

    // 2. Check if user is enrolled
    const enrollment = await UserCareerDomain.findOne({
      where: { userId, careerDomainId: domainId },
    });
    const isEnrolled = !!enrollment;

    // 3. Fetch modules via mapping
    const mappings = await DomainModuleMapping.findAll({
      where: { careerDomainId: domainId },
      attributes: ["moduleId"], // only need moduleId
      include: [
        {
          model: Module,
          as: "module",
          attributes: ["id", "title", "description", "sequence", "totalXp"],
          include: [
            {
              model: Lesson,
              attributes: ["id", "title", "description", "sequence", "xp"],
              order: [["sequence", "ASC"]],
            },
          ],
        },
      ],
      order: [[{ model: Module, as: "module" }, "sequence", "ASC"]],
    });

    if (!mappings?.length)
      return res.status(404).json({ message: "No roadmap found for this domain.", domain, isEnrolled });

    // 4. Fetch user lesson progress
    const userProgress = await UserLessonProgress.findAll({
      where: { userId },
      attributes: ["lessonId", "obtainedXP", "isCompleted"],
      raw: true,
    });
    const progressMap = Object.fromEntries(userProgress.map(p => [p.lessonId, p]));

    // 5. Construct roadmap
    const roadmap = mappings.map(mapping => {
      const mod = mapping.module; // module alias from mapping
      const lessons = mod.Lessons.map(lesson => {
        const progress = progressMap[lesson.id] || {};
        return {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          sequence: lesson.sequence,
          xp: lesson.xp,
          obtainedXP: progress.obtainedXP || 0,
          isCompleted: progress.isCompleted || false,
        };
      });

      const totalXP = lessons.reduce((sum, l) => sum + (l.xp || 0), 0);
      const obtainedXP = lessons.reduce((sum, l) => sum + (l.obtainedXP || 0), 0);

      console.log("mod", mod);
      console.log("lessons", lessons);
      console.log("totalXP", totalXP);
      console.log("obtainedXP", obtainedXP);

      return {
        id: mod.id,
        title: mod.title,
        description: mod.description,
        sequence: mod.sequence, // module sequence
        totalXP,
        obtainedXP,
        lessons,
        completionRate: totalXP ? Math.round((obtainedXP / totalXP) * 100) : 0,
      };
    });

    return res.status(200).json({
      message: "Roadmap fetched successfully",
      domain: {
        id: domain.id,
        title: domain.title,
        description: domain.description,
        coverImage: domain.coverImage,
      },
      isEnrolled,
      roadmap,
    });
  } catch (error) {
    console.error("[Roadmap] Error fetching roadmap:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
