import express from 'express';
import { chatWithMentor , getChatHistory } from '../controllers/chats.controllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/' , protect, chatWithMentor);
router.get('/history' , protect , getChatHistory);

export default router;