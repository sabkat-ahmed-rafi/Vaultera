import { prisma } from "../config/prismaClient.js";

export type CreateIdentityEntryInput = {
  userId: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  encryptedSecret: string;
  iv: string;
};

export type UpdateIdentityEntryInput = Partial<Omit<CreateIdentityEntryInput, "userId">>;

export const listIdentityEntries = async (userId: string) => {
  return prisma.identityEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};

export const createIdentityEntry = async (data: CreateIdentityEntryInput) => {
  return prisma.identityEntry.create({ data });
};

export const updateIdentityEntry = async (id: string, userId: string, data: UpdateIdentityEntryInput) => {
  return prisma.identityEntry.updateMany({ where: { id, userId }, data });
};

export const deleteIdentityEntry = async (id: string, userId: string) => {
  return prisma.identityEntry.deleteMany({ where: { id, userId } });
};
