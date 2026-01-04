// services/quizServices.js
import { sequelize } from "../../config/connectDB.js";
import {
  Module,
  QuizSession,
  XpWeight,
  Lesson,
  UserModuleMapping,
} from "../../models/index.js";

export const PostQuizeSession = async (userId, moduleId) => {
  // 1️⃣ Check if user already has quiz sessions for this module
  const existingProgress = await QuizSession.findOne({
    where: { userId, moduleId },
  });
  if (existingProgress)
    throw new Error("User is already enrolled in this module");

  // 2️⃣ Get all lessons for this module, sorted by sequence
  const lessons = await Lesson.findAll({
    where: { moduleId },
    order: [["sequence", "ASC"]],
    attributes: ["id", "title", "sequence"],
  });

  if (!lessons.length) throw new Error("No lessons found for this module");

  // 3️⃣ Get module and XP weight info
  const module = await Module.findByPk(moduleId);
  if (!module) throw new Error("Module not found");

  const xpWeight = await XpWeight.findByPk(module.xpWeightId);
  if (!xpWeight) throw new Error("XP Weight not found for this module");

  const quizTotalXp = (module.totalXP || 0) * (xpWeight.quiz_weight || 0.4);

  // 4️⃣ Divide lessons into 3 badge groups
  const badges = [
    { badge: "Badge 1", lessons: lessons.slice(0, 3) },
    { badge: "Badge 2", lessons: lessons.slice(3, 6) },
    { badge: "Badge 3", lessons: lessons.slice(6) },
  ].filter((b) => b.lessons.length > 0); // remove empty batches

  if (!badges.length)
    throw new Error("No badges could be created from lessons");

  // 5️⃣ Calculate XP per quiz
  const xpPerQuiz = quizTotalXp / badges.length;

  // 6️⃣ Prepare quiz sessions for bulk creation
  const quizSessionsData = badges.map((b, index) => ({
    quizNumber: index + 1,
    moduleId,
    userId,
    badge: b.badge,
    lessonIds: b.lessons.map((l) => l.id),
    xp: xpPerQuiz,
    isCompleted: false,
    locked: true,
    score: null,
    quizTitle: `Quiz ${index + 1}`,
  }));

  // 7️⃣ Bulk create quiz sessions
  const quizSessions = await QuizSession.bulkCreate(quizSessionsData, {
    returning: true,
  });

  return quizSessions;
};

export const GetQuizSessions = async (userId, moduleId) => {
  const quizSessions = await QuizSession.findAll({
    where: { userId, moduleId },
    order: [["quizNumber", "ASC"]],
  });
  return quizSessions;
};

export const StartQuizSession = async (quizSessionId, userId) => {
  console.log("Starting quiz session:", { quizSessionId, userId });

  const quizSession = await QuizSession.findOne({
    where: { id: quizSessionId, userId },
    attributes: ["id", "lessonIds"], // lessonIds stored as JSON
  });

  if (!quizSession) throw new Error("Quiz session not found");

  const lessonIds = quizSession.lessonIds; // JSON array

  // 2. Fetch lessons titles
  const lessons = await Lesson.findAll({
    where: { id: lessonIds },
    attributes: ["id", "title"],
  });

  return lessons;
};

export const SubmitQuizAnswer = async ({
  quizSessionId,
  userId,
  totalQuestions,
  correctAnswers,
}) => {
  if (!totalQuestions || totalQuestions <= 0) {
    throw new Error("Total questions must be greater than 0");
  }

  if (correctAnswers < 0 || correctAnswers > totalQuestions) {
    throw new Error("Invalid correct answers count");
  }

  return await sequelize.transaction(async (t) => {
    // 1️⃣ Fetch quiz session (LOCKED)
    const quiz = await QuizSession.findOne({
      where: { id: quizSessionId, userId },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (!quiz) {
      throw new Error("Quiz session not found");
    }

    // 2️⃣ Prevent double submission
    if (quiz.isCompleted) {
      throw new Error("Quiz already completed");
    }

    // 3️⃣ XP calculation
    const xpPerQuestion = Number(quiz.xp) / totalQuestions;
    const earnedXP = Number((xpPerQuestion * correctAnswers).toFixed(2));

    // 4️⃣ Update quiz session
    quiz.score = earnedXP;
    quiz.isCompleted = true;
    await quiz.save({ transaction: t });

    // 5️⃣ Update module progress (ATOMIC)
    const [affectedRows] = await UserModuleMapping.increment(
      { progress: earnedXP },
      {
        where: {
          userId,
          moduleId: quiz.moduleId,
        },
        transaction: t,
      }
    );

    if (affectedRows === 0) {
      throw new Error("User is not enrolled in this module");
    }

    // 6️⃣ Fetch updated progress (optional but useful)
    const updatedMapping = await UserModuleMapping.findOne({
      where: {
        userId,
        moduleId: quiz.moduleId,
      },
      transaction: t,
    });

    return {
      quizSessionId,
      moduleId: quiz.moduleId,
      totalQuestions,
      correctAnswers,
      earnedXP,
      progress: Number(updatedMapping.progress),
      completed: true,
    };
  });
};
