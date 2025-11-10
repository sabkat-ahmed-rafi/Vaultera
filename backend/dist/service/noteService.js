"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteEntry = exports.updateNoteEntry = exports.createNoteEntry = exports.listNoteEntries = void 0;
const prismaClient_1 = require("../config/prismaClient");
const listNoteEntries = async (userId) => {
    return prismaClient_1.prisma.noteEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};
exports.listNoteEntries = listNoteEntries;
const createNoteEntry = async (data) => {
    return prismaClient_1.prisma.noteEntry.create({ data });
};
exports.createNoteEntry = createNoteEntry;
const updateNoteEntry = async (id, userId, data) => {
    return prismaClient_1.prisma.noteEntry.updateMany({ where: { id, userId }, data });
};
exports.updateNoteEntry = updateNoteEntry;
const deleteNoteEntry = async (id, userId) => {
    return prismaClient_1.prisma.noteEntry.deleteMany({ where: { id, userId } });
};
exports.deleteNoteEntry = deleteNoteEntry;
