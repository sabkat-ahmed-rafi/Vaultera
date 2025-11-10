"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.putNote = exports.postNote = exports.getNotes = void 0;
const noteService_1 = require("../service/noteService");
const getNotes = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const items = await (0, noteService_1.listNoteEntries)(req.user.id);
        res.json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getNotes = getNotes;
const postNote = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { title, encryptedSecret, iv } = req.body;
        const created = await (0, noteService_1.createNoteEntry)({ userId: req.user.id, title, encryptedSecret, iv });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
};
exports.postNote = postNote;
const putNote = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        const updated = await (0, noteService_1.updateNoteEntry)(id, req.user.id, req.body);
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.putNote = putNote;
const removeNote = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }
        const { id } = req.params;
        await (0, noteService_1.deleteNoteEntry)(id, req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.removeNote = removeNote;
