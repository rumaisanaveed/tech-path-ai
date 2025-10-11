import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import { PostLessonEnrollment,GetAllUserLessons,GetDetailLesson } from "./lessonService.js";

export const postLessonEnrollment = async (req, res) => {
  try {
    const { userId } = req.body;
    const enrolled = await PostLessonEnrollment({ userId });
    return successResponse(res, enrolled, "Lesson enrollment successful", 201);
  } catch (error) {
    console.log("Error in postLessonEnrollment", error);
    errorResponse(res, error.message, "Internal Server Error");
  }
};

export const getAllUserLessons = async (req, res) => {
 try {
     const { moduleId } = req.params;
     console.log(moduleId)

 
     if (!moduleId) {
       return errorResponse(res, "Module ID is required", "Bad Request", 400);
     }
 
     const moduleAndLessons = await GetAllUserLessons(moduleId);
     return successResponse(res, moduleAndLessons, "Module and lessons fetched successfully", 200);
     
   } catch (error) {
     console.log(error);
     errorResponse(res, error.message, "Internal Server Error");
   }
}

export const getDetailsOfLesson = async (req, res) => {
  try {
      const { lessonId } = req.params;
  
      if (!lessonId) {
        return errorResponse(res, "Lesson ID is required", "Bad Request", 400);
      }
  
      const data = await GetDetailLesson(lessonId)
  
      return successResponse(res, data, "Lesson fetched successfully", 200);
      
    } catch (error) {
      console.log(error);
      errorResponse(res, error.message, "Internal Server Error");
    }
}