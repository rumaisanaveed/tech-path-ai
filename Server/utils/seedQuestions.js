import { sequelize } from "../config/connectDB.js";
import {AssessmentQuestion, AssessmentOptions} from "../models/index.js";
import questionsData from "../data/management_planning_questions_part1.json" with { type: "json" };
import { seedCareerDomains } from "./SeedData/careerDomainSeed.js";
import { seedModules } from "./SeedData/moduleSeed.js";
import { seedLessons } from "./SeedData/lessonSeed.js";

export const insertQuestions = async () => {
 try {
  {/*
    for (const question of questionsData) {
      // Insert question
      const createdQuestion = await AssessmentQuestion.create({
        text: question.questionText,
        bloomLevel: question.bloomLevel,
        bloomWeight: question.bloomWeight,
        categoryId: question.categoryId,
      });

      // Prepare options with questionId
      const optionsToInsert = question.options.map((opt) => ({
        optionText: opt.text,
        score: opt.score,
        questionId: createdQuestion.id,
      }));

      // Bulk insert options
      await AssessmentOptions.bulkCreate(optionsToInsert);
    }

    console.log("✅ All questions and options inserted successfully.");*/}
    // await seedCareerDomains();
    // await seedModules();
    // await seedLessons();


  } catch (error) {
    console.error("❌ Failed to insert questions:", error.message);
  }
};

