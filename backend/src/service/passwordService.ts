import { prisma } from "../config/prismaClient.js";
import { CreatePasswordEntryInput, UpdatePasswordEntryInput } from "../types/types.js";

export const listPasswordEntries = async (userId: string) => {
  return prisma.passwordEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};

export const createPasswordEntry = async (data: CreatePasswordEntryInput) => {
  return prisma.passwordEntry.create({ data });
};

export const updatePasswordEntry = async (id: string, userId: string, data: UpdatePasswordEntryInput) => {
  return prisma.passwordEntry.updateMany({ where: { id, userId }, data });
};

export const deletePasswordEntry = async (id: string, userId: string) => {
  return prisma.passwordEntry.deleteMany({ where: { id, userId } });
};