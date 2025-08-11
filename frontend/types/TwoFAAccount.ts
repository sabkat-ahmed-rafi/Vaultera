import { Dispatch, SetStateAction } from "react";

export interface TwoFAAccount {
  id: string;
  title: string;
  issuer: string;
  accountName: string;
  secret: string;
  notes?: string;
  currentCode: string;
  timeRemaining: number;
  createdAt: string;
}

export type TwoFAAccountForm = Omit< 
  TwoFAAccount,
  "id" | "currentCode" | "timeRemaining" | "createdAt"
>;

export interface Add2faDialogProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  newAccount: TwoFAAccountForm;
  setNewAccount: Dispatch<SetStateAction<TwoFAAccountForm>>;
  handleAddAccount: () => void;
}