import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/user/me", verifyToken, getCurrentUser);
router.put("/user/update-profile", verifyToken, updateProfile);

export default router;
