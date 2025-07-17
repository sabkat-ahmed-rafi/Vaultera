import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { getUserByEmail, addUser, getUserVaultKeyInfo } from '../service/userService';
import { hashPassword } from '../utils/hashPassword';



const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;

    const isExist = await getUserByEmail({ email: userData.email });
    if (isExist) {
      res.status(500).json( "User already exists" );
      return;
    }

    const hashedPassword = await hashPassword(userData.password);
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

const checkUserVaultKeyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ error: 'Email parameter is required' });
      return;
    }

    const vaultKeyInfo = await getUserVaultKeyInfo({ email });

    if (!vaultKeyInfo) {
      res.status(404).json({ error: 'Vault key info not found' });
      return;
    }

    res.status(200).json({ message: "Vault key info found", vaultKeyInfo });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
}

export { 
  createUser,
  loginUser,
  checkUserVaultKeyInfo
 }