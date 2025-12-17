
import dotenv from "dotenv";
// Load environment variables immediately before importing application code
dotenv.config({ path: "./.env" }); // 👈 FORCE path

// console.log("ENV CHECK:", process.env.OPENAI_API_KEY);

// Import app dynamically after dotenv has run so env vars are available to modules
const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
