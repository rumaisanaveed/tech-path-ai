import { sequelize } from "../config/connectDB.js";
import {
  AssessmentOptions,
  AssessmentQuestion,
  AssessmentSession,
  AssessmentSessionQuestion,
} from "../models/index.js";

// Create Assessment Session
export const createAssessmentSession = async (req, res) => {
  try {
    const userId = req.userId; // assuming verifyToken middleware adds this
    console.log("Creating Assessment Session for user:", userId);

    // Create new session
    const session = await AssessmentSession.create({
      userId,
      isCompleted: false, // default anyway, but explicit
    });

    return res.status(201).json({
      message: "Assessment session created successfully",
      sessionId: session.sessionId, // UUID
    });
  } catch (error) {
    console.error("Error creating assessment session:", error);
    return res.status(500).json({
      message: "Failed to create assessment session",
      error: error.message,
    });
  }
};

export const generateQuestionsByCategory = async (req, res) => {
  const { sessionId, categoryId } = req.params;
  console.log(
    "Generating questions for session:",
    sessionId,
    "and category:",
    categoryId
  );

  const bloomLevels = [
    "Remember",
    "Understand",
    "Apply",
    "Analyze",
    "Evaluate",
    "Create",
  ];

  try {
    // Validate session
    const session = await AssessmentSession.findOne({ where: { sessionId } });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Validate category
    const categoryExists = await AssessmentQuestion.findOne({
      where: { categoryId },
    });
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }


    // Fetch 1 random question per Bloom level
    const questions = [];
    for (const level of bloomLevels) {
      const question = await AssessmentQuestion.findOne({
        where: { categoryId, bloomLevel: level },
        order: sequelize.random(),
      });

      if (question) {
        questions.push(question);
      }
    }

    if (questions.length < 6) {
      return res.status(400).json({
        message: "Not enough questions for all Bloom levels in this category",
      });
    }

    // Store in AssessmentSessionQuestion
    const questionLinks = questions.map((q) => ({
      sessionId,
      questionId: q.id,
      categoryId: q.categoryId,
    }));

    await AssessmentSessionQuestion.bulkCreate(questionLinks);

    return res.status(201).json({
      message: "Questions assigned to session based on Bloom levels",
      questions,
    });
  } catch (error) {
    console.error("Error in Bloom-level question generation:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Current Question from Assessment Session
export const getAssessmentSession = async (req, res) => {
  const { sessionId, categoryId } = req.params;

  try {
    // Step 1: Find all questionIds in session for that category
    const sessionQuestions = await AssessmentSessionQuestion.findAll({
      where: { sessionId },
      include: {
        model: AssessmentQuestion,
        as: "question",
        where: { categoryId },
        include: {
          model: AssessmentOptions,
          as: "options",
        },
      },
    });

    // Step 2: Format the data
    const formatted = sessionQuestions.map((sq) => {
      const question = sq.question;
      return {
        id: question.id,
        text: question.text,
        bloomLevel: question.bloomLevel,
        bloomWeight: question.bloomWeight,
        options: question.options,
      };
    });

    res.status(200).json({ questions: formatted });
  } catch (error) {
    console.error("❌ Error in getStoredQuestionsByCategory:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Submit Answer
export const submitAnswer = async (req, res) => {
  console.log("Submitting Answer...");
};
