import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

//@GET || Get all Roadmaps

export const getRoadmaps = async (domainId) => {
  const url = API_ROUTES.ROADMAPS.GET_ROADMAPS(domainId);
  const res = await axiosReq(API_MODES.GET, url);
  return res.data
};