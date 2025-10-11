import {
  errorResponse,
  successResponse,
} from "../../utils/handlers/reponseHandler.js";
import {
  GetAllCareerDomains,
  EnrollCareerDomain,
  GetCurrentCareerDomain,
  UnenrollCareerDomain,
} from "./domainServices.js";

export const enrollCareerDomain = async (req, res) => {
  try {
    const userId = req.userId;
    const { careerDomainId } = req.body;

    if (!careerDomainId) {
      return errorResponse(res, "careerDomainId is required", 400);
    }
    // Call the service to enroll the user in the career domain
    const enrollment = await EnrollCareerDomain(userId, careerDomainId);
    return successResponse(
      res,
      enrollment,
      "Enrolled in career domain successfully",
      200
    );
  } catch (error) {
    console.log("Error in enrollCareerDomain:", error);
    errorResponse(res, error, "Server Error");
  }
};

export const getCurrentCareerDomain = async (req, res) => {
  try {
    const userId = req.userId;
    const careerDomains = await GetCurrentCareerDomain(userId);
    successResponse(
      res,
      { careerDomains },
      "Current Career Domains fetched",
      200
    );
  } catch (error) {
    console.log("Error in getCurrentCareerDomain:", error);
    errorResponse(res, "Server Error", 500);
  }
};

export const getAllCareerDomains = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await GetAllCareerDomains(userId);
    successResponse(res, data, "All Career Domains fetched", 200);
  } catch (error) {
    console.log("Error in getAllCareerDomains:", error);
    errorResponse(res, "Server Error", 500);
  }
};

export const unenrollCareerDomain = async (req, res) => {
  try {
    const userId = req.userId;
    const { careerDomainId } = req.params;

    if (!careerDomainId) {
      return errorResponse(res, "careerDomainId is required", 400);
    }
    // Call the service to enroll the user in the career domain
    const enrollment = await UnenrollCareerDomain(userId, careerDomainId);
    return successResponse(
      res,
      enrollment,
      "Unenrolled from career domain successfully",
      200
    );
  } catch (error) {
    console.log("Error in unenrollCareerDomain:", error);
    errorResponse(res, "Server Error", 500);
  }
};
