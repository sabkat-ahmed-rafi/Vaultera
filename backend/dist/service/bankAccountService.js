"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBankAccountEntry = exports.updateBankAccountEntry = exports.createBankAccountEntry = exports.listBankAccountEntries = void 0;
const prismaClient_1 = require("../config/prismaClient");
const listBankAccountEntries = async (userId) => {
    const res = prismaClient_1.prisma.bankAccountEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
    return res;
};
exports.listBankAccountEntries = listBankAccountEntries;
const createBankAccountEntry = async (data) => {
    return prismaClient_1.prisma.bankAccountEntry.create({ data });
};
exports.createBankAccountEntry = createBankAccountEntry;
const updateBankAccountEntry = async (id, userId, data) => {
    return prismaClient_1.prisma.bankAccountEntry.updateMany({ where: { id, userId }, data });
};
exports.updateBankAccountEntry = updateBankAccountEntry;
const deleteBankAccountEntry = async (id, userId) => {
    return prismaClient_1.prisma.bankAccountEntry.deleteMany({ where: { id, userId } });
};
exports.deleteBankAccountEntry = deleteBankAccountEntry;
