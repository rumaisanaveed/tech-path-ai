import {
  successResponse,
  errorResponse,
} from "../../utils/handlers/reponseHandler.js";
import {
  fetchModules,
  getLessonsForModuleService,
  getQuizzesForLessonService,
  getUserModuleProgressService,
  startOrGetLessonProgressService,
  startOrGetModuleProgressService,
  submitQuizAnswerService,
  getUserEnrolledModulesService,
  getUserEnrolledLessonsForModuleService,
  getUserQuizzesForLessonWithStatusService,
} from "./modulesServices.js";

export const getAllModules = async (req, res) => {
  try {
    const { careerDomainId } = req.query;
    const modules = await fetchModules(careerDomainId);
    return successResponse(res, { modules }, "Modules fetched successfully");
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const startOrGetModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.body;
    const userId = req.userId;
    if (!moduleId) errorResponse(res, "moduleId is required", null, 400);

    const progress = await startOrGetModuleProgressService(userId, moduleId);

    return successResponse(res, { progress });
  } catch (err) {
    console.error("Error in startOrGetModuleProgress:", err);
    return errorResponse(res, err);
  }
};

export const getLessonsForModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    if (!moduleId) return errorResponse(res, "moduleId is required", null, 400);
    const lessons = await getLessonsForModuleService(moduleId);

    return successResponse(res, { lessons });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const startOrGetLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const userId = req.userId;

    const progress = await startOrGetLessonProgressService(userId, lessonId);

    return successResponse(res, { progress });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const submitQuizAnswer = async (req, res) => {
  try {
    const { lessonId, quizQuestionId, selectedOption } = req.body;
    const userId = req.userId;

    const result = await submitQuizAnswerService(
      userId,
      lessonId,
      quizQuestionId,
      selectedOption
    );

    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getUserModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.userId;

    const progress = await getUserModuleProgressService(userId, moduleId);
    return successResponse(res, { progress });
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const getQuizzesForLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const quizzes = await getQuizzesForLessonService(lessonId);
    return successResponse(res, { quizzes });
  } catch (err) {
    return errorResponse(res, err);
  }
};

// 1. Get all modules user enrolled in
export const getUserEnrolledModules = async (req, res) => {
  try {
    const userId = req.userId;
    const { domainId } = req.params;

    const modules = await getUserEnrolledModulesService(userId, domainId);
    return successResponse(res, { modules });
  } catch (err) {
    return errorResponse(res, err);
  }
};

// 2. Get lessons for a module user enrolled in
export const getUserEnrolledLessonsForModule = async (req, res) => {
  try {
    const userId = 3;
    const { moduleId } = req.params;

    console.log("Fetching lessons for user:", userId, "module:", moduleId);

    const lessons = await getUserEnrolledLessonsForModuleService(
      userId,
      moduleId
    );
    return successResponse(res, { lessons });
  } catch (err) {
    return errorResponse(res, err);
  }
};

// 3. Get unanswered quizzes for a lesson
export const getUserQuizzesForLessonWithStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const { lessonId } = req.params;

    const quizzes = await getUserQuizzesForLessonWithStatusService(
      userId,
      lessonId
    );
    return successResponse(res, { quizzes });
  } catch (err) {
    return errorResponse(res, err);
  }
};
