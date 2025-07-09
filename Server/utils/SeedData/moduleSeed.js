import { Module } from "../../models/index.js";

export const seedModules = async () => {
  await Module.bulkCreate([
    // Frontend Modules
    {
      id: "module-frontend-1",
      careerDomainId: 3,
      title: "HTML & Web Structure",
      description: "Start by understanding how the web works and how to structure pages using HTML.",
      badge: "HTML Hero",
      totalXP: 120,
      sequence: 1,
    },
    {
      id: "module-frontend-2",
      careerDomainId: 3,
      title: "CSS & Layout Design",
      description: "Learn to style your HTML pages and create modern layouts.",
      badge: "CSS Commander",
      totalXP: 140,
      sequence: 2,
    },
    {
      id: "module-frontend-3",
      careerDomainId: 3,
      title: "JavaScript Essentials",
      description: "Master the basics of JavaScript: variables, loops, functions, and DOM manipulation.",
      badge: "JS Ninja",
      totalXP: 160,
      sequence: 3,
    },

    // Backend Modules
    {
      id: "module-backend-1",
      careerDomainId: "4",
      title: "Intro to Node.js",
      description: "Understand Node.js, the event loop, and write your first server.",
      badge: "Node Novice",
      totalXP: 110,
      sequence: 1,
    },
    {
      id: "module-backend-2",
      careerDomainId: 4,
      title: "Express & Routing",
      description: "Build REST APIs using Express.js and set up routes.",
      badge: "Express Expert",
      totalXP: 130,
      sequence: 2,
    },
    {
      id: "module-backend-3",
      careerDomainId: 4,
      title: "Database Integration",
      description: "Connect your backend to MySQL or MongoDB and perform CRUD operations.",
      badge: "DB Builder",
      totalXP: 150,
      sequence: 3,
    },
  ]);
  console.log("✅ Modules seeded.");
};
