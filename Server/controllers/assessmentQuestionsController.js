import { sequelize } from "../config/connectDB.js";
import {
  AssessmentOptions,
  AssessmentQuestion,
  AssessmentSession,
  AssessmentSessionAns,
  AssessmentSessionQuestion,
  category,
  categoryScoreGame,
  trainingSample,
} from "../models/index.js";
import { getCareerRecommendation } from "../openai/predictCareer.js";
import { calculateNormalizedBloomScoresFromSession } from "../utils/calculateNormalizeBloomScore.js";

// Submit Answer
const gamificationMessages = [
  "Brilliant! You’re a natural problem solver!",
  "Nice! You think logically and clearly.",
  "Amazing! That’s high-level thinking.",
  "Awesome! You’re mastering this skill.",
  "Great choice! You're a critical thinker!",
];

// Badge assignment logic
const getBadge = (score) => {
  if (score < 10) return "Bronze";
  if (score < 20) return "Silver";
  if (score < 30) return "Gold";
  return "Platinum";
};

// Create Assessment Session
export const createAssessmentSession = async (req, res) => {
  try {
    const userId = req.userId; // assuming verifyToken middleware adds this
    console.log("Creating Assessment Session for user:", userId);

    // Check for existing incomplete session
    const existingSession = await AssessmentSession.findOne({
      where: {
        userId,
        isCompleted: false,
      },
    });

    if (existingSession) {
      return res.status(400).json({
        message: "You already have an ongoing assessment session.",
        sessionId: existingSession.sessionId,
      });
    }

    // Create new session
    const session = await AssessmentSession.create({
      userId,
      isCompleted: false,
    });

    return res.status(201).json({
      message: "Assessment session created successfully",
      sessionId: session.sessionId,
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
  // console.log(
  //   "Generating questions for session:",
  //   sessionId,
  //   "and category:",
  //   categoryId
  // );

  const bloomLevels = [
    "Remember",
    "Understand",
    "Apply",
    "Analyze",
    "Evaluate",
    "Create",
  ];

  const t = await sequelize.transaction();
  try {
    // 🔒 Validate session
    const session = await AssessmentSession.findOne({
      where: { sessionId },
      transaction: t,
    });
    if (!session) {
      await t.rollback();
      return res.status(404).json({ message: "Session not found" });
    }

    // ✅ Check if category exists dynamically (no hardcoding)
    const categoryObj = await category.findOne({
      where: { id: categoryId },
      transaction: t,
    });
    if (!categoryObj) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "Invalid categoryId — not found in DB" });
    }

    // ❌ Check if this session already has questions for this category
    const alreadyExists = await AssessmentSessionQuestion.findOne({
      where: { sessionId, categoryId },
      transaction: t,
    });

    if (alreadyExists) {
      await t.rollback();
      return res.status(400).json({
        message:
          "Questions for this category have already been generated for this session.",
      });
    }

    // 🎯 Get one random question per Bloom level (in parallel)
    const questionPromises = bloomLevels.map((level) =>
      AssessmentQuestion.findOne({
        where: { categoryId, bloomLevel: level },
        order: sequelize.random(),
        attributes: ["id", "text", "bloomLevel", "categoryId"],
        transaction: t,
      })
    );
    const questions = (await Promise.all(questionPromises)).filter(Boolean);

    if (questions.length < bloomLevels.length) {
      await t.rollback();
      return res.status(400).json({
        message: `Not enough questions for all Bloom levels in this category. Found ${questions.length}/${bloomLevels.length}.`,
        missingLevels: bloomLevels.filter(
          (level) => !questions.find((q) => q.bloomLevel === level)
        ),
      });
    }

    // 💾 Store selected questions in AssessmentSessionQuestion
    const questionLinks = questions.map((q) => ({
      sessionId,
      questionId: q.id,
      categoryId: q.categoryId,
    }));

    await AssessmentSessionQuestion.bulkCreate(questionLinks, {
      transaction: t,
    });

    await t.commit();

    return res.status(201).json({
      message: "Questions assigned to session based on Bloom levels",
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        bloomLevel: q.bloomLevel,
        categoryId: q.categoryId,
      })),
    });
  } catch (error) {
    await t.rollback();
    console.error("Error in generating questions by category:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get Current Question from Assessment Session
export const getAssessmentSession = async (req, res) => {
  const { sessionId, categoryId } = req.params;

  if (!sessionId || !categoryId) {
    return res.status(400).json({ message: "Missing sessionId or categoryId" });
  }

  try {
    // Step 1: Validate session existence
    const session = await AssessmentSession.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Assessment session not found" });
    }

    // Step 2: Validate category existence
    const categoryObj = await category.findByPk(categoryId);
    if (!categoryObj) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Step 3: Find all questions for this session and category, including options
    const sessionQuestions = await AssessmentSessionQuestion.findAll({
      where: { sessionId, categoryId },
      include: [
        {
          model: AssessmentQuestion,
          as: "question",
          include: [
            {
              model: AssessmentOptions,
              as: "options",
              attributes: ["id", "optionText", "score"],
            },
          ],
          attributes: ["id", "text", "categoryId"],
        },
      ],
      order: [["id", "ASC"]],
    });

    if (!sessionQuestions.length) {
      return res
        .status(404)
        .json({ message: "No questions found for this session and category" });
    }

    // Step 4: Find answered questionIds for this session
    const answered = await AssessmentSessionAns.findAll({
      where: { sessionId },
      attributes: ["questionId", "optionId"],
    });
    const answeredMap = {};
    answered.forEach((ans) => {
      answeredMap[ans.questionId] = ans.optionId;
    });

    // Step 5: Format the data
    const formatted = sessionQuestions.map((sq) => {
      const question = sq.question;
      return {
        id: question.id,
        text: question.text,
        categoryId: question.categoryId,
        isAnswered: answeredMap.hasOwnProperty(question.id), // ✅ Boolean
        selectedOptionId: answeredMap[question.id] || null, // Optional, for pre-selection
        options: question.options.map((opt) => ({
          id: opt.id,
          optionText: opt.optionText,
        })),
      };
    });

    res.status(200).json({
      sessionId,
      categoryId,
      categoryName: categoryObj.name,
      questions: formatted,
    });
  } catch (error) {
    console.error("❌ Error in getAssessmentSession:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionId, optionId } = req.body;

    // 1️⃣ Validate session
    const session = await AssessmentSession.findByPk(sessionId);
    if (!session) return res.status(404).json({ error: "Invalid session ID" });

    if (session.isCompleted == true)
      return res
        .status(400)
        .json({ error: "This assessment session is already completed." });

    // 2️⃣ Validate question
    const question = await AssessmentQuestion.findByPk(questionId);
    if (!question)
      return res.status(404).json({ error: "Invalid question ID" });

    // 🔒 Ensure the question is part of this session
    const sessionQuestion = await AssessmentSessionQuestion.findOne({
      where: { sessionId, questionId },
    });

    if (!sessionQuestion) {
      return res.status(403).json({
        error: "This question does not belong to the current session.",
      });
    }

    // 3️⃣ Validate option & check score
    const option = await AssessmentOptions.findOne({
      where: { id: optionId, questionId },
    });
    if (!option)
      return res
        .status(404)
        .json({ error: "Invalid option or it doesn't belong to the question" });

    // 4️⃣ Prevent duplicate answers for the same question in this session
    const alreadyAnswered = await AssessmentSessionAns.findOne({
      where: { sessionId, questionId },
    });
    if (alreadyAnswered) {
      return res.status(409).json({
        error: "You have already answered this question in this session.",
        answer: alreadyAnswered,
      });
    }

    // 5️⃣ Save answer
    const answer = await AssessmentSessionAns.create({
      sessionId,
      questionId,
      optionId,
    });

    // 6️⃣ Gamification logic
    let gamificationMessage = null;
    if (option.score === 4) {
      const randomIndex = Math.floor(
        Math.random() * gamificationMessages.length
      );
      gamificationMessage = gamificationMessages[randomIndex];
    }

    // 7️⃣ Progress tracking
    const totalQuestions = await AssessmentSessionQuestion.count({
      where: { sessionId },
    });
    const answeredCount = await AssessmentSessionAns.count({
      where: { sessionId },
    });

    return res.status(201).json({
      message: "Answer submitted successfully.",
      answer: {
        id: answer.id,
        sessionId: answer.sessionId,
        questionId: answer.questionId,
        optionId: answer.optionId,
        optionText: option.optionText,
        score: option.score,
      },
      gamificationMessage,
      progress: {
        answered: answeredCount,
        total: totalQuestions,
      },
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const predictionResult = async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.userId;

  try {
    // 🔒 Step 1: Check if session is already completed
    const session = await AssessmentSession.findOne({
      where: { sessionId },
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.isCompleted == true) {
      return res
        .status(400)
        .json({ message: "Prediction already completed for this session." });
    }

    // ✅ Step 2: Fetch answers
    const answers = await AssessmentSessionAns.findAll({
      where: { sessionId },
      include: [
        {
          model: AssessmentQuestion,
          as: "question",
          attributes: ["id", "text", "bloomLevel", "bloomWeight", "categoryId"],
          include: [{ model: category, as: "category", attributes: ["name"] }],
        },
        {
          model: AssessmentOptions,
          as: "option",
          attributes: ["id", "optionText", "score"],
        },
      ],
    });

    const formatted = answers.map((ans) => ({
      question: ans.question?.text || "",
      category: ans.question?.category?.name || "",
      selectedOption: ans.option?.optionText || "N/A",
    }));

    // 📊 Step 3: Get Bloom + Category scores
    const { bloomScores, categoryScores } =
      await calculateNormalizedBloomScoresFromSession(sessionId);

    // 🤖 Step 4: Get AI Career Prediction
    const prediction = await getCareerRecommendation(formatted);

    // 🧠 Step 5: Save Training Data
    await trainingSample.create({
      sessionId,
      remember: bloomScores.Remember || 0,
      understand: bloomScores.Understand || 0,
      apply: bloomScores.Apply || 0,
      analyze: bloomScores.Analyze || 0,
      evaluate: bloomScores.Evaluate || 0,
      create_: bloomScores.Create || 0,
      recommendedCareer1: prediction.recommendations?.[0]?.career || "N/A",
      recommendedCareer2: prediction.recommendations?.[1]?.career || "N/A",
      recommendedCareer3: prediction.recommendations?.[2]?.career || "N/A",
      reason1: prediction.recommendations?.[0]?.reason || "",
      reason2: prediction.recommendations?.[1]?.reason || "",
      reason3: prediction.recommendations?.[2]?.reason || "",
    });

    // 🏅 Step 6: Save Category Scores + Badges
    const badgeData = Object.entries(categoryScores).map(
      ([categoryName, totalScore]) => ({
        sessionId,
        userId,
        categoryName,
        totalScore,
        badge: getBadge(totalScore),
      })
    );

    await categoryScoreGame.bulkCreate(badgeData);

    // ✅ Step 7: Mark Session as Completed
    await AssessmentSession.update(
      { isCompleted: 1 },
      { where: { sessionId } }
    );

    // 📦 Step 8: Send response
    return res.status(200).json({
      sessionId,
      results: formatted,
      prediction,
      score: {
        bloomScores,
        categoryScores,
      },
    });
  } catch (error) {
    console.error("❌ Error retrieving prediction result:", error);
    return res.status(500).json({
      message: "Error retrieving prediction result",
      error: error.message,
    });
  }
};

export const currentPredictionResult = async (req, res) => {
  const { sessionId } = req.params;

  console.log("sessionId", sessionId);

  try {
    const session = await AssessmentSession.findOne({ where: { sessionId } });

    console.log("session", session);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.isCompleted !== true) {
      return res
        .status(400)
        .json({ message: "Prediction is not completed for this session." });
    }

    const prediction = await trainingSample.findOne({ where: { sessionId } });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction result not found." });
    }

    const categoryBadges = await categoryScoreGame.findAll({
      where: { sessionId },
      attributes: ["categoryName", "totalScore", "badge"],
    });

    return res.status(200).json({
      sessionId,
      prediction: {
        recommendedCareers: [
          {
            career: prediction.recommendedCareer1,
            reason: prediction.reason1,
          },
          {
            career: prediction.recommendedCareer2,
            reason: prediction.reason2,
          },
          {
            career: prediction.recommendedCareer3,
            reason: prediction.reason3,
          },
        ],

        badges: categoryBadges,
      },
    });
  } catch (error) {
    console.error("❌ Error retrieving current prediction result:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const pastPredictionResult = async (req, res) => {
  const userId = req.userId;

  try {
    // Step 1: Get all completed sessions
    const sessions = await AssessmentSession.findAll({
      where: { userId, isCompleted: true },
      attributes: ["sessionId", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    const sessionIds = sessions.map((s) => s.sessionId);

    // Step 2: Fetch predictions
    const predictions = await trainingSample.findAll({
      where: { sessionId: sessionIds },
      attributes: [
        "sessionId",
        "recommendedCareer1",
        "recommendedCareer2",
        "recommendedCareer3",
      ],
    });

    // Step 3: Fetch category scores + badges for each session
    const badges = await categoryScoreGame.findAll({
      where: { sessionId: sessionIds },
      attributes: ["sessionId", "categoryName", "totalScore", "badge"],
    });

    // Step 4: Group badges by session
    const badgeMap = {};
    badges.forEach((b) => {
      if (!badgeMap[b.sessionId]) badgeMap[b.sessionId] = [];
      badgeMap[b.sessionId].push({
        categoryName: b.categoryName,
        totalScore: b.totalScore,
        badge: b.badge,
      });
    });

    // Step 5: Merge predictions with their respective badges
    const result = predictions.map((p) => ({
      sessionId: p.sessionId,
      recommendedCareers: [
        p.recommendedCareer1,
        p.recommendedCareer2,
        p.recommendedCareer3,
      ],
      badges: badgeMap[p.sessionId] || [],
      createdAt: sessions.find((s) => s.sessionId === p.sessionId)?.createdAt,
    }));

    return res.status(200).json({ history: result });
  } catch (error) {
    console.error("❌ Error retrieving past prediction result:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
