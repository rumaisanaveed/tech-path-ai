import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

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
