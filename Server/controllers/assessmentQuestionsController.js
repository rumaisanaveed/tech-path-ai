import AssessmentQuestion from "../models/assestmentQuestionModel.js";
import AssessmentSession from "../models/assestmentSession.js";

export const createAssessmentSession = async (req, res) => {
  const { category, subcategory } = req.body;
  const userId = req.userId;

  try {
    // 🔍 Check for unfinished session
    const existingSession = await AssessmentSession.findOne({
      where: {
        userId,
        category,
        subcategory,
        isCompleted: false,
      },
    });

    if (existingSession) {
      return res.status(400).json({
        message: "You already have an active session for this category and subcategory.",
        sessionId: existingSession.sessionId,
      });
    }

    // 🔄 Fetch 8 random question IDs
    const questions = await AssessmentQuestion.findAll({
      where: { category, subcategory },
      attributes: ["id"],
    });


    if (questions.length < 8) {
      return res
        .status(400)
        .json({ message: "Not enough questions available." });
    }

    const selected = questions.sort(() => 0.5 - Math.random()).slice(0, 8);
    const questionIds = selected.map((q) => q.id);

    // ✅ Create new session
    const session = await AssessmentSession.create({
      userId,
      category,
      subcategory,
      questionIds,
    });

    res.status(201).json({ sessionId: session.sessionId });
  } catch (err) {
    console.error("Create Session Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAssessmentSession = async (req, res) => {
  const { sessionId } = req.params;
  console.log(sessionId);

  try {
    const session = await AssessmentSession.findByPk(sessionId);

    console.log(session);

    if (!session) return res.status(404).json({ message: "Session not found" });

    const questionId = session.questionIds[session.currentIndex];

    const question = await AssessmentQuestion.findByPk(questionId);

    if (!question)
      return res.status(404).json({ message: "Question not found" });

    res.json({
      sessionId: session.sessionId,
      question,
      currentIndex: session.currentIndex,
      total: session.questionIds.length,
      completed: session.completed,
    });
  } catch (err) {
    console.error("Get Session Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const submitAnswer = async (req, res) => {
  const { sessionId } = req.params;
  const { selectedOptionIndex } = req.body;

  try {
    const session = await AssessmentSession.findByPk(sessionId);

    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.completed)
      return res.status(400).json({ message: "Session already completed" });

    const currentQid = session.questionIds[session.currentIndex];

    const answers = { ...session.answers, [currentQid]: selectedOptionIndex };

    let updatedFields = {
      answers,
      currentIndex: session.currentIndex + 1,
    };

    if (updatedFields.currentIndex >= session.questionIds.length) {
      updatedFields.completed = true;
    }

    await session.update(updatedFields);

    res.json({
      message: "Answer recorded",
      completed: updatedFields.completed,
    });
  } catch (err) {
    console.error("Submit Answer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
