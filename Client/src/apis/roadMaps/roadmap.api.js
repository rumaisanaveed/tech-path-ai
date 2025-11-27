import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

//@GET || Get all Roadmaps

export const getRoadmaps = async () => {
  const url = API_ROUTES.ROADMAPS.GET_ROADMAPS();
  const res = await axiosReq(API_MODES.GET, url);
  console.log("Roadmaps API Response:", res);
  return res.data
};


export const getDashboardData = async () => {
  const url = API_ROUTES.ROADMAPS.GET_DASHBOARD_DATA();
  const res = await axiosReq(API_MODES.GET, url);
  console.log("Dashboard Data API Response:", res);
  return res.data;
}