import {
  CareerDomain,
  UserModuleProgress,
  UserLessonProgress,
  UserQuizAnswer,
} from "../../models/index.js";
import UserCareerDomain from "../../models/skilltracking/userCareerDomain.js";

export const enrollCareerDomainService = async (userId, careerDomainId) => {
  if (!careerDomainId) throw { status: 400, message: "careerDomainId required" };

  const domain = await CareerDomain.findByPk(careerDomainId);
  if (!domain) throw { status: 404, message: "Career domain not found" };

  // Check if already enrolled
  let userDomain = await UserCareerDomain.findOne({
    where: { userId, careerDomainId },
  });
  if (userDomain) {
    throw { status: 200, message: "User already enrolled in this domain" };
  }

  // Enroll user
  userDomain = await UserCareerDomain.create({ userId, careerDomainId });

  // Auto-enroll in modules, lessons, quizzes
  const modules = await domain.getModules();
  for (const module of modules) {
    await UserModuleProgress.findOrCreate({
      where: { userId, moduleId: module.id },
      defaults: { userId, moduleId: module.id },
    });

    const lessons = await module.getLessons();
    for (const lesson of lessons) {
      await UserLessonProgress.findOrCreate({
        where: { userId, lessonId: lesson.id },
        defaults: { userId, lessonId: lesson.id },
      });

      const quizzes = await lesson.getQuizQuestions();
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

  return userDomain;
};

export const getCurrentCareerDomainService = async (userId) => {
  const userDomains = await UserCareerDomain.findAll({
    where: { userId },
    include: [{ model: CareerDomain }],
  });

  if (!userDomains || userDomains.length === 0) {
    throw { status: 404, message: "User is not enrolled in any career domain" };
  }

  return userDomains.map((ud) => ud.careerDomain);
};

export const getAllCareerDomainsService = async () => {
  return await CareerDomain.findAll();
};
