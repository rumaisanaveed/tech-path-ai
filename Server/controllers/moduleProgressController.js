import UserModuleProgress from "../models/skilltracking/userModuleProgress.js";
import UserLessonProgress from "../models/skilltracking/userLessonProgress.js";
import UserQuizAnswer from "../models/skilltracking/userQuizAnswer.js";
import Module from "../models/skilltracking/module.js";
import Lesson from "../models/skilltracking/lesson.js";
import QuizQuestion from "../models/skilltracking/quizQuestion.js";

// 1. Start or continue a module
export const startOrGetModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.body;
    const userId = req.userId;
    if (!moduleId) return res.status(400).json({ success: false, message: "moduleId required" });
    let progress = await UserModuleProgress.findOne({ where: { userId, moduleId } });
    if (!progress) {
      progress = await UserModuleProgress.create({ userId, moduleId });
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
    // Check if already answered
    const existing = await UserQuizAnswer.findOne({ where: { userId, lessonId, quizQuestionId } });
    if (existing) {
      return res.status(400).json({ success: false, message: "Already answered" });
    }
    const question = await QuizQuestion.findByPk(quizQuestionId);
    if (!question) return res.status(404).json({ success: false, message: "Quiz question not found" });
    const isCorrect = question.correctAnswer === selectedOption;
    await UserQuizAnswer.create({ userId, lessonId, quizQuestionId, selectedOption, isCorrect });
    // Award XP if correct
    let xpAwarded = 0;
    if (isCorrect && question.xp) xpAwarded = question.xp;
    // Update lesson progress XP
    const lessonProgress = await UserLessonProgress.findOne({ where: { userId, lessonId } });
    if (lessonProgress && xpAwarded > 0) {
      lessonProgress.obtainedXP += xpAwarded;
      await lessonProgress.save();
    }
    // Update module progress XP
    const lesson = await Lesson.findByPk(lessonId);
    if (lesson && lesson.moduleId && xpAwarded > 0) {
      const moduleProgress = await UserModuleProgress.findOne({ where: { userId, moduleId: lesson.moduleId } });
      if (moduleProgress) {
        moduleProgress.obtainedXP += xpAwarded;
        await moduleProgress.save();
      }
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
