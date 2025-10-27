import { Dispatch, SetStateAction } from "react";

export type BankAccountItem = {
  id: string;
  bankName: string;
  accountNumber: string;
  routingNumber?: string;
  accountType?: string;
};

export interface BankAccountListProps {
  loading: boolean;
  filteredBankAccounts: BankAccountItem[];
  showAccountIds: Set<string>;
  handleShowAccount: (id: string) => void;
  handleEditClick: (item: BankAccountItem) => void;
  handleDelete: (id: string) => void;
}

export interface BankAccountEditDialogProps {
  editItem: BankAccountItem | null;
  setEditItem: Dispatch<SetStateAction<BankAccountItem | null>>;
  editForm: BankAccountItem | null;
  handleEditChange: (field: "bankName" | "accountNumber" | "routingNumber" | "accountType", value: string) => void;
  handleEditSave: () => void;
}

export interface AddBankAccountDialogProps {
  addOpen: boolean;
  setAddOpen: Dispatch<SetStateAction<boolean>>, 
  addForm: BankAccountItem, 
  handleAddChange: (field: "bankName" | "accountNumber" | "routingNumber" | "accountType", value: string) => void, 
  handleAddSave: () => void
}
