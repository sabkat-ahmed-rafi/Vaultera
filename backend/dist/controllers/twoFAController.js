"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTwoFA = exports.postTwoFA = exports.getTwoFA = void 0;
const twoFAService_1 = require("../service/twoFAService");
const getTwoFA = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const items = await (0, twoFAService_1.listTwoFAEntries)(req.user.id);
        res.json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getTwoFA = getTwoFA;
const postTwoFA = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { title, issuer, accountName, notes, encryptedSecret, iv } = req.body;
        const created = await (0, twoFAService_1.createTwoFAEntry)({ userId: req.user.id, title, issuer, accountName, notes, encryptedSecret, iv });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
exports.postTwoFA = postTwoFA;
const removeTwoFA = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        await (0, twoFAService_1.deleteTwoFAEntry)(id, req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removeTwoFA = removeTwoFA;
