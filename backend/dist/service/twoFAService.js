"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTwoFAEntry = exports.createTwoFAEntry = exports.listTwoFAEntries = void 0;
const prismaClient_1 = require("../config/prismaClient");
const listTwoFAEntries = async (userId) => {
    return prismaClient_1.prisma.twoFAEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};
exports.listTwoFAEntries = listTwoFAEntries;
const createTwoFAEntry = async (data) => {
    return prismaClient_1.prisma.twoFAEntry.create({ data });
};
exports.createTwoFAEntry = createTwoFAEntry;
const deleteTwoFAEntry = async (id, userId) => {
    return prismaClient_1.prisma.twoFAEntry.deleteMany({ where: { id, userId } });
};
exports.deleteTwoFAEntry = deleteTwoFAEntry;
