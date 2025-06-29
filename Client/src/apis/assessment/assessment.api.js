import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { getItemFromStorage } from "@/utils/helpers/storage/localStorage";

export const startAssessment = async ({ category }) => {
  console.log(category);
  const res = await axiosReq(
    API_MODES.POST,
    API_ROUTES.ASSESSMENT.START_ASSESSMENT,
    {
      category: category,
    }
  );
  return res.data;
};

export const submitAnswer = async ({ optionId }) => {
  const sessionId = getItemFromStorage("sessionId");
  const res = await axiosReq(
    API_MODES.POST,
    API_ROUTES.ASSESSMENT.SUBMIT_ANSWER(sessionId),
    {
      selectedOptionId: optionId,
    }
  );
  console.log("Submit answer api response", res);
};
