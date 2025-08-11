import { Dispatch, SetStateAction } from "react";

export type PasswordItem = {
  id: string;
  name: string;
  username: string;
  password: string;
  url?: string;
};


export interface PasswordListProps {
  loading: boolean;
  filteredPasswords: PasswordItem[];
  showPasswordIds: Set<string>;
  handleShowPassword: (id: string) => void;
  handleEditClick: (item: PasswordItem) => void;
  handleDelete: (id: string) => void;
}

export interface PasswordEditDialogProps {
  editItem: PasswordItem | null;
  setEditItem: Dispatch<SetStateAction<PasswordItem | null>>;
  editForm: PasswordItem | null;
  handleEditChange: (field: "name" | "username" | "password" | "url", value: string) => void;
  handleEditSave: () => void;
}

export interface AddPasswordDialogProps {
  addOpen: boolean;
  setAddOpen: Dispatch<SetStateAction<boolean>>, 
  addForm: PasswordItem, 
  handleAddChange: (field: "name" | "username" | "password" | "url", value: string) => void, 
  handleAddSave: () => void
}