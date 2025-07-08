// import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express';
import { getUserByEmail, addUser } from '../service/userService';



const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;

    const isExist = await getUserByEmail({ email: userData.email });
    if (isExist) {
      res.status(500).json( "User already exists" );
      return;
    }

    const newUser = await addUser(userData);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
};


const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const user = await getUserByEmail({ email: userData.email });
    if (!user) {
      res.status(500).json( "User not found" );
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
  getUser
 }