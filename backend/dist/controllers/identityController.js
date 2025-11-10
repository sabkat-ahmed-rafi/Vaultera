"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeIdentity = exports.putIdentity = exports.postIdentity = exports.getIdentities = void 0;
const identityService_1 = require("../service/identityService");
const getIdentities = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const items = await (0, identityService_1.listIdentityEntries)(req.user.id);
        res.json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getIdentities = getIdentities;
const postIdentity = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { firstName, lastName, email, phone, address, encryptedSecret, iv } = req.body;
        const created = await (0, identityService_1.createIdentityEntry)({ userId: req.user.id, firstName, lastName, email, phone, address, encryptedSecret, iv });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
exports.postIdentity = postIdentity;
const putIdentity = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        const updated = await (0, identityService_1.updateIdentityEntry)(id, req.user.id, req.body);
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.putIdentity = putIdentity;
const removeIdentity = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        await (0, identityService_1.deleteIdentityEntry)(id, req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removeIdentity = removeIdentity;
