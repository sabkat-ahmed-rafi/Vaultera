import { Request, Response } from 'express';
import { getUserByEmail, createUser as createUserService } from '../service/userService';



const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const isExist = await getUserByEmail(userData.email);
    if (isExist) {
      return res.status(201).json({ message: "User already exists" });
    }

    const newUser = await createUserService(userData);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { createUser };
