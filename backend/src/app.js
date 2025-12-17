import express from 'express'
import cors from 'cors'
import chatRoutes from './routes/chats.routes.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat" , chatRoutes)

app.get("/" , (req , res) =>{
    res.send("AI mentor is backend is running");
});

export default app
