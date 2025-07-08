import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { getUserByEmail, addUser } from '../service/userService';
import { hashPassword } from '../utils/hashPassword';



const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;

    const isExist = await getUserByEmail({ email: userData.email });
    if (isExist) {
      res.status(500).json( "User already exists" );
      return;
    }

    const hashedPassword = hashPassword(userData.password);
    userData.password = hashedPassword;

    const newUser = await addUser(userData);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
};


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const user = await getUserByEmail({ email: userData.email });
    const isRealUser = await bcrypt.compare(userData.password, user!.password);
    if (!user) {
      res.status(500).json( "User not found" );
      return;
    } 
    if(!isRealUser) {
      res.status(500).json(" Invalid credentials ");
      return;
    }
    res.status(201).json({ message: "User found", user });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
}

export { 
  createUser,
  loginUser
 }