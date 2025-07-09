import category from "./assessment/assessmentCategoryModel.js";
import AssessmentQuestion from "./assessment/assessmentQuestionsModel.js";
import AssessmentOptions from "./assessment/assessmentOptionsModel.js";
import AssessmentSession from "./assessment/assessmentSessionModel.js";
import AssessmentSessionAns from "./assessment/assessmentSessionAns.js";
import AssessmentSessionQuestion from "./assessment/assessmentSessionQuestion.js";
import Blogs from "./blogModel.js";
import Tag from "./tagModel.js";
import User from "./userModel.js";
import categoryScoreGame from "./gamification/categoryScore.js";
import trainingSample from "./trainingSample.js";
import CareerDomain from "./skilltracking/careerDomain.js";
import Module from "./skilltracking/module.js";
import Lesson from "./skilltracking/lesson.js";

// 🔁 Define relationships here

// User → Blog (One-to-Many)
User.hasMany(Blogs, { foreignKey: "userId", as: "blogs" });
Blogs.belongsTo(User, { foreignKey: "userId", as: "authorInfo" });

// Blog ↔ Tag (Many-to-Many)
Blogs.belongsToMany(Tag, {
  through: "BlogTags",
  foreignKey: "blogId",
  otherKey: "tagId",
});
Tag.belongsToMany(Blogs, {
  through: "BlogTags",
  foreignKey: "tagId",
  otherKey: "blogId",
});

// Category → Question
category.hasMany(AssessmentQuestion, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
AssessmentQuestion.belongsTo(category, {
  foreignKey: "categoryId",
  as: "category",
});

// Question → Option
AssessmentQuestion.hasMany(AssessmentOptions, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});
AssessmentOptions.belongsTo(AssessmentQuestion, {
  foreignKey: "questionId",
});

// User → AssessmentSession
User.hasMany(AssessmentSession, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
AssessmentSession.belongsTo(User, {
  foreignKey: "userId",
});

// Session → Answer
AssessmentSession.hasMany(AssessmentSessionAns, {
  foreignKey: "sessionId",
  onDelete: "CASCADE",
});
AssessmentSessionAns.belongsTo(AssessmentSession, {
  foreignKey: "sessionId",
});

// Question → Answer
AssessmentQuestion.hasMany(AssessmentSessionAns, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});
AssessmentSessionAns.belongsTo(AssessmentQuestion, {
  foreignKey: "questionId",
});

// Option → Answer
AssessmentOptions.hasMany(AssessmentSessionAns, {
  foreignKey: "optionId",
  onDelete: "CASCADE",
});
AssessmentSessionAns.belongsTo(AssessmentOptions, {
  foreignKey: "optionId",
});

// Session → SessionQuestion
AssessmentSessionQuestion.belongsTo(AssessmentSession, {
  foreignKey: "sessionId",
});

// Question → SessionQuestion
AssessmentQuestion.hasMany(AssessmentSessionQuestion, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});
AssessmentSessionQuestion.belongsTo(AssessmentQuestion, {
  foreignKey: "questionId",
});
AssessmentSessionQuestion.belongsTo(AssessmentQuestion, {
  foreignKey: "questionId",
  as: "question",
});
AssessmentQuestion.hasMany(AssessmentOptions, {
  foreignKey: "questionId",
  as: "options",
});

// SessionQuestion → RESULT
AssessmentSessionAns.belongsTo(AssessmentQuestion, {
  foreignKey: "questionId",
  as: "question",
});
AssessmentSessionAns.belongsTo(AssessmentOptions, {
  foreignKey: "optionId",
  as: "option",
});

// One CareerDomain has many Modules
CareerDomain.hasMany(Module, { foreignKey: "careerDomainId" });
Module.belongsTo(CareerDomain, { foreignKey: "careerDomainId" });

// One Module has many Lessons
Module.hasMany(Lesson, { foreignKey: "moduleId" });
Lesson.belongsTo(Module, { foreignKey: "moduleId" });

export {
  Blogs,
  Tag,
  User,
  AssessmentQuestion,
  AssessmentOptions,
  AssessmentSession,
  AssessmentSessionAns,
  AssessmentSessionQuestion,
  category,
  categoryScoreGame,
  trainingSample,
  CareerDomain,
  Module,
  Lesson
};
