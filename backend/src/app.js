import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chats.routes.js";
import habitRoutes from "./routes/habit.routes.js"; 
import authRoutes from "./routes/auth.routes.js";    

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/api/chat", chatRoutes);
app.use("/api/habits", habitRoutes); 
app.use("/api/auth" , authRoutes);

app.get("/", (req, res) => {
  res.send("AI mentor backend is running");
});

export default app;
