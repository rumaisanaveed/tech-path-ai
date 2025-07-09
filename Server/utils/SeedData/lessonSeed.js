import { Lesson } from "../../models/index.js";

export const seedLessons = async () => {
  await Lesson.bulkCreate([
    // Frontend - HTML Module
    {
      id: "lesson-frontend-1-1",
      moduleId: "module-frontend-1",
      title: "What is the Web?",
      description: "Learn how browsers and servers communicate over HTTP.",
      estimatedTime: "10 mins",
      sequence: 1,
      xp: 10,
    },
    {
      id: "lesson-frontend-1-2",
      moduleId: "module-frontend-1",
      title: "Basic HTML Structure",
      description: "Explore <html>, <head>, <body> and doctype.",
      estimatedTime: "15 mins",
      sequence: 2,
      xp: 20,
    },
    {
      id: "lesson-frontend-1-3",
      moduleId: "module-frontend-1",
      title: "Headings, Paragraphs, Links",
      description: "Use core HTML tags to structure content.",
      estimatedTime: "15 mins",
      sequence: 3,
      xp: 20,
    },

    // Backend - Node Module
    {
      id: "lesson-backend-1-1",
      moduleId: "module-backend-1",
      title: "What is Node.js?",
      description: "Understand Node's asynchronous event-driven architecture.",
      estimatedTime: "12 mins",
      sequence: 1,
      xp: 15,
    },
    {
      id: "lesson-backend-1-2",
      moduleId: "module-backend-1",
      title: "Running Your First Script",
      description: "Create your first Node.js app using the terminal.",
      estimatedTime: "10 mins",
      sequence: 2,
      xp: 15,
    },
    {
      id: "lesson-backend-1-3",
      moduleId: "module-backend-1",
      title: "Using the File System",
      description: "Read/write files using Node's fs module.",
      estimatedTime: "15 mins",
      sequence: 3,
      xp: 20,
    },
  ]);
  console.log("✅ Lessons seeded.");
};