import { SignJWT } from "jose";
import { config } from "../config/config.js";
import { prisma } from "../config/prismaClient.js";
import { GetUserByEmailProp, JwtUser, UserData } from "../types/types.js";

const getUserByEmail = async ({ email }: GetUserByEmailProp) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const addUser = async (userData: UserData) => {
  return await prisma.user.create({
    data: userData,
  });
};

const generateJwtToken = async (user: JwtUser): Promise<string> => {
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
};

const checkAuthUser = async ({ email }: GetUserByEmailProp) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const getUserVaultKeyInfo = async ({ email }: GetUserByEmailProp) => {
  return await prisma.user.findUnique({
  where: { email },
  select: {
    salt: true,
    iv: true,
    encryptedVaultKey: true,
  },
});
};

export {
  getUserByEmail,
  addUser,
  generateJwtToken,
  checkAuthUser,
  getUserVaultKeyInfo
};

