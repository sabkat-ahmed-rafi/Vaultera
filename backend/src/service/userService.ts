import { prisma } from "../config/prismaClient";

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, photo: true, email: true },
  });
  return user;
};

export const updateUserProfile = async (userId: string, data: { name?: string; photo?: string }) => {
  const updated = await prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, name: true, photo: true, email: true },
  });
  return updated;
};
