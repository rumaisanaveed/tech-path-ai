import Module from "../../models/skilltracking/module.js";
import DomainModuleMapping from "../../models/skilltracking/domainModuleMapping.js";
import UserCareerDomain from "../../models/skilltracking/userCareerDomain.js";
import UserModuleProgress from "../../models/skilltracking/userModuleProgress.js";
import Lesson from "../../models/skilltracking/lesson.js";
import UserLessonProgress from "../../models/skilltracking/userLessonProgress.js";
import QuizQuestion from "../../models/skilltracking/quizQuestion.js";
import UserQuizAnswer from "../../models/skilltracking/userQuizAnswer.js";
import { CareerDomain } from "../../models/index.js";
import { Op } from "sequelize";

export const fetchModules = async (careerDomainId) => {
  if (careerDomainId) {
    return Module.findAll({
      include: [
        {
          model: DomainModuleMapping,
          as: "domainModuleMappings",
          where: { careerDomainId },
        },
      ],
      order: [["sequence", "ASC"]],
    });
  }
  return Module.findAll({ order: [["sequence", "ASC"]] });
};

export const startOrGetModuleProgressService = async (userId, moduleId) => {
  if (!moduleId) throw { status: 400, message: "moduleId required" };

  const module = await Module.findByPk(moduleId);
  if (!module) throw { status: 404, message: "Module not found" };

  const userDomain = await UserCareerDomain.findOne({ where: { userId } });
  if (!userDomain)
    throw { status: 403, message: "User not enrolled in any career domain" };

  const mapping = await DomainModuleMapping.findOne({
    where: { careerDomainId: userDomain.careerDomainId, moduleId },
  });
  if (!mapping)
    throw {
      status: 403,
      message: "This module does not belong to user’s enrolled domain",
    };

  // Check progress
  let progress = await UserModuleProgress.findOne({
    where: { userId, moduleId },
  });

  if (!progress) {
    progress = await UserModuleProgress.create({ userId, moduleId });

    // Pre-create lesson + quiz progress
    const lessons = await Lesson.findAll({ where: { moduleId } });

    for (const lesson of lessons) {
      await UserLessonProgress.findOrCreate({
        where: { userId, lessonId: lesson.id },
        defaults: { userId, lessonId: lesson.id },
      });

      const quizzes = await QuizQuestion.findAll({
        where: { lessonId: lesson.id },
      });
      for (const quiz of quizzes) {
        await UserQuizAnswer.findOrCreate({
          where: { userId, lessonId: lesson.id, quizQuestionId: quiz.id },
          defaults: {
            userId,
            lessonId: lesson.id,
            quizQuestionId: quiz.id,
            selectedOption: null,
            isCorrect: null,
          },
        });
      }
    }
  }

  return progress;
};

export const getLessonsForModuleService = async (moduleId) => {
  if (!moduleId) throw { status: 400, message: "moduleId required" };

  const lessons = await Lesson.findAll({
    where: { moduleId },
    order: [["sequence", "ASC"]],
  });

  return lessons;
};

export const startOrGetLessonProgressService = async (userId, lessonId) => {
  if (!lessonId) throw { status: 400, message: "lessonId required" };

  let progress = await UserLessonProgress.findOne({
    where: { userId, lessonId },
  });

  if (!progress) {
    progress = await UserLessonProgress.create({ userId, lessonId });
  }

  return progress;
};

export const submitQuizAnswerService = async (
  userId,
  lessonId,
  quizQuestionId,
  selectedOption
) => {
  if (!lessonId || !quizQuestionId || selectedOption === undefined)
    throw {
      status: 400,
      message: "lessonId, quizQuestionId, and selectedOption required",
    };

  // Check quiz and lesson existence
  const question = await QuizQuestion.findByPk(quizQuestionId);
  if (!question || question.lessonId !== lessonId)
    throw { status: 404, message: "Quiz question not found for this lesson" };

  const lesson = await Lesson.findByPk(lessonId);
  if (!lesson) throw { status: 404, message: "Lesson not found" };

  // Module and lesson progress
  const moduleProgress = await UserModuleProgress.findOne({
    where: { userId, moduleId: lesson.moduleId },
  });
  if (!moduleProgress)
    throw {
      status: 403,
      message: "User not enrolled in the module for this lesson",
    };

  let lessonProgress = await UserLessonProgress.findOne({
    where: { userId, lessonId },
  });
  if (!lessonProgress)
    throw { status: 403, message: "User not enrolled in this lesson" };

  // Check existing answer
  let existing = await UserQuizAnswer.findOne({
    where: { userId, lessonId, quizQuestionId },
  });
  if (existing && existing.selectedOption !== null)
    throw { status: 400, message: "Already answered" };

  // Save or update answer
  const isCorrect = question.correctAnswer === selectedOption;
  if (existing) {
    existing.selectedOption = selectedOption;
    existing.isCorrect = isCorrect;
    existing.answeredAt = new Date();
    await existing.save();
  } else {
    await UserQuizAnswer.create({
      userId,
      lessonId,
      quizQuestionId,
      selectedOption,
      isCorrect,
    });
  }

  // Award XP
  let xpAwarded = isCorrect && question.xp ? question.xp : 0;
  if (xpAwarded > 0) {
    lessonProgress.obtainedXP += xpAwarded;
    await lessonProgress.save();

    moduleProgress.obtainedXP += xpAwarded;

    // Update module badge
    const module = await Module.findByPk(lesson.moduleId);
    if (module && module.totalXP) {
      const percent = (moduleProgress.obtainedXP / module.totalXP) * 100;
      let badge = percent >= 66 ? "Gold" : percent >= 33 ? "Silver" : "Bronze";
      if (moduleProgress.badge !== badge) moduleProgress.badge = badge;
    }
    await moduleProgress.save();
  }

  // Check lesson completion
  const totalQuizzes = await QuizQuestion.count({ where: { lessonId } });
  const answeredQuizzes = await UserQuizAnswer.count({
    where: { userId, lessonId, selectedOption: { [Op.ne]: null } },
  });

  if (lessonProgress && totalQuizzes > 0 && answeredQuizzes === totalQuizzes) {
    lessonProgress.isCompleted = true;
    lessonProgress.completedAt = new Date();
    await lessonProgress.save();
  }

  return { isCorrect, xpAwarded };
};

