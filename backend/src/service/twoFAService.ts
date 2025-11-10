import { prisma } from "../config/prismaClient.js";
import { CreateTwoFAEntryInput } from "../types/types.js";

export const listTwoFAEntries = async (userId: string) => {
  return prisma.twoFAEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};

export const createTwoFAEntry = async (data: CreateTwoFAEntryInput) => {
  return prisma.twoFAEntry.create({ data });
};

export const deleteTwoFAEntry = async (id: string, userId: string) => {
  return prisma.twoFAEntry.deleteMany({ where: { id, userId } });
};


