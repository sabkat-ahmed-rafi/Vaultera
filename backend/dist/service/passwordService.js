"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePasswordEntry = exports.updatePasswordEntry = exports.createPasswordEntry = exports.listPasswordEntries = void 0;
const prismaClient_1 = require("../config/prismaClient");
const listPasswordEntries = async (userId) => {
    return prismaClient_1.prisma.passwordEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};
exports.listPasswordEntries = listPasswordEntries;
const createPasswordEntry = async (data) => {
    return prismaClient_1.prisma.passwordEntry.create({ data });
};
exports.createPasswordEntry = createPasswordEntry;
const updatePasswordEntry = async (id, userId, data) => {
    return prismaClient_1.prisma.passwordEntry.updateMany({ where: { id, userId }, data });
};
exports.updatePasswordEntry = updatePasswordEntry;
const deletePasswordEntry = async (id, userId) => {
    return prismaClient_1.prisma.passwordEntry.deleteMany({ where: { id, userId } });
};
exports.deletePasswordEntry = deletePasswordEntry;
