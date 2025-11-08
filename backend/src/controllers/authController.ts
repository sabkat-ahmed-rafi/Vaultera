import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { 
  getUserByEmail, 
  addUser, 
  getUserVaultKeyInfo, 
  checkAuthUser, 
  generateJwtToken 
} from '../service/authService';
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
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const setJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await generateJwtToken(req.body);
        res.cookie('token', token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
           maxAge: 60 * 60 * 1000
        }).status(200).json({ success: true });

    } catch (error) {
        next(error);
        res.status(500).json({
           success: false,
           message: "Internal server error while setting JWT",
        });
    }
};

const removeJwt = async (_: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('token', {
           maxAge: 0,
           secure: process.env.NODE_ENV === "production",
           sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }).status(200).json({ success: true });

    } catch (error) {
        next(error);
        res.status(500).json({
           success: false,
           message: "Internal server error while removing JWT",
        });
    }
};

const checkSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await checkAuthUser({ email: req.user?.email ?? "" });
        if(!user) {
            res.status(500).json( "User not found" );
            return;
        }
        res.status(201).json({ message: "User found", user });
    } catch (error) {
        next(error);
        res.status(500).json({
           success: false,
           message: "Internal server error while checking user",
        });
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
};

export { 
  createUser,
  loginUser,
  setJwt,
  removeJwt,
  checkSession,
  checkUserVaultKeyInfo
 }