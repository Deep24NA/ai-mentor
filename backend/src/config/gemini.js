// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const apiKey = process.env.GEMINI_API_KEY;

// if (!apiKey) {
//   console.error("GEMINI_API_KEY is missing in .env file");
//   process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(apiKey);

// // Using the exact name from your list
// export const model = genAI.getGenerativeModel({ 
//   model: "gemini-2.5-flash" 
// });

import dotenv from "dotenv";
dotenv.config();

export const GEMINI_CONFIG = {
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash", // You confirmed you have this!
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models"
};