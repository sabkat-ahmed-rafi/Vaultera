import { NextFunction, Request, Response } from "express";
import {
  listEmailEntries,
  createEmailEntry,
  updateEmailEntry,
  deleteEmailEntry,
} from "../service/emailService";


export const getPasswords = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const items = await listEmailEntries(req.user.id);
    res.json({ items });
  } catch (error: any) {
    next(error);
  }
};

export const postPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { email, username, url, encryptedSecret, iv } = req.body;
    const created = await createEmailEntry({ userId: req.user.id, email, username, encryptedSecret, iv });
    res.status(201).json(created);
  } catch (error: any) {
    next(error);
  }
};

export const putPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { id } = req.params;
    const updated = await updateEmailEntry(id, req.user.id, req.body);
    res.json(updated);
  } catch (error: any) {
    next(error);
  }
};

export const removePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { id } = req.params;
    await deleteEmailEntry(id, req.user.id);
    res.json({ success: true });
  } catch (error: any) {
    next(error);
  }
};