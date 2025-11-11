import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/me", verifyToken, getCurrentUser);
router.put("/update-profile", verifyToken, updateProfile);

export default router;
