import openai from "./openaiClient.js";
import genAI from "./openaiClient.js";

export const getCareerRecommendation = async (userData) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
   - Data Analyst
   - ML Engineer
   - Cloud Engineer
   - DevOps Engineer
   - UI/UX Designer
   - Game Developer

✅ Respond **only** in **valid JSON format**, no explanations, no markdown, no extra text.
The structure should be:
{
  "recommendations": [
    { "career": "Career Name", "reason": "Short reason..." },
    ...
  ]
}

Data:
${JSON.stringify(userData, null, 2)}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let content = response.text().trim();

  // 🧹 Clean up Gemini response (remove ```json or ``` if present)
  if (content.startsWith("```")) {
    content = content.replace(/^```json\s*|^```\s*|```$/g, "").trim();
  }

  // 🔁 Retry-safe JSON parsing
  let parsed = null;
  let attempts = 0;

  while (attempts < 3 && !parsed) {
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      attempts++;
      console.warn(`❌ Attempt ${attempts} - Failed to parse Gemini JSON.`);
      if (attempts === 3) {
        console.error("❌ Final Gemini output:\n", content);
        throw new Error("Invalid JSON format from Gemini");
      }
    }
  }

  return parsed;
};


export const predictModules = async (modules, userResponses, careerDomainName) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are "Piddu" — an intelligent learning assistant that helps assign modules to users.

🎓 Career Path: ${careerDomainName}

Your task:
- The user is enrolled in the above career path.
- You are given a list of available modules (each has an id + title).
- You are also given user responses about their experience, confidence, interests, and availability.
- Based on those, pick **exactly 15 modules** that best match the user's current level and interests.
- Focus on:
  - Beginner if user says "new" or "just starting".
  - Intermediate if user says "some experience" or "comfortable".
  - Advanced if user says "experienced" or "expert".
- Prioritize progressive learning order (basics first, then advanced).
- You must return only valid module **IDs** from the provided list.

🧾 MODULES:
${JSON.stringify(modules, null, 2)}

💬 USER RESPONSES:
${JSON.stringify(userResponses, null, 2)}

🎯 REQUIRED OUTPUT FORMAT:
Return ONLY this JSON:
{
  "selectedModules": [list of 15 module IDs in learning order]
}
`;

    // 🧠 Generate response
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("🧠 Raw Gemini Output:\n", text);

    // 🧩 Parse safely
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.warn("⚠️ Gemini output not valid JSON, attempting recovery...");
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from Gemini output.");
      }
    }

    const selectedIds = parsed?.selectedModules || [];
    console.log("✅ Selected Module IDs:", selectedIds);

    return selectedIds; // 🔥 Only IDs, no titles
  } catch (error) {
    console.error("❌ Error in predictModules:", error);
    return [];
  }
};





