"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCard = exports.putCard = exports.postCard = exports.getCards = void 0;
const cardService_1 = require("../service/cardService");
const getCards = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const items = await (0, cardService_1.listCardEntries)(req.user.id);
        res.json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getCards = getCards;
const postCard = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { brand, encryptedData, iv } = req.body;
        const created = await (0, cardService_1.createCardEntry)({
            userId: req.user.id,
            brand,
            encryptedData,
            iv,
        });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
exports.postCard = postCard;
const putCard = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        const updated = await (0, cardService_1.updateCardEntry)(id, req.user.id, req.body);
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.putCard = putCard;
const removeCard = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        await (0, cardService_1.deleteCardEntry)(id, req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removeCard = removeCard;
