import { prisma } from "../config/prismaClient";

export type CreateBankAccountEntryInput = {
  userId: string;
  bankName: string;
  routingNumber?: string | null;
  accountType?: string | null;
  encryptedSecret: string;
  iv: string;
};

export type UpdateBankAccountEntryInput = Partial<Omit<CreateBankAccountEntryInput, "userId">>;

export const listBankAccountEntries = async (userId: string) => {
  const res = prisma.bankAccountEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
  console.log(res)
  return res;
};

export const createBankAccountEntry = async (data: CreateBankAccountEntryInput) => {
  return prisma.bankAccountEntry.create({ data });
};

export const updateBankAccountEntry = async (id: string, userId: string, data: UpdateBankAccountEntryInput) => {
  return prisma.bankAccountEntry.updateMany({ where: { id, userId }, data });
};

export const deleteBankAccountEntry = async (id: string, userId: string) => {
  return prisma.bankAccountEntry.deleteMany({ where: { id, userId } });
};
