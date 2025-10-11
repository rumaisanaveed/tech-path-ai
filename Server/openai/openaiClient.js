import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

console.log("process.env.OPENAI_API_KEY", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

export default genAI || openai;
