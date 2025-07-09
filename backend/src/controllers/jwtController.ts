import { NextFunction, Request, Response } from "express";
import { generateJwtToken } from "../service/jwtService";

export const setJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await generateJwtToken(req.body);
        res.cookie('token', token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }).status(200).json({ success: true });

    } catch (error) {
        next(error);
        res.status(500).json({
           success: false,
           message: "Internal server error while setting JWT",
        });
    }
}