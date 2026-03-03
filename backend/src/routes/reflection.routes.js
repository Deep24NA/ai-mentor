import express from 'express';
import { generateReflection , getReflectionHistory , getWeeklySummary } from '../controllers/reflection.controllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/generate' , protect , generateReflection);
router.get('/history' , protect , getReflectionHistory); 
router.get('/weekly-summary', protect , getWeeklySummary);

export default router;

