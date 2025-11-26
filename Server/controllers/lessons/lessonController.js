import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import {
  PostLessonEnrollment,
  GetAllUserLessons,
  GetDetailLesson,
  PatchLessonProgress,
} from "./lessonService.js";

export const postLessonEnrollment = async (req, res) => {
  try {
    const userId = req.userId;
    const { moduleId } = req.params;
    const enrolled = await PostLessonEnrollment({ userId, moduleId });
    return successResponse(res, enrolled, "Lesson enrollment successful", 201);
  } catch (error) {
    console.log("Error in postLessonEnrollment", error);
    errorResponse(res, error.message, "Internal Server Error");
  }
};

export const getAllUserLessons = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.userId;

    if (!moduleId) {
      return errorResponse(res, "Module ID is required", "Bad Request", 400);
    }

    const moduleAndLessons = await GetAllUserLessons({ moduleId, userId });
    return successResponse(
      res,
      moduleAndLessons,
      "Module and lessons fetched successfully",
      200
    );
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, "Internal Server Error");
  }
};

export const getDetailsOfLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.userId;

    if (!lessonId) {
      return errorResponse(res, "Lesson ID is required", "Bad Request", 400);
    }

    const data = await GetDetailLesson(lessonId, userId);

    return successResponse(res, data, "Lesson fetched successfully", 200);
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, "Internal Server Error");
  }
};

export const patchLessonProgress = async (req, res) => {
  const userId = req.userId;
  const { status, sequence } = req.body;
  const { lessonId } = req.params;

  console.log("Sequence received in request body:", sequence);

  try {
    if (!status || !lessonId || !userId) {
      return errorResponse(res, "Status is required", "Bad Request", 400);
    }

    const progress = await PatchLessonProgress(userId, lessonId, status,sequence);

    if (!progress) {
      return errorResponse(res, "Lesson progress not found", "Not Found", 404);
    }

    // Conditional message
    const message =
      status === "completed"
        ? `Lesson status updated successfully! You've earned ${progress.xp_earned} XP.`
        : "Lesson status updated successfully.";

    return successResponse(res, progress, message, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message, "Internal Server Error");
  }
};