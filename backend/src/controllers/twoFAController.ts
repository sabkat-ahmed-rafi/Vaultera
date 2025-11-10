import { NextFunction, Request, Response } from "express";
import {
  listTwoFAEntries,
  createTwoFAEntry,
  deleteTwoFAEntry,
} from "../service/twoFAService.js";


export const getTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
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
