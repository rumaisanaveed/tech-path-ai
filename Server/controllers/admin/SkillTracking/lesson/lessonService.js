import {
  Lesson,
  LessonExample,
  LessonLearningPoint,
  LessonResource,
  Module,
} from "../../../../models/index.js";

export const PostLesson = async (lessonData) => {
  const { moduleId, title, description, isMandatory } = lessonData;

  // Find the highest sequence number for the given module
  const lastLesson = await Lesson.findOne({
    where: { moduleId },
    order: [["sequence", "DESC"]],
  });

  // Determine the next sequence number
  const nextSequence = lastLesson ? lastLesson.sequence + 1 : 1;

  // Create the lesson with the next sequence number
  const lesson = await Lesson.create({
    moduleId,
    title,
    description,
    isMandatory,
    sequence: nextSequence,
  });

  return lesson;
};


export const GetModuleAndLessons = async (moduleId) => {
  const moduleWithLessons = await Module.findByPk(moduleId, {
    attributes: ["id", "title", "description", "totalXp", "badge", "slug"],
    include: [
      {
        model: Lesson,
        as: "lessons", // must match association alias
        attributes: ["id", "title", "description", "isMandatory", "sequence", "createdAt", "updatedAt"],
        order: [["sequence", "ASC"]] // optional: order lessons
      }
    ]
  });

  if (!moduleWithLessons) return null;

  // convert to plain object to safely return as JSON
  return moduleWithLessons.get({ plain: true });
};


export const GetSingleLesson = async (lessonId) => {
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
};