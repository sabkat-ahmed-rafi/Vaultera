"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserVaultKeyInfo = exports.checkSession = exports.removeJwt = exports.setJwt = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authService_1 = require("../service/authService");
const hashPassword_1 = require("../utils/hashPassword");
const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const isExist = await (0, authService_1.getUserByEmail)({ email: userData.email });
        if (isExist) {
            res.status(500).json("User already exists");
            return;
        }
        const hashedPassword = await (0, hashPassword_1.hashPassword)(userData.password);
        userData.password = hashedPassword;
        const newUser = await (0, authService_1.addUser)(userData);
        res.status(201).json({ message: "User created successfully", newUser });
    }
    catch (error) {
        next(error);
        res.status(500).json({ error: error.message });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await (0, authService_1.getUserByEmail)({ email: userData.email });
        const isRealUser = await bcrypt_1.default.compare(userData.password, user.password);
        if (!user) {
            res.status(500).json("User not found");
            return;
        }
        if (!isRealUser) {
            res.status(500).json(" Invalid credentials ");
            return;
        }
        res.status(201).json({ message: "User found", user });
    }
    catch (error) {
        next(error);
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
exports.loginUser = loginUser;
const setJwt = async (req, res, next) => {
    try {
        const token = await (0, authService_1.generateJwtToken)(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 60 * 60 * 1000
        }).status(200).json({ success: true });
    }
    catch (error) {
        next(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while setting JWT",
        });
    }
};
exports.setJwt = setJwt;
const removeJwt = async (_, res, next) => {
    try {
        res.clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }).status(200).json({ success: true });
    }
    catch (error) {
        next(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while removing JWT",
        });
    }
};
exports.removeJwt = removeJwt;
const checkSession = async (req, res, next) => {
    try {
        const user = await (0, authService_1.checkAuthUser)({ email: req.user?.email ?? "" });
        if (!user) {
            res.status(500).json("User not found");
            return;
        }
        res.status(201).json({ message: "User found", user });
    }
    catch (error) {
        next(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while checking user",
        });
    }
};
exports.checkSession = checkSession;
const checkUserVaultKeyInfo = async (req, res, next) => {
    try {
        const { email } = req.params;
        if (!email) {
            res.status(400).json({ error: 'Email parameter is required' });
            return;
        }
        const vaultKeyInfo = await (0, authService_1.getUserVaultKeyInfo)({ email });
        if (!vaultKeyInfo) {
            res.status(404).json({ error: 'Vault key info not found' });
            return;
        }
        res.status(200).json({ message: "Vault key info found", vaultKeyInfo });
    }
    catch (error) {
        next(error);
        res.status(500).json({ error: error.message });
    }
};
exports.checkUserVaultKeyInfo = checkUserVaultKeyInfo;
