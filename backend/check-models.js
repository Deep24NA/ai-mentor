import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ Error: GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

// We use the raw REST API because the SDK hides the list method sometimes
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
  try {
    console.log("🔍 Checking available models...");
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API Error:", data.error.message);
      return;
    }

    console.log("\n✅ AVAILABLE MODELS FOR YOUR KEY:");
    const geminiModels = data.models
      .filter(m => m.name.includes("gemini"))
      .map(m => m.name.replace("models/", ""));
      
    console.log(geminiModels.join("\n"));

  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

listModels();