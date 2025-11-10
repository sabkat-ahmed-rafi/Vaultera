"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserVaultKeyInfo = exports.checkAuthUser = exports.generateJwtToken = exports.addUser = exports.getUserByEmail = void 0;
const jose_1 = require("jose");
const config_1 = require("../config/config");
const prismaClient_1 = require("../config/prismaClient");
const getUserByEmail = async ({ email }) => {
    return await prismaClient_1.prisma.user.findUnique({
        where: { email },
    });
};
exports.getUserByEmail = getUserByEmail;
const addUser = async (userData) => {
    return await prismaClient_1.prisma.user.create({
        data: userData,
    });
};
exports.addUser = addUser;
const generateJwtToken = async (user) => {
    if (!user) {
        throw new Error("Invalid user object");
    }
    if (!config_1.config.jwt_secret) {
        throw new Error("JWT secret is not defined");
    }
    const secret = new TextEncoder().encode(config_1.config.jwt_secret);
    return new jose_1.SignJWT(user)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(secret);
};
exports.generateJwtToken = generateJwtToken;
const checkAuthUser = async ({ email }) => {
    return await prismaClient_1.prisma.user.findUnique({
        where: { email },
    });
};
exports.checkAuthUser = checkAuthUser;
const getUserVaultKeyInfo = async ({ email }) => {
    return await prismaClient_1.prisma.user.findUnique({
        where: { email },
        select: {
            salt: true,
            iv: true,
            encryptedVaultKey: true,
        },
    });
};
exports.getUserVaultKeyInfo = getUserVaultKeyInfo;
