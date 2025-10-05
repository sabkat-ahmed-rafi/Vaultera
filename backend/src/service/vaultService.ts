import { prisma } from "../config/prismaClient";

export type CreatePasswordEntryInput = {
  userId: string;
  name: string;
  username: string;
  url?: string | null;
  encryptedSecret: string;
  iv: string;
};

export type UpdatePasswordEntryInput = Partial<Omit<CreatePasswordEntryInput, "userId">>;

export type CreateTwoFAEntryInput = {
  userId: string;
  title: string;
  issuer: string;
  accountName: string;
  notes?: string | null;
  encryptedSecret: string;
  iv: string;
};

export type UpdateTwoFAEntryInput = Partial<Omit<CreateTwoFAEntryInput, "userId">>;

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

export const listTwoFAEntries = async (userId: string) => {
  return prisma.twoFAEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};

export const createTwoFAEntry = async (data: CreateTwoFAEntryInput) => {
  return prisma.twoFAEntry.create({ data });
};

export const updateTwoFAEntry = async (id: string, userId: string, data: UpdateTwoFAEntryInput) => {
  return prisma.twoFAEntry.updateMany({ where: { id, userId }, data });
};

export const deleteTwoFAEntry = async (id: string, userId: string) => {
  return prisma.twoFAEntry.deleteMany({ where: { id, userId } });
};


