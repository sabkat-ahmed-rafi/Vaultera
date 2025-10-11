import { prisma } from "../config/prismaClient";
import { CreateNoteEntryInput, UpdateNoteEntryInput } from "../types/types";

export const listNoteEntries = async (userId: string) => {
  return prisma.noteEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};

export const createNoteEntry = async (data: CreateNoteEntryInput) => {
  return prisma.noteEntry.create({ data });
};

export const updateNoteEntry = async (id: string, userId: string, data: UpdateNoteEntryInput) => {
  return prisma.noteEntry.updateMany({ where: { id, userId }, data });
};

export const deleteNoteEntry = async (id: string, userId: string) => {
  return prisma.noteEntry.deleteMany({ where: { id, userId } });
};