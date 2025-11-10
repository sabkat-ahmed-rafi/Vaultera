import { NextFunction, Request, Response } from "express";
import {
  listCardEntries,
  createCardEntry,
  updateCardEntry,
  deleteCardEntry,
} from "../service/cardService.js";

export const getCards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }
    const items = await listCardEntries(req.user.id);
    res.json({ items });
  } catch (error: any) {
    next(error);
  }
};

export const postCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }
    const { brand, encryptedData, iv } = req.body;
    const created = await createCardEntry({
      userId: req.user.id,
      brand,
      encryptedData,
      iv,
    });
    res.status(201).json(created);
  } catch (error: any) {
    next(error);
  }
};

export const putCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }
    const { id } = req.params;
    const updated = await updateCardEntry(id, req.user.id, req.body);
    res.json(updated);
  } catch (error: any) {
    next(error);
  }
};

export const removeCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }
    const { id } = req.params;
    await deleteCardEntry(id, req.user.id);
    res.json({ success: true });
  } catch (error: any) {
    next(error);
  }
};
