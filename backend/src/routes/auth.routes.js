import express from "express";
import { registerUser , loginUser, getMe, updateUserProfile } from "../controllers/auth.controllers.js";
import { protect as authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateUserProfile);

export default router;
