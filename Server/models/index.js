import category from "./assessment/assessmentCategoryModel.js";
import AssessmentQuestion from "./assessment/assessmentQuestionsModel.js";
import AssessmentOptions from "./assessment/assessmentOptionsModel.js";
import AssessmentSession from "./assessment/assessmentSessionModel.js";
import AssessmentSessionAns from "./assessment/assessmentSessionAns.js";
import AssessmentSessionQuestion from "./assessment/assessmentSessionQuestion.js";

import User from "./userModel.js";
import categoryScoreGame from "./gamification/categoryScore.js";
import trainingSample from "./trainingSample.js";
import CareerDomain from "./skilltracking/careerDomain.js";
import Module from "./skilltracking/module.js";

// Keep this import since it’s part of CareerDomain ↔ Module mapping
import DomainModuleMapping from "./skilltracking/domainModuleMapping.js";
import ModuleType from "./skilltracking/modulesType.js";
import UserCareerDomain from "./skilltracking/userCareerDomain.js";
import UserModuleMapping from "./userModuleMapping.js";

// Mascot models
import SkillEvalResponse from "./mascot/SkillEvalResponse.js";
import SkillEvalQuestion from "./mascot/skillEvalQuestion.js";
import skillEvalType from "./mascot/skillEvalType.js";
import skillEvalCategory from "./mascot/skillEvalCategory.js";

// Lesson-related models
import Lesson from "./lessons/lessonModel.js";
import LessonExample from "./lessons/lessonExample.js";
import LessonLearningPoint from "./lessons/lessonLearningPoint.js";
import LessonResource from "./lessons/lessonResources.js";
import UserLessonProgress from "./skilltracking/userLessonProgress.js";
import XpWeight from "./skilltracking/xpWeight.js";
import QuizSession from "./quiz/quizSession.js";

//Blogs models
import blog_tag_mapping from "./blog/blogTagMapping.js";
import blogs from "./blog/blogModel.js";
import tag from "./blog/tagModel.js";

// 🔁 Define relationships here

// User → Blog (One-to-Many)
User.hasMany(blogs, { foreignKey: "user_id", as: "blogs" });
blogs.belongsTo(User, { foreignKey: "user_id", as: "authorInfo" });

// Blogs ↔ Tag (Many-to-Many)
blogs.belongsToMany(tag, { through: blog_tag_mapping, foreignKey: "blog_id" });
tag.belongsToMany(blogs, { through: blog_tag_mapping, foreignKey: "tag_id" });


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

Module.belongsTo(ModuleType, { foreignKey: "typeId", as: "type" });
ModuleType.hasMany(Module, { foreignKey: "typeId", as: "modules" });

// User ↔ CareerDomain (Many-to-Many through UserCareerDomain)
User.belongsToMany(CareerDomain, {
  through: UserCareerDomain,
  foreignKey: "userId",
  otherKey: "careerDomainId",
  as: "enrolledDomains", // alias for user.getEnrolledDomains()
});

CareerDomain.belongsToMany(User, {
  through: UserCareerDomain,
  foreignKey: "careerDomainId",
  otherKey: "userId",
  as: "enrolledUsers", // alias for careerDomain.getEnrolledUsers()
});

// Optionally, if you want direct associations on the junction model:
UserCareerDomain.belongsTo(User, { foreignKey: "userId", as: "user" });
UserCareerDomain.belongsTo(CareerDomain, {
  foreignKey: "careerDomainId",
  as: "careerDomain",
});

User.belongsToMany(Module, {
  through: UserModuleMapping,
  foreignKey: "userId",
  as: "enrolledModules",
});

Module.belongsToMany(User, {
  through: UserModuleMapping,
  foreignKey: "moduleId",
  as: "enrolledUsers",
});

//MASCOTS
// --------------------
// CATEGORY ↔ QUESTION
// --------------------
skillEvalCategory.hasMany(SkillEvalQuestion, {
  foreignKey: "categoryId",
  as: "questions",
});
SkillEvalQuestion.belongsTo(skillEvalCategory, {
  foreignKey: "categoryId",
  as: "category",
});

// --------------------
// TYPE ↔ QUESTION
// --------------------
skillEvalType.hasMany(SkillEvalQuestion, {
  foreignKey: "typeId",
  as: "questions",
});
SkillEvalQuestion.belongsTo(skillEvalType, {
  foreignKey: "typeId",
  as: "type",
});

// --------------------
// DOMAIN ↔ QUESTION
// --------------------
CareerDomain.hasMany(SkillEvalQuestion, {
  foreignKey: "careerDomainId",
  as: "questions",
});
SkillEvalQuestion.belongsTo(CareerDomain, {
  foreignKey: "careerDomainId",
  as: "domain",
});

// --------------------
// QUESTION ↔ RESPONSE
// --------------------
SkillEvalQuestion.hasMany(SkillEvalResponse, {
  foreignKey: "questionId",
  as: "responses",
});
SkillEvalResponse.belongsTo(SkillEvalQuestion, {
  foreignKey: "questionId",
  as: "question",
});

// --------------------
// USER ↔ RESPONSE
// --------------------
User.hasMany(SkillEvalResponse, {
  foreignKey: "userId",
  as: "skillResponses",
});
SkillEvalResponse.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// --------------------
// DOMAIN ↔ RESPONSE (optional)
// --------------------
CareerDomain.hasMany(SkillEvalResponse, {
  foreignKey: "careerDomainId",
  as: "responses",
});
SkillEvalResponse.belongsTo(CareerDomain, {
  foreignKey: "careerDomainId",
  as: "domain",
});


Module.belongsTo(XpWeight, { foreignKey: "xpWeightId", as: "xpWeight" });
XpWeight.hasMany(Module, { foreignKey: "xpWeightId", as: "modules" });


// --------------------
// REPONSIBEL FOR LESSONS
// --------------------
// Lesson → Examples
Module.hasMany(Lesson, { foreignKey: "moduleId", as: "lessons" });

Lesson.hasMany(LessonExample, {
  foreignKey: "lessonId",
  as: "examples",       // alias for eager loading
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
LessonExample.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

// Lesson → Learning Points
Lesson.hasMany(LessonLearningPoint, {
  foreignKey: "lessonId",
  as: "learningPoints",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
LessonLearningPoint.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

// Lesson → Resources
Lesson.hasMany(LessonResource, {
  foreignKey: "lessonId",
  as: "resources",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
LessonResource.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

// 👤 User ↔ Lesson Progress
User.hasMany(UserLessonProgress, { foreignKey: "userId", as: "lessonProgress" });
UserLessonProgress.belongsTo(User, { foreignKey: "userId", as: "user" });

// 📘 Module ↔ Lesson Progress
Module.hasMany(UserLessonProgress, { foreignKey: "moduleId", as: "moduleProgress" });
UserLessonProgress.belongsTo(Module, { foreignKey: "moduleId", as: "module" });

// 📗 Lesson ↔ Lesson Progress
Lesson.hasMany(UserLessonProgress, { foreignKey: "lessonId", as: "userProgress" });
UserLessonProgress.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

export {
  blogs,
  tag,
  blog_tag_mapping,
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
  ModuleType,
  DomainModuleMapping,
  UserCareerDomain,
  UserModuleMapping,
  SkillEvalResponse,
  SkillEvalQuestion,
  skillEvalType,
  skillEvalCategory,
  Lesson,
  XpWeight,
  LessonExample,
  LessonLearningPoint,
  LessonResource,
  UserLessonProgress,
  QuizSession
};
