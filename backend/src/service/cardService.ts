import { prisma } from "../config/prismaClient.js";
import { CreateCardEntryInput, UpdateCardEntryInput } from "../types/types.js";

// List all cards for a user
export const listCardEntries = async (userId: string) => {
  return prisma.cardEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

// Create a new card entry
export const createCardEntry = async (data: CreateCardEntryInput) => {
  return prisma.cardEntry.create({ data });
};

// Update an existing card entry
export const updateCardEntry = async (id: string, userId: string, data: UpdateCardEntryInput) => {
  return prisma.cardEntry.updateMany({
    where: { id, userId },
    data,
  });
};

// Delete a card entry
export const deleteCardEntry = async (id: string, userId: string) => {
  return prisma.cardEntry.deleteMany({
    where: { id, userId },
  });
};
