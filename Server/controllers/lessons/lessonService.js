import { Lesson, LessonExample, LessonLearningPoint, LessonResource, Module, UserLessonProgress } from "../../models/index.js";

export const PostLessonEnrollment = async ({ userId }) => {
  // 1️⃣ Get all lessons
  const lessons = await Lesson.findAll({ attributes: ["id"] });

  if (!lessons || lessons.length === 0) {
    throw new Error("No lessons found to enroll the user.");
  }

  // 2️⃣ Map lessons to enrollment entries
  const enrollments = lessons.map((lesson) => ({
    id: uuidv4(), // unique id for UserLessonProgress
    userId,
    lessonId: lesson.id,
    quizCompleted: false,
    xpEarned: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // 3️⃣ Bulk create in UserLessonProgress
  const result = await UserLessonProgress.bulkCreate(enrollments, {
    ignoreDuplicates: true, // avoids inserting duplicates if user already enrolled
  });

  return result;
};

export const GetAllUserLessons = async ({ moduleId}) => {
  const moduleWithLessons = await Module.findByPk(moduleId, {
    attributes: ["id", "title", "description", "totalXp", "badge", "slug"],
    include: [
      {
        model: Lesson,
        as: "lessons", // must match association alias
        attributes: ["id", "title", "description", "isMandatory", "sequence", "createdAt", "updatedAt"],
        order: [["sequence", "ASC"]] // optional: order lessons
      }
    ],
  });
  console.log(moduleWithLessons)

  if (!moduleWithLessons) return null;

  // convert to plain object to safely return as JSON
  return moduleWithLessons.get({ plain: true });
};

export const GetDetailLesson = async (lessonId) => {
  if (!lessonId) return null;

  const lesson = await Lesson.findByPk(lessonId, {
    attributes: ["id", "title", "description", "isMandatory", "sequence", "createdAt", "updatedAt"],
    include: [
      {
        model: LessonExample,
        as: "examples", // must match association alias
        attributes: ["id", "codeSnippet", "description"],
        order: [["createdAt", "ASC"]]
      },
      {
        model: LessonLearningPoint,
        as: "learningPoints", // must match alias
        attributes: ["id", "point"],
        order: [["id", "ASC"]]
      },
      {
        model: LessonResource,
        as: "resources", // must match alias
        attributes: ["id", "type", "url"],
        order: [["id", "ASC"]]
      }
    ]
  });

  if (!lesson) return null;

  // convert to plain object to safely return JSON
  return lesson.get({ plain: true });
}