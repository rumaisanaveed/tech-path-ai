import UserModuleProgress from "../models/skilltracking/userModuleProgress.js";
import UserLessonProgress from "../models/skilltracking/userLessonProgress.js";
import UserQuizAnswer from "../models/skilltracking/userQuizAnswer.js";
import Module from "../models/skilltracking/module.js";
import Lesson from "../models/skilltracking/lesson.js";
import QuizQuestion from "../models/skilltracking/quizQuestion.js";
import { Op } from "sequelize";

// 1. Start or continue a module
export const startOrGetModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.body;
    const userId = req.userId;
    if (!moduleId) return res.status(400).json({ success: false, message: "moduleId required" });
    let progress = await UserModuleProgress.findOne({ where: { userId, moduleId } });
    if (!progress) {
      progress = await UserModuleProgress.create({ userId, moduleId });
      // Get all lessons for this module
      const lessons = await Lesson.findAll({ where: { moduleId } });
      // Bulk create UserLessonProgress for each lesson if not exists
      for (const lesson of lessons) {
        const [lessonProgress] = await UserLessonProgress.findOrCreate({
          where: { userId, lessonId: lesson.id },
          defaults: { userId, lessonId: lesson.id }
        });
        // Optionally, pre-create UserQuizAnswer for each quiz in this lesson
        const quizzes = await QuizQuestion.findAll({ where: { lessonId: lesson.id } });
        for (const quiz of quizzes) {
          await UserQuizAnswer.findOrCreate({
            where: { userId, lessonId: lesson.id, quizQuestionId: quiz.id },
            defaults: { userId, lessonId: lesson.id, quizQuestionId: quiz.id, selectedOption: null, isCorrect: null }
          });
        }
      }
    }
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// 2. Get all lessons for a module (sorted)
export const getLessonsForModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    if (!moduleId) return res.status(400).json({ success: false, message: "moduleId required" });
    const lessons = await Lesson.findAll({ where: { moduleId }, order: [["sequence", "ASC"]] });
    res.json({ success: true, lessons });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// 3. Start or continue a lesson
export const startOrGetLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const userId = req.userId;
    if (!lessonId) return res.status(400).json({ success: false, message: "lessonId required" });
    let progress = await UserLessonProgress.findOne({ where: { userId, lessonId } });
    if (!progress) {
      progress = await UserLessonProgress.create({ userId, lessonId });
    }
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// 4. Submit a quiz answer
export const submitQuizAnswer = async (req, res) => {
  try {
    const { lessonId, quizQuestionId, selectedOption } = req.body;
    const userId = req.userId;
    if (!lessonId || !quizQuestionId || selectedOption === undefined) {
      return res.status(400).json({ success: false, message: "lessonId, quizQuestionId, and selectedOption required" });
    }

    // 1. Check if quiz question exists and belongs to the lesson
    const question = await QuizQuestion.findByPk(quizQuestionId);
    if (!question || question.lessonId !== lessonId) {
      return res.status(404).json({ success: false, message: "Quiz question not found for this lesson" });
    }

    // 2. Check if lesson exists
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    // 3. Check if user is enrolled in the module of this lesson
    const moduleProgress = await UserModuleProgress.findOne({ where: { userId, moduleId: lesson.moduleId } });
    if (!moduleProgress) {
      return res.status(403).json({ success: false, message: "User not enrolled in the module for this lesson" });
    }

    // 4. Check if user is enrolled in the lesson
    const lessonProgress = await UserLessonProgress.findOne({ where: { userId, lessonId } });
    if (!lessonProgress) {
      return res.status(403).json({ success: false, message: "User not enrolled in this lesson" });
    }

    // 5. Check if already answered
    const existing = await UserQuizAnswer.findOne({ where: { userId, lessonId, quizQuestionId } });
    if (existing && existing.selectedOption !== null) {
      return res.status(400).json({ success: false, message: "Already answered" });
    }

    // 6. Save answer
    const isCorrect = question.correctAnswer === selectedOption;
    if (existing) {
      // Update the existing (pre-created) record
      existing.selectedOption = selectedOption;
      existing.isCorrect = isCorrect;
      existing.answeredAt = new Date();
      await existing.save();
    } else {
      await UserQuizAnswer.create({ userId, lessonId, quizQuestionId, selectedOption, isCorrect });
    }

    // 7. Award XP if correct
    let xpAwarded = 0;
    if (isCorrect && question.xp) xpAwarded = question.xp;
    if (lessonProgress && xpAwarded > 0) {
      lessonProgress.obtainedXP += xpAwarded;
      await lessonProgress.save();
    }
    if (moduleProgress && xpAwarded > 0) {
      moduleProgress.obtainedXP += xpAwarded;
      // Update badge if needed
      const module = await Module.findByPk(lesson.moduleId);
      if (module && module.totalXP) {
        const percent = (moduleProgress.obtainedXP / module.totalXP) * 100;
        let badge = "Bronze";
        if (percent >= 66) badge = "Gold";
        else if (percent >= 33) badge = "Silver";
        else badge = "Bronze";
        if (moduleProgress.badge !== badge) {
          moduleProgress.badge = badge;
        }
      }
      await moduleProgress.save();
    }

    // 8. Check if all quizzes for this lesson are answered, mark lesson as completed if so
    const totalQuizzes = await QuizQuestion.count({ where: { lessonId } });
    const answeredQuizzes = await UserQuizAnswer.count({ where: { userId, lessonId, selectedOption: { [Op.ne]: null } } });
    if (lessonProgress && totalQuizzes > 0 && answeredQuizzes === totalQuizzes) {
      lessonProgress.isCompleted = true;
      lessonProgress.completedAt = new Date();
      await lessonProgress.save();
    }

    res.json({ success: true, isCorrect, xpAwarded });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// 5. Get user progress for a module
export const getUserModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.userId;
    if (!moduleId) return res.status(400).json({ success: false, message: "moduleId required" });
    const progress = await UserModuleProgress.findOne({ where: { userId, moduleId } });
    if (!progress) return res.status(404).json({ success: false, message: "No progress found" });
    // Get module totalXP
    const module = await Module.findByPk(moduleId);
    let badge = "Bronze";
    if (module && module.totalXP) {
      const percent = (progress.obtainedXP / module.totalXP) * 100;
      if (percent >= 66) badge = "Gold";
      else if (percent >= 33) badge = "Silver";
      else badge = "Bronze";
    }
    res.json({ success: true, progress: { ...progress.get(), badge } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getAllModules = async (req, res) => {
  try {
    const { careerDomainId } = req.query;
    const where = careerDomainId ? { careerDomainId } : {};
    const modules = await Module.findAll({ where, order: [["sequence", "ASC"]] });
    res.json({ success: true, modules });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getQuizzesForLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    if (!lessonId) return res.status(400).json({ success: false, message: "lessonId required" });
    const quizzes = await QuizQuestion.findAll({ where: { lessonId }, order: [["sequence", "ASC"]] });
    res.json({ success: true, quizzes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};