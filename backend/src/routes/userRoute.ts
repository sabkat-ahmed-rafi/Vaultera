// src/routes/userRoutes.ts
import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";


const router = express.Router();

router.get("/me", verifyToken, getCurrentUser);
router.put("/update-profile", verifyToken, updateProfile);

export default router;
