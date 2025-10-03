import {
  errorResponse,
  successResponse,
} from "../../../../utils/handlers/reponseHandler.js";
import { uploadFileToS3 } from "../../../../utils/S3.js";
import {
  DeleteDomain,
  GetAllDomains,
  PostnewDomain,
  ToggleStatus,
} from "./domainServices.js";

export const createNewDomain = async (req, res) => {
  try {
    const { title, description, isActive } = req.body;
    const file = req.file;

    if (!title || !description || !file) {
      return errorResponse(res, "Please fill all fields including cover image");
    }

    // Format title once
    const formattedTitle = title.trim().replace(/\s+/g, "-").toLowerCase();

    // Upload to S3 under "domains" folder
    const coverImageUrl = await uploadFileToS3(file, "domains", formattedTitle);

    await PostnewDomain({
      title,
      description,
      coverImage: coverImageUrl,
      isActive,
    });
    successResponse(res, {},"Domain Created Successfully", 201);
  } catch (error) {
    console.log("Error in createNewDomain:", error);
    errorResponse(res, error);
  }
};

export const toggleDomainStatus = async (req, res) => {
  try {
    const { domainId } = req.params;

    await ToggleStatus(domainId);

    successResponse(res, {}, "Domain status toggled successfully", 200);
  } catch (error) {
    console.log("Error in toggleDomainStatus:", error);
    errorResponse(res, error);
  }
};

export const getAllDomains = async (req, res) => {
  try {
    const domains = await GetAllDomains();
    if (!domains || domains.length === 0) {
      return errorResponse(res, "No domains found", 404);
    }
    successResponse(res, { domains }, "Domains fetched successfully", 200);
  } catch (error) {
    console.log("Error in getAllDomains:", error);
    errorResponse(res, error);
  }
};

export const deleteDomain = async (req, res) => {
  try {
    const { domainId } = req.params;
    await DeleteDomain(domainId);
    successResponse(res, {}, "Domain Deleted successfully", 200);
  } catch (error) {
    console.log("Error in deleteDomain:", error);
    errorResponse(res, error);
  }
};
