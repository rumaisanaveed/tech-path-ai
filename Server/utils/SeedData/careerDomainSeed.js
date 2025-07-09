import { CareerDomain } from "../../models/index.js";


export const seedCareerDomains = async () => {
  await CareerDomain.bulkCreate([
    {
      id: 4,
      title: "Backend Development",
      description: "Build secure and scalable backend systems using Node.js, Express, databases, and APIs.",
      coverImage: "",
      isActive: true,
    },
  ]);
  console.log("✅ Career Domains seeded.");
};
