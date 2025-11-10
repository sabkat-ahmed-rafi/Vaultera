"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCardEntry = exports.updateCardEntry = exports.createCardEntry = exports.listCardEntries = void 0;
const prismaClient_1 = require("../config/prismaClient");
// List all cards for a user
const listCardEntries = async (userId) => {
    return prismaClient_1.prisma.cardEntry.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};
exports.listCardEntries = listCardEntries;
// Create a new card entry
const createCardEntry = async (data) => {
    return prismaClient_1.prisma.cardEntry.create({ data });
};
exports.createCardEntry = createCardEntry;
// Update an existing card entry
const updateCardEntry = async (id, userId, data) => {
    return prismaClient_1.prisma.cardEntry.updateMany({
        where: { id, userId },
        data,
    });
};
exports.updateCardEntry = updateCardEntry;
// Delete a card entry
const deleteCardEntry = async (id, userId) => {
    return prismaClient_1.prisma.cardEntry.deleteMany({
        where: { id, userId },
    });
};
exports.deleteCardEntry = deleteCardEntry;
