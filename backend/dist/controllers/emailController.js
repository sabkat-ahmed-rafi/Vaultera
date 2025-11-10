"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmail = exports.putEmail = exports.postEmail = exports.getEmails = void 0;
const emailService_1 = require("../service/emailService");
const getEmails = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const items = await (0, emailService_1.listEmailEntries)(req.user.id);
        res.json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getEmails = getEmails;
const postEmail = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { email, username, url, encryptedSecret, iv } = req.body;
        const created = await (0, emailService_1.createEmailEntry)({ userId: req.user.id, email, username, encryptedSecret, iv });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
exports.postEmail = postEmail;
const putEmail = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        const updated = await (0, emailService_1.updateEmailEntry)(id, req.user.id, req.body);
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.putEmail = putEmail;
const removeEmail = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        await (0, emailService_1.deleteEmailEntry)(id, req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removeEmail = removeEmail;
