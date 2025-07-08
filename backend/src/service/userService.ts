import { prisma } from "../config/prismaClient";
import { GetUserByEmailProp, UserData } from "../types/types";

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

export {
  getUserByEmail,
  addUser,
};

