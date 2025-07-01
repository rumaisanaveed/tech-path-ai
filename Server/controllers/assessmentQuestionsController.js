import AssessmentOption from "../models/AssessmentOptionModel.js";
import AssessmentQuestion from "../models/assestmentQuestionModel.js";
import AssessmentSession from "../models/assestmentSession.js";
import { getSubcategoriesByCategory } from "../utils/getSubcategoriesFromDB.js";

// Helper to format a question with options
const formatQuestion = (question) => ({
  id: question.id,
  questionText: question.questionText,
  bloomLevel: question.bloomLevel,
  bloomWeight: question.bloomWeight,
  subcategory: question.subcategory,
  options:
    question.options?.map((opt) => ({
      id: opt.id,
      optionText: opt.optionText,
      score: opt.score,
    })) || [],
});

// Create Assessment Session
export const createAssessmentSession = async (req, res) => {
  console.log("Creating Assessment Session...");
};

// Get Current Question from Assessment Session
export const getAssessmentSession = async (req, res) => {
  console.log("Getting Assessment Session...");
};

// Submit Answer
export const submitAnswer = async (req, res) => {
  console.log("Submitting Answer...");
};
