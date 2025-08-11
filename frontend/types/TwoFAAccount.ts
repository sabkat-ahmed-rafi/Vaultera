import { Dispatch, SetStateAction } from "react";

export interface TwoFAAccount {
  id: string;
  title: string;
  issuer: string;
  accountName: string;
  secret: string;
  currentCode: string;
  timeRemaining: number;
  notes?: string;
  createdAt: string;
}

export interface Account2Fa {
  title: string;
  issuer: string;
  accountName: string;
  secret: string;
  notes: string;
}

export interface Add2faDialogProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  newAccount: Account2Fa;
  setNewAccount: Dispatch<SetStateAction<Account2Fa>>;
  handleAddAccount: () => void;
}