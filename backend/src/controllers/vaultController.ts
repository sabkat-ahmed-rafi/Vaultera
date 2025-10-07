import { NextFunction, Request, Response } from "express";
import {
  listPasswordEntries,
  createPasswordEntry,
  updatePasswordEntry,
  deletePasswordEntry,
  listTwoFAEntries,
  createTwoFAEntry,
  deleteTwoFAEntry,
} from "../service/vaultService";

export const getPasswords = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const items = await listPasswordEntries(req.user.id);
    res.json({ items });
  } catch (error: any) {
    next(error);
  }
};

export const postPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { name, username, url, encryptedSecret, iv } = req.body;
    const created = await createPasswordEntry({ userId: req.user.id, name, username, url, encryptedSecret, iv });
    res.status(201).json(created);
  } catch (error: any) {
    next(error);
  }
};

export const putPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { id } = req.params;
    const updated = await updatePasswordEntry(id, req.user.id, req.body);
    res.json(updated);
  } catch (error: any) {
    next(error);
  }
};

export const removePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { id } = req.params;
    await deletePasswordEntry(id, req.user.id);
    res.json({ success: true });
  } catch (error: any) {
    next(error);
  }
};

export const getTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log(req.user)
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const items = await listTwoFAEntries(req.user.id);
    res.json({ items });
  } catch (error: any) {
    next(error);
  }
};

export const postTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { title, issuer, accountName, notes, encryptedSecret, iv } = req.body;
    const created = await createTwoFAEntry({ userId: req.user.id, title, issuer, accountName, notes, encryptedSecret, iv });
    res.status(201).json(created);
  } catch (error: any) {
    next(error);
  }
};

export const removeTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) { res.status(401).json({ message: "unauthorized" }); return; }
    const { id } = req.params;
    await deleteTwoFAEntry(id, req.user.id);
    res.json({ success: true });
  } catch (error: any) {
    next(error);
  }
};
