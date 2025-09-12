import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

//@GET || Get all module 
export const getUserEnrolledModules = async (domainId) => {
  const url = API_ROUTES.SKILLMODULE.GET_USER_ENROLLED(domainId);
  const res = await axiosReq(API_MODES.GET, url);
  console.log("This is response from getUserEnrolledModules", res);
  return res.data;
}

export const getAllModulesFromDomain = async (domainId) => {
  const url = API_ROUTES.MODULES.GET_ALL_MODULES_FROM_DOMAIN(domainId);
  const res = await axiosReq(API_MODES.GET, url);
  console.log("This is response from getAllModulesFromDomain", res);
  return res.data;
}