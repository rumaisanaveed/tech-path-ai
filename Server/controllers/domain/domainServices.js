import { CareerDomain, UserCareerDomain } from "../../models/index.js";

export const GetAllCareerDomains = async (userId) => {
  // Get all domains
  const domains = await CareerDomain.findAll({
    attributes: ["id", "title", "isActive"],
  });

  // Get user's enrolled domains
  const userDomains = await UserCareerDomain.findAll({
    where: { userId },
    attributes: ["careerDomainId"],
  });

  const enrolledIds = userDomains.map((ud) => ud.careerDomainId);

  // Add isEnrolled flag
  const careerDomains = domains.map((domain) => ({
    ...domain.toJSON(),
    isEnrolled: enrolledIds.includes(domain.id),
  }));

  return {careerDomains};
};


export const EnrollCareerDomain = async (userId, careerDomainId) => {
  const userDomain = await UserCareerDomain.findOne({
    where: { userId, careerDomainId },
  });
  if (userDomain) {
    throw { status: 200, message: "Already enrolled in this domain" };
  }
  return await UserCareerDomain.create({
    userId,
    careerDomainId,
  });
};

export const GetCurrentCareerDomain = async (userId) => {
  const userDomains = await UserCareerDomain.findAll({
    where: { userId },
    include: [
      {
        model: CareerDomain,
        as: "careerDomain",
      },
    ],
  });

  if (!userDomains || userDomains.length === 0) {
    return [];
  }

  // Access via alias name
  return userDomains.map((ud) => ud.careerDomain);
};


export const UnenrollCareerDomain = async (userId, careerDomainId) => {
  const userDomain = await UserCareerDomain.findOne({
    where: { userId, careerDomainId },
  });
  if (!userDomain) {
    throw { status: 200, message: "User not enrolled in this domain" };
  }
  return await UserCareerDomain.destroy({
    where: { userId, careerDomainId },
  });
}