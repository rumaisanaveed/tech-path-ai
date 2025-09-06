import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

//@GET || Get all domains
export const getAllCareerDomains = async () => {
  const url = API_ROUTES.SKILLTRACKING.GET_ALL_CAREER_DOMAINS;
  const res = await axiosReq(API_MODES.GET, url);
  //console.log("This is response from getAllCareerDomains", res);
  return res.data;
}

//@GET || Get all enrolled domains of a user
export const getUserEnrolledDomains = async () => {
  const url = API_ROUTES.SKILLTRACKING.GET_USER_CAREER_DOMAINS;
  const res = await axiosReq(API_MODES.GET, url);
  //console.log("This is response from getUserEnrolledDomains", res);
  return res.data;
}

//@POST || Enroll a user in a career domain
export const enrollInCareerDomain = async (domainId) => {
  const url = API_ROUTES.SKILLTRACKING.ENROLL_CAREER_DOMAIN;
  const res = await axiosReq(API_MODES.POST, url, { careerDomainId: domainId });
  //console.log("This is response from enrollInCareerDomain", res);
  return res.data;
}