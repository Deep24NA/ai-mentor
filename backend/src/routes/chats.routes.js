import express from 'express'
import { chatWithMentor } from '../controllers/chats.controllers.js'

const router = express.Router()

router.post('/' , chatWithMentor);

export default router