import { prisma } from "../config/prismaClient";
import { CreateEmailEntryInput, UpdateEmailEntryInput } from "../types/types";


export const listEmailEntries = async (userId: string) => {
  return prisma.emailEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};

export const createEmailEntry = async (data: CreateEmailEntryInput) => {
  return prisma.emailEntry.create({ data });
};

export const updateEmailEntry = async (id: string, userId: string, data: UpdateEmailEntryInput) => {
  return prisma.emailEntry.updateMany({ where: { id, userId }, data });
};

export const deleteEmailEntry = async (id: string, userId: string) => {
  return prisma.emailEntry.deleteMany({ where: { id, userId } });
};