export const getUserModuleProgressService = async (userId, moduleId) => {
  if (!moduleId) throw { status: 400, message: "moduleId required" };

  const progress = await UserModuleProgress.findOne({
    where: { userId, moduleId },
  });
  if (!progress) throw { status: 404, message: "No progress found" };

  const module = await Module.findByPk(moduleId);
  let badge = "Bronze";
  if (module && module.totalXP) {
    const percent = (progress.obtainedXP / module.totalXP) * 100;
    if (percent >= 66) badge = "Gold";
    else if (percent >= 33) badge = "Silver";
  }

  return { ...progress.get(), badge };
};

export const getQuizzesForLessonService = async (lessonId) => {
  if (!lessonId) throw { status: 400, message: "lessonId required" };

  const quizzes = await QuizQuestion.findAll({
    where: { lessonId },
    order: [["sequence", "ASC"]],
  });

  return quizzes;
};

// 1. Get all modules a user is enrolled in (for a specific domain)
export const getUserEnrolledModulesService = async (userId, domainId) => {
  if (!domainId) throw { status: 400, message: "domainId required" };

  // ✅ Verify user is enrolled in this domain
  const userDomain = await UserCareerDomain.findOne({
    where: { userId, careerDomainId: domainId },
  });
  if (!userDomain) {
    throw { status: 403, message: "User not enrolled in this domain" };
  }

  // ✅ Fetch modules with progress
  const userModules = await UserModuleProgress.findAll({
    where: { userId },
    include: [
      {
        model: Module,
        attributes: ["id", "title", "description", "totalXP", "sequence"],
        include: [
          {
            model: DomainModuleMapping,
            as: "domainModuleMappings",
            attributes: ["careerDomainId"], // minimal fields
            where: { careerDomainId: domainId },
            include: [
              {
                model: CareerDomain,
                as: "domain",
                attributes: ["id", "title"],
              },
            ],
          },
        ],
      },
    ],
    order: [[{ model: Module }, "sequence", "ASC"]],
  });

  // ✅ Return only the necessary fields
  return userModules
    .filter((um) => um.Module) // ensure Module exists
    .map((um) => ({
      id: um.Module.id,
      title: um.Module.title,
      description: um.Module.description,
      totalXP: um.Module.totalXP,
      obtainedXP: um.obtainedXP,
      badge: um.badge,
      isCompleted: um.isCompleted,
      completedAt: um.completedAt,
      careerDomainTitle:
        um.Module?.domainModuleMappings?.[0]?.domain?.title || null,
    }));
};


// 2. Get all lessons a user is enrolled in for a given module
export const getUserEnrolledLessonsForModuleService = async (
  userId,
  moduleId
) => {
  if (!moduleId) throw { status: 400, message: "moduleId required" };

  const userLessons = await UserLessonProgress.findAll({
    where: { userId },
    include: [{ model: Lesson, where: { moduleId } }],
    order: [[{ model: Lesson }, "sequence", "ASC"]],
  });

  console.log("userLessons",userLessons)

  return userLessons.map((ul) => ul.Lesson);
};

// 3. Get quizzes for a lesson (only unanswered)
export const getUserQuizzesForLessonWithStatusService = async (
  userId,
  lessonId
) => {
  if (!lessonId) throw { status: 400, message: "lessonId required" };

  const quizzes = await QuizQuestion.findAll({
    where: { lessonId },
    order: [["sequence", "ASC"]],
  });

  const userAnswers = await UserQuizAnswer.findAll({
    where: { userId, lessonId },
  });

  const answeredSet = new Set(
    userAnswers
      .filter((a) => a.selectedOption !== null && a.selectedOption !== "")
      .map((a) => a.quizQuestionId)
  );

  return quizzes.filter((q) => !answeredSet.has(q.id));
};
