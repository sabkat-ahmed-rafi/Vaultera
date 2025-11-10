"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.get("/user/me", verifyToken_1.verifyToken, userController_1.getCurrentUser);
router.put("/user/update-profile", verifyToken_1.verifyToken, userController_1.updateProfile);
exports.default = router;
