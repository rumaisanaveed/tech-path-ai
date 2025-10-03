import { CareerDomain } from "../../../../models/index.js";
import { errorResponse } from "../../../../utils/handlers/reponseHandler.js";

export const PostnewDomain = async ({
  title,
  description,
  coverImage,
  isActive,
}) => {
  const newDomain = await CareerDomain.create({
    title,
    description,
    coverImage,
    isActive,
  });
  return newDomain;
};

export const ToggleStatus = async (domainId) => {
  const domain = await CareerDomain.findByPk(domainId);

  if (!domain) {
    throw new Error("Domain not found");
  }

  // Toggle status
  domain.isActive = !domain.isActive;
  await domain.save();

  return domain;
};

export const GetAllDomains = async () => {
  const domains = await CareerDomain.findAll();
  return domains;
};
export const DeleteDomain = async (domainId) => {
  const domain = await CareerDomain.findByPk(domainId);

  if (!domain) {
    throw new Error("Domain not found");
  }

  await domain.destroy();
  return;
};
