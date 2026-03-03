import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chats.routes.js";
import habitRoutes from "./routes/habit.routes.js"; 
import authRoutes from "./routes/auth.routes.js";  
import reflectionRoutes from './routes/reflection.routes.js'
import { errorHandler } from "./middleware/error.middleware.js"; 


const app = express();

// server utlities
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(errorHandler);

// routes
app.use("/api/chat", chatRoutes);
app.use("/api/habits", habitRoutes); 
app.use("/api/auth" , authRoutes);
app.use("/api/reflection", reflectionRoutes);

app.get("/", (req, res) => {
  res.send("AI mentor backend is running");
});

export default app;
