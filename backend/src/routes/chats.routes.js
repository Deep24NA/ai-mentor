import express from 'express';
import { chatWithMentor } from '../controllers/chats.controllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/' , protect, chatWithMentor);

export default router