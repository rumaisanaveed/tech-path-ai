import genAI from "./openaiClient.js";

export const getQuestionQuiz = async (quizData) => {
  console.log("Generating quiz questions for lessons:", quizData);

  if (!quizData?.lessons?.length) return [];

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt =
    `You are an expert quiz generator AI specializing in creating quizzes for assessing skills in software and computer science fields. 
Generate at least 10 questions (with 4 options each, without revealing the answers) from the following lesson titles:\n\n` +
    quizData.lessons
      .map((lesson, index) => `${index + 1}. ${lesson.title}`)
      .join("\n") +
    `

Additionally, add 3 extra questions that are the hardest possible questions related to these lessons. These should challenge the user’s knowledge at a higher level. Make sure they are randomly different from the first 4 questions and all are scenario based.

Format the output exactly like this:

Question 1: <question text>
A) <option A>
B) <option B>
C) <option C>
D) <option D>

Question 2: <question text>
A) <option A>
B) <option B>
C) <option C>
D) <option D>

...

Question 8: <hardest question text>
A) <option A>
B) <option B>
C) <option C>
D) <option D>

Do not reveal the correct answers. Ensure all 10 questions are unique and relevant to the lessons.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const outputText = response.text();

    console.log("Quiz questions generated:", outputText);

    return outputText;
  } catch (err) {
    console.error("Error generating quiz questions:", err);
    console.error("Full error:", JSON.stringify(err, null, 2));
    return [];
  }
};
