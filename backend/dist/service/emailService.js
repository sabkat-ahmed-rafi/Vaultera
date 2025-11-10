"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmailEntry = exports.updateEmailEntry = exports.createEmailEntry = exports.listEmailEntries = void 0;
const prismaClient_1 = require("../config/prismaClient");
const listEmailEntries = async (userId) => {
    return prismaClient_1.prisma.emailEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};
exports.listEmailEntries = listEmailEntries;
const createEmailEntry = async (data) => {
    return prismaClient_1.prisma.emailEntry.create({ data });
};
exports.createEmailEntry = createEmailEntry;
const updateEmailEntry = async (id, userId, data) => {
    return prismaClient_1.prisma.emailEntry.updateMany({ where: { id, userId }, data });
};
exports.updateEmailEntry = updateEmailEntry;
const deleteEmailEntry = async (id, userId) => {
    return prismaClient_1.prisma.emailEntry.deleteMany({ where: { id, userId } });
};
exports.deleteEmailEntry = deleteEmailEntry;
