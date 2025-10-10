import { Dispatch, SetStateAction } from "react";

export type EmailItem = {
  id: string;
  email: string;
  username: string;
  password: string;
};

export interface EmailListProps {
  loading: boolean;
  filteredPasswords: EmailItem[];
  showPasswordIds: Set<string>;
  handleShowPassword: (id: string) => void;
  handleEditClick: (item: EmailItem) => void;
  handleDelete: (id: string) => void;
}

export interface EmailEditDialogProps {
  editItem: EmailItem | null;
  setEditItem: Dispatch<SetStateAction<EmailItem | null>>;
  editForm: EmailItem | null;
  handleEditChange: (field: "email" | "username" | "password", value: string) => void;
  handleEditSave: () => void;
}

export interface AddEmailDialogProps {
  addOpen: boolean;
  setAddOpen: Dispatch<SetStateAction<boolean>>, 
  addForm: EmailItem, 
  handleAddChange: (field: "email" | "username" | "password", value: string) => void, 
  handleAddSave: () => void
}