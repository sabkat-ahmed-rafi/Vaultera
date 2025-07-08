import { prisma } from "../config/prismaClient";
import { Request, Response } from "express";


const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Check if user already exists by email
    const isExist = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (isExist) {
      return res.status(201).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: userData,
    });

    res.status(201).json({ message: "User created successfully"});
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

export { createUser };
