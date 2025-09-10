import { successResponse, errorResponse } from "../../utils/handlers/reponseHandler.js";
import {
  enrollCareerDomainService,
  getCurrentCareerDomainService,
  getAllCareerDomainsService,
} from "./domainServices.js";

// 1. Enroll career domain
export const enrollCareerDomain = async (req, res) => {
  try {
    const { careerDomainId } = req.body;
    const userId = req.userId;

    const userDomain = await enrollCareerDomainService(userId, careerDomainId);
    return successResponse(res, { userCareerDomain: userDomain }, "Enrolled successfully");
  } catch (err) {
    return errorResponse(res, err);
  }
};

// 2. Get user enrolled domains
export const getCurrentCareerDomain = async (req, res) => {
  try {
    const userId = req.userId;

    const careerDomains = await getCurrentCareerDomainService(userId);
    return successResponse(res, { careerDomains });
  } catch (err) {
    return errorResponse(res, err);
  }
};

// 3. Get all domains
export const getAllCareerDomains = async (req, res) => {
  try {
    const careerDomains = await getAllCareerDomainsService();
    return successResponse(res, { careerDomains });
  } catch (err) {
    return errorResponse(res, err);
  }
};
