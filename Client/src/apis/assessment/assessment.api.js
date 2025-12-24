import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

export const StartSession = async () => {
  const url = API_ROUTES.ASSESSMENT.POST_SESSION();
  const res = await axiosReq(API_MODES.POST, url, {});
  return res.data;
};

// Assessment: Get Questions by Category
export const getQuestionsByCategory = async (sessionId, categoryId) => {
  const url = API_ROUTES.ASSESSMENT.GET_QUESTIONS_BY_CATEGORY(
    sessionId,
    categoryId
  );
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
};

// Assessment: Submit Answer by Category
export const submitAnswerByCategory = async (sessionId, answerData) => {
  const url = API_ROUTES.ASSESSMENT.SUBMIT_ANSWER_BY_CATEGORY(sessionId);
  const res = await axiosReq(API_MODES.POST, url, answerData);
  return res.data;
};

// Assessment: Post Final Results
export const postResults = async (sessionId) => {
  const url = API_ROUTES.ASSESSMENT.POST_RESULTS(sessionId);
  const res = await axiosReq(API_MODES.POST, url);
  return res.data;
};

// Assessment: Get Results
export const getCurrentResult = async (sessionId) => {
  const url = API_ROUTES.ASSESSMENT.GET_RESULTS(sessionId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data;
};

// Assessment : Get previous results
export const getPreviousResults = async () => {
  const res = await axiosReq(
    API_MODES.GET,
    API_ROUTES.ASSESSMENT.GET_PREVIOUS_RESULTS
  );
  return res.data;
};
