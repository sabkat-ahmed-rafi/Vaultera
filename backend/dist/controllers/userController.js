"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getCurrentUser = void 0;
const userService_1 = require("../service/userService");
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await (0, userService_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCurrentUser = getCurrentUser;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { name, photo } = req.body;
        if (!name && !photo) {
            res.status(400).json({ message: "No fields to update" });
            return;
        }
        const updatedUser = await (0, userService_1.updateUserProfile)(userId, { name, photo });
        res.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
