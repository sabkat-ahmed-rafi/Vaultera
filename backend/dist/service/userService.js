"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserById = void 0;
const prismaClient_1 = require("../config/prismaClient");
const getUserById = async (userId) => {
    const user = await prismaClient_1.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, photo: true, email: true },
    });
    return user;
};
exports.getUserById = getUserById;
const updateUserProfile = async (userId, data) => {
    const updated = await prismaClient_1.prisma.user.update({
        where: { id: userId },
        data,
        select: { id: true, name: true, photo: true, email: true },
    });
    return updated;
};
exports.updateUserProfile = updateUserProfile;
