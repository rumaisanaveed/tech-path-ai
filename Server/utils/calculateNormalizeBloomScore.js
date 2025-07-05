import {
  AssessmentOptions,
  AssessmentQuestion,
  AssessmentSessionAns,
  category,
} from "../models/index.js";

{/*
  // Helper function for min-max normalization
const normalizeBloomScores = (bloomMap) => {
  const values = Object.values(bloomMap);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const normalized = {};
  for (const [level, score] of Object.entries(bloomMap)) {
    const norm = max === min ? 0 : (score - min) / (max - min);
    normalized[level] = Number(norm.toFixed(3));
  }
  return normalized;
}; */}

export const calculateNormalizedBloomScoresFromSession = async (sessionId) => {
  console.log("🧠 Calculating Bloom score summary for session:", sessionId);
  try {
    const answers = await AssessmentSessionAns.findAll({
      where: { sessionId },
      include: [
        {
          model: AssessmentQuestion,
          as: "question",
          attributes: ["bloomLevel", "bloomWeight", "categoryId"],
          include: [
            {
              model: category,
              as: "category",
              attributes: ["name"],
            },
          ],
        },
        {
          model: AssessmentOptions,
          as: "option",
          attributes: ["score"],
        },
      ],
    });

    const bloomMap = {};            // total by Bloom Level
    const categoryTotalMap = {};    // total by Category

    for (const answer of answers) {
      const question = answer.question;
      const option = answer.option;

      if (!question || !option) continue;

      const bloomLevel = question.bloomLevel;
      const bloomWeight = question.bloomWeight;
      const score = option.score;
      const weightedScore = Number((score * bloomWeight).toFixed(2));
      const categoryName = question.category?.name || "Unknown";

      // Sum weighted score by Bloom level
      if (!bloomMap[bloomLevel]) bloomMap[bloomLevel] = 0;
      bloomMap[bloomLevel] += weightedScore;

      // Sum weighted score by Category
      if (!categoryTotalMap[categoryName]) categoryTotalMap[categoryName] = 0;
      categoryTotalMap[categoryName] += weightedScore;
    }

    // Round results to 2 decimal places
    const bloomScores = Object.fromEntries(
      Object.entries(bloomMap).map(([key, val]) => [key, Number(val.toFixed(2))])
    );
    const categoryScores = Object.fromEntries(
      Object.entries(categoryTotalMap).map(([key, val]) => [key, Number(val.toFixed(2))])
    );

    // 🔁 Normalize Bloom scores (min-max)
    //const normalizedBloomScores = normalizeBloomScores(bloomScores); //later will make 

    return {
      sessionId,
      bloomScores,
      categoryScores, // for gamification
    };

  } catch (error) {
    console.error("❌ Error calculating Bloom scores:", error);
    throw error;
  }
};
