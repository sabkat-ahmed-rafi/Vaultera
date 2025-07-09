import { SignJWT } from "jose";
import { JwtUser } from "../types/types";
import { config } from "../config/config";



export const generateJwtToken = async (user: JwtUser): Promise<string> => {
    if (!user) {
      throw new Error("Invalid user object");
    }

    if (!config.jwt_secret) {
      throw new Error("JWT secret is not defined");
    }

    const secret = new TextEncoder().encode(config.jwt_secret);
    
    return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret)
}