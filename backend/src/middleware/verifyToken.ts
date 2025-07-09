import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { jwtVerify } from "jose";



export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
          return res.status(401).json({ message: "Token missing" });
        };

        const secret = new TextEncoder().encode(config.jwt_secret);

        const { payload } = await jwtVerify(token, secret);

        req.user = payload;
        next();

    } catch (error: any) {
        if (error.name === "JWTExpired") {
          return res.status(401).json({ error: "sessionExpired" });
        }
        return res.status(401).json({ message: "unauthorized access" });
    }
}