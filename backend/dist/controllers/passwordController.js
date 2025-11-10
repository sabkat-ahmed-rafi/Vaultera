"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePassword = exports.putPassword = exports.postPassword = exports.getPasswords = void 0;
const passwordService_1 = require("../service/passwordService");
const getPasswords = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const items = await (0, passwordService_1.listPasswordEntries)(req.user.id);
        res.json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getPasswords = getPasswords;
const postPassword = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { name, username, url, encryptedSecret, iv } = req.body;
        const created = await (0, passwordService_1.createPasswordEntry)({ userId: req.user.id, name, username, url, encryptedSecret, iv });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
exports.postPassword = postPassword;
const putPassword = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        const updated = await (0, passwordService_1.updatePasswordEntry)(id, req.user.id, req.body);
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.putPassword = putPassword;
const removePassword = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        await (0, passwordService_1.deletePasswordEntry)(id, req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removePassword = removePassword;
