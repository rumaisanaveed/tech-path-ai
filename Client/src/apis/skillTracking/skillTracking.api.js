import { ADMIN_API_ROUTES, API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";

//@GET || Get all domains
export const getAllCareerDomains = async () => {
  const url = API_ROUTES.SKILLTRACKING.GET_ALL_CAREER_DOMAINS;
  const res = await axiosReq(API_MODES.GET, url);
  console.log("This is response from getAllCareerDomains", res);
  return res.data;
}

//@GET || Get all enrolled domains of a user
export const getUserEnrolledDomains = async () => {
  const url = API_ROUTES.SKILLTRACKING.GET_USER_CAREER_DOMAINS;
  const res = await axiosReq(API_MODES.GET, url);
  console.log("This is response from getUserEnrolledDomains", res);
  return res.data;
}

//@POST || Enroll a user in a career domain
export const enrollInCareerDomain = async (domainId) => {
  const url = API_ROUTES.SKILLTRACKING.ENROLL_CAREER_DOMAIN;
  const res = await axiosReq(API_MODES.POST, url, { careerDomainId: domainId });
  //console.log("This is response from enrollInCareerDomain", res);
  return res.data;
}

//ADMIN Management
export const adminGetAllCareerDomains = async () => {
  const url = ADMIN_API_ROUTES.SKILLTRACKING.GET_ALL_CAREER_DOMAINS;
  const res = await axiosReq(API_MODES.GET, url);
  console.log("This is response from adminGetAllCareerDomains", res);
  return res.data;
}

export const adminToggleDomainStatus = async (domainId) => {
  const url = ADMIN_API_ROUTES.SKILLTRACKING.TOGGLE_CAREER_DOMAIN_STATUS(domainId);
  const res = await axiosReq(API_MODES.PATCH, url);
  console.log("This is response from adminToggleDomainStatus", res);
  return res.data;
};

export const adminDeleteDomain = async (domainId) => {
  const url = ADMIN_API_ROUTES.SKILLTRACKING.DELETE_CAREER_DOMAIN(domainId);
  const res = await axiosReq(API_MODES.DELETE, url);
  console.log("This is response from adminDeleteDomain", res);
  return res.data;
};

export const adminCreateDomain = async (formData) => {
  const url = ADMIN_API_ROUTES.SKILLTRACKING.CREATE_CAREER_DOMAIN;
  const res = await axiosReq(API_MODES.POST, url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};