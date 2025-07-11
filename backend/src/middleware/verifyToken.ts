import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { JwtUser } from "../types/types";



export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const { jwtVerify } = await  import("jose");
    try {
        const token = req.cookies.token;
        if (!token) {
          res.status(401).json({ message: "Token missing" });
          return;
        };

        const secret = new TextEncoder().encode(config.jwt_secret);

        const { payload } = await jwtVerify(token, secret);

        req.user = payload as JwtUser;
        next();

    } catch (error: any) {
        if (error.name === "JWTExpired") {
          res.status(401).json({ error: "sessionExpired" });
          return;
        }
        res.status(401).json({ message: "unauthorized access" });
    }
}