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
import QuizQuestion from "./skilltracking/quizQuestion.js";
import UserModuleProgress from "./skilltracking/userModuleProgress.js";
import UserLessonProgress from "./skilltracking/userLessonProgress.js";
import UserQuizAnswer from "./skilltracking/userQuizAnswer.js";
import UserCareerDomain from "./skilltracking/userCareerDomain.js";

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

// import DomainModuleMapping at the top with other models
import DomainModuleMapping from "./skilltracking/domainModuleMapping.js";

// direct relations for DomainModuleMapping
DomainModuleMapping.belongsTo(CareerDomain, {
  foreignKey: "careerDomainId",
  as: "domain",
});
DomainModuleMapping.belongsTo(Module, { foreignKey: "moduleId", as: "module" });
CareerDomain.hasMany(DomainModuleMapping, {
  foreignKey: "careerDomainId",
  as: "domainModuleMappings",
});
Module.hasMany(DomainModuleMapping, {
  foreignKey: "moduleId",
  as: "domainModuleMappings",
});

// One Module has many Lessons
Module.hasMany(Lesson, { foreignKey: "moduleId" });
Lesson.belongsTo(Module, { foreignKey: "moduleId" });

// One Lesson has many QuizQuestions
Lesson.hasMany(QuizQuestion, { foreignKey: "lessonId", onDelete: "CASCADE" });

// Each QuizQuestion belongs to a Lesson
QuizQuestion.belongsTo(Lesson, { foreignKey: "lessonId" });

// User → UserModuleProgress (One-to-Many)
User.hasMany(UserModuleProgress, { foreignKey: "userId", onDelete: "CASCADE" });
UserModuleProgress.belongsTo(User, { foreignKey: "userId" });

// Module → UserModuleProgress (One-to-Many)
Module.hasMany(UserModuleProgress, {
  foreignKey: "moduleId",
  onDelete: "CASCADE",
});
UserModuleProgress.belongsTo(Module, { foreignKey: "moduleId" });

// User → UserLessonProgress (One-to-Many)
User.hasMany(UserLessonProgress, { foreignKey: "userId", onDelete: "CASCADE" });
UserLessonProgress.belongsTo(User, { foreignKey: "userId" });

// Lesson → UserLessonProgress (One-to-Many)
Lesson.hasMany(UserLessonProgress, {
  foreignKey: "lessonId",
  onDelete: "CASCADE",
});
UserLessonProgress.belongsTo(Lesson, { foreignKey: "lessonId" });

// User → UserQuizAnswer (One-to-Many)
User.hasMany(UserQuizAnswer, { foreignKey: "userId", onDelete: "CASCADE" });
UserQuizAnswer.belongsTo(User, { foreignKey: "userId" });

// Lesson → UserQuizAnswer (One-to-Many)
Lesson.hasMany(UserQuizAnswer, { foreignKey: "lessonId", onDelete: "CASCADE" });
UserQuizAnswer.belongsTo(Lesson, { foreignKey: "lessonId" });

// QuizQuestion → UserQuizAnswer (One-to-Many)
QuizQuestion.hasMany(UserQuizAnswer, {
  foreignKey: "quizQuestionId",
  onDelete: "CASCADE",
});
UserQuizAnswer.belongsTo(QuizQuestion, { foreignKey: "quizQuestionId" });

// User → UserCareerDomain (One-to-One)
User.hasOne(UserCareerDomain, { foreignKey: "userId", onDelete: "CASCADE" });
UserCareerDomain.belongsTo(User, { foreignKey: "userId" });

// CareerDomain → UserCareerDomain (One-to-Many)
CareerDomain.hasMany(UserCareerDomain, {
  foreignKey: "careerDomainId",
  onDelete: "CASCADE",
});
UserCareerDomain.belongsTo(CareerDomain, { foreignKey: "careerDomainId" });

// CareerDomain ↔ Module (Many-to-Many through DomainModuleMapping)
CareerDomain.belongsToMany(Module, {
  through: DomainModuleMapping,
  foreignKey: "careerDomainId",
  otherKey: "moduleId",
  as: "modules",
});

Module.belongsToMany(CareerDomain, {
  through: DomainModuleMapping,
  foreignKey: "moduleId",
  otherKey: "careerDomainId",
  as: "domains",
});


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
  Lesson,
  QuizQuestion,
  UserModuleProgress,
  UserLessonProgress,
  UserCareerDomain,
  UserQuizAnswer,
  DomainModuleMapping
};
