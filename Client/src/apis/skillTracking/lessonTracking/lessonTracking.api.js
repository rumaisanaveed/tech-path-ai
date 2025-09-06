import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

// @GET || Lessons of a module
export const getModuleLessons = async (moduleId) => {
  const url = API_ROUTES.LESSONS.GET_MODULE_LESSONS(moduleId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
};

// @GET || Quizzes of a lesson
export const getLessonQuizzes = async (lessonId) => {
  const url = API_ROUTES.LESSONS.GET_LESSON_QUIZZES(lessonId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
};

// @POST || Submit quiz answer
export const submitQuizAnswer = async (payload) => {
  const url = API_ROUTES.LESSONS.SUBMIT_QUIZ_ANSWER;
  const res = await axiosReq(API_MODES.POST, url, payload);
  return res.data;
};
