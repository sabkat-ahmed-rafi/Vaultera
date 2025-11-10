"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIdentityEntry = exports.updateIdentityEntry = exports.createIdentityEntry = exports.listIdentityEntries = void 0;
const prismaClient_1 = require("../config/prismaClient");
const listIdentityEntries = async (userId) => {
    return prismaClient_1.prisma.identityEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};
exports.listIdentityEntries = listIdentityEntries;
const createIdentityEntry = async (data) => {
    return prismaClient_1.prisma.identityEntry.create({ data });
};
exports.createIdentityEntry = createIdentityEntry;
const updateIdentityEntry = async (id, userId, data) => {
    return prismaClient_1.prisma.identityEntry.updateMany({ where: { id, userId }, data });
};
exports.updateIdentityEntry = updateIdentityEntry;
const deleteIdentityEntry = async (id, userId) => {
    return prismaClient_1.prisma.identityEntry.deleteMany({ where: { id, userId } });
};
exports.deleteIdentityEntry = deleteIdentityEntry;
