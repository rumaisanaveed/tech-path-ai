import {
  CareerDomain,
  UserCareerDomain,
  DomainModuleMapping,
  Module,
  UserModuleMapping,
} from "../../models/index.js";
import { predictModules } from "../../openai/predictCareer.js";
import { Op } from "sequelize";

export const EnrollInModule = async (userId, userResponse, domainId) => {
  console.log("🧾 Received enrollment request:", { userId, domainId });

  const filteredResponses = (userResponse || []).map((r) => ({
    question: r.question,
    answer: r.answer,
  }));

  const userDomain = await UserCareerDomain.findOne({
    where: { userId, careerDomainId: domainId },
  });
  if (!userDomain) throw new Error("❌ User domain not found");

  const careerDomain = await CareerDomain.findOne({
    where: { id: domainId },
    attributes: ["title"],
  });

  const domainModules = await DomainModuleMapping.findAll({
    where: { careerDomainId: domainId },
    attributes: ["moduleId"],
  });
  const allDomainModuleIds = domainModules.map((m) => m.moduleId);

  // 🔥 Removed already enrolled module logic temporarily
  const modules = await Module.findAll({
    where: { id: allDomainModuleIds },
    attributes: ["id", "title"],
  });

  const cleanedData = {
    userDomain: {
      userId,
      careerDomain: careerDomain?.title || "Unknown Domain",
    },
    modules: modules.map((m) => ({ id: m.id, title: m.title })),
    userResponse: filteredResponses,
  };

  console.log("🧹 Cleaned Data for AI:", cleanedData);

  const recommendedModuleIds = await predictModules(
    cleanedData.modules,
    cleanedData.userResponse,
    cleanedData.userDomain.careerDomain
  );

  if (!recommendedModuleIds || recommendedModuleIds.length === 0) {
    return {
      success: false,
      message: "No recommended modules found from AI.",
      data: cleanedData,
    };
  }

  // 🔥 All recommended modules will be enrolled, 3 active, rest pending
  const enrollData = recommendedModuleIds.map((moduleId, index) => ({
    userId,
    moduleId,
    enrolledBy: "mascot",
    status: index < 3 ? "active" : "pending",
    progress: 0.0,
  }));

  await UserModuleMapping.bulkCreate(enrollData, { ignoreDuplicates: true });

  return {
    success: true,
    message: "User enrolled successfully with 3 active modules.",
    data: {
      userDomain: cleanedData.userDomain,
      userResponse: cleanedData.userResponse,
      enrolledModules: recommendedModuleIds, // return all recommended
    },
  };
};


export const GetAllUserModules = async (userId, domainId, page = 1, limit = 6) => {
  // ✅ Step 1: Fetch career domain name
  const careerDomain = await CareerDomain.findOne({
    where: { id: domainId },
    attributes: ["id", "title"],
  });

  if (!careerDomain) {
    return {
      userId,
      domainId,
      careerDomain: null,
      modules: [],
      message: "Career domain not found.",
    };
  }

  // ✅ Step 2: Get all module IDs under this domain
  const domainModules = await DomainModuleMapping.findAll({
    where: { careerDomainId: domainId },
    attributes: ["moduleId"],
  });

  const domainModuleIds = domainModules.map((m) => m.moduleId);

  if (domainModuleIds.length === 0) {
    return {
      userId,
      domainId,
      careerDomain: careerDomain.title,
      modules: [],
      message: "No modules found for this domain.",
    };
  }

  // ✅ Step 3: Get all user module mappings for this domain
  const userModules = await UserModuleMapping.findAll({
    where: {
      userId,
      moduleId: { [Op.in]: domainModuleIds },
    },
    attributes: ["moduleId", "status", "progress", "enrolledAt"],
  });

  const userModuleIds = userModules.map((um) => um.moduleId);

  if (userModuleIds.length === 0) {
    return {
      userId,
      domainId,
      careerDomain: careerDomain.title,
      modules: [],
      message: "User not enrolled in any modules for this domain.",
    };
  }

  // ✅ Step 4: Apply pagination
  const offset = (page - 1) * limit;

  const modules = await Module.findAll({
    where: { id: { [Op.in]: userModuleIds } },
    attributes: ["id", "title", "description", "totalXp", "badge", "slug"],
    order: [["id", "ASC"]],
    offset,
    limit,
  });

  // ✅ Step 5: Combine progress + status from UserModuleMapping
  const combinedModules = modules.map((mod) => {
    const userMap = userModules.find((u) => u.moduleId === mod.id);
    return {
      ...mod.toJSON(),
      status: userMap?.status || "unknown",
      progress: userMap?.progress || 0,
      enrolledAt: userMap?.enrolledAt || null,
    };
  });

  const activeModules = combinedModules.filter((mod) => mod.status === "active");

  // ✅ Step 6: Return structured + paginated response
  return {
    userId,
    domainId,
    careerDomain: careerDomain.title,
    page,
    perPage: limit,
    totalModules: userModuleIds.length,
    totalPages: Math.ceil(userModuleIds.length / limit),
    modules: combinedModules,
    activeModules
  };
};

export const ToggleModule = async (userId, moduleId, status) => {
  

  const userModule = await UserModuleMapping.findOne({
    where: { userId, moduleId },
  });

  if (!userModule) {
    return []
  }
  userModule.status = status;

  await userModule.save();

  return userModule;

}