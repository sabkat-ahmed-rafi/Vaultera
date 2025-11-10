"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBankAccount = exports.putBankAccount = exports.postBankAccount = exports.getBankAccounts = void 0;
const bankAccountService_1 = require("../service/bankAccountService");
const getBankAccounts = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const items = await (0, bankAccountService_1.listBankAccountEntries)(req.user.id);
        res.json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getBankAccounts = getBankAccounts;
const postBankAccount = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { bankName, routingNumber, accountType, encryptedSecret, iv } = req.body;
        const created = await (0, bankAccountService_1.createBankAccountEntry)({ userId: req.user.id, bankName, routingNumber, accountType, encryptedSecret, iv });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
exports.postBankAccount = postBankAccount;
const putBankAccount = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        const updated = await (0, bankAccountService_1.updateBankAccountEntry)(id, req.user.id, req.body);
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.putBankAccount = putBankAccount;
const removeBankAccount = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        await (0, bankAccountService_1.deleteBankAccountEntry)(id, req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removeBankAccount = removeBankAccount;
