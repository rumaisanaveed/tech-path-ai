import { ADMIN_API_ROUTES, API_ROUTES } from "@/constants/apiUrls";
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
//--------------User--------------
export const getAllUserLessons = async (moduleId) => {
  const url = API_ROUTES.LESSONS.GET_ALL_USER_LESSONS(moduleId);
  const res = await axiosReq(API_MODES.GET, url);
  console.log("All User Lessons Response:", res);
  return res.data;
}


//--------------ADMIN-------------

export const getAllModuleLessons = async (moduleId) => {
  const url = ADMIN_API_ROUTES.LESSON_TRACKING.GET_ALL_MODULE_LESSONS_AND_MODULE(moduleId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
}

export const postLesson = async ({ moduleId, title, description, isMandatory }) => {
  const url = ADMIN_API_ROUTES.LESSON_TRACKING.ADD_LESSON(moduleId);
  const res = await axiosReq(API_MODES.POST, url, {
    title,
    description,
    isMandatory,
  });
  return res.data;
};

export const getSingleLesson = async (lessonId) => {
  const url = ADMIN_API_ROUTES.LESSON_TRACKING.GET_SINGLE_LESSON(lessonId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
}