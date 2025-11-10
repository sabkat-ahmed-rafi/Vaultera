import { Request, Response } from "express";
import { getUserById, updateUserProfile } from "../service/userService.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return 
    }

    const user = await getUserById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return 
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return 
    }

    const { name, photo } = req.body;

    if (!name && !photo) {
      res.status(400).json({ message: "No fields to update" });
      return 
    }

    const updatedUser = await updateUserProfile(userId, { name, photo });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
