import { NextFunction, Request, Response } from "express";
import { checkAuthUser, generateJwtToken } from "../service/jwtService";

export const setJwt = async (req: Request, res: Response, next: NextFunction) => {
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
}

export const removeJwt = async (_: Request, res: Response, next: NextFunction) => {
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
}

export const checkSession = async (req: Request, res: Response, next: NextFunction) => {
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