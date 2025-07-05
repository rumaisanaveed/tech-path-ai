import openai from "./openaiClient.js";

export const getCareerRecommendation = async (userData) => {
  const prompt = `
You are a career guidance AI of software and computer science field.

The user answered several questions in three categories:
- Cognitive and Analytical Thinking
- Creative and Adaptive Thinking
- Self-Awareness and Career Preference

Each answer reflects their thinking style and preferences.

Task:
1. Identify their strengths.
2. Recommend 3 suitable software-related careers from this list:
   - Frontend Developer
   - Backend Developer
   - Full Stack Developer
   - Data Scientist
   - Data Analyst
   - ML Engineer
   - Cloud Engineer
   - DevOps Engineer
   - Cybersecurity Engineer
   - QA Engineer
   - UI/UX Designer
   - Game Developer
   - Product Manager
   - Technical Writer

✅ Respond **only** in **valid JSON format**, no explanations, no markdown, no extra text.
The structure should be:
{
  "recommendations": [
    { "career": "Career Name", "reason": "Short reason..." },
    ...
  ]
}

Data:
${JSON.stringify(userData, null, 0)}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a career counselor AI assistant." },
      { role: "user", content: prompt },
    ],
  });

  // Parse JSON string from GPT safely
  try {
    let content = response.choices[0].message.content;

    // 🔧 Strip markdown if wrapped in ```json ``` or ```
    content = content.trim().replace(/^```json\s*|^```\s*|```$/g, "");

    // 🛡️ Safe parse
    try {
      return JSON.parse(content);
    } catch (err) {
      console.error("❌ Error parsing GPT response JSON:", err.message);
      throw new Error("Invalid JSON format from GPT");
    }
  } catch (err) {
    console.error("❌ Error parsing GPT response JSON:", err.message);
    throw new Error("Invalid JSON format from GPT");
  }
};
