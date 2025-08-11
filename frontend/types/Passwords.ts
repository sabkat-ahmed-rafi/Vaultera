import { Dispatch, SetStateAction } from "react";

export type PasswordItem = {
  id: string;
  name: string;
  username: string;
  password: string;
  url?: string;
};


export interface PasswordListProps {
  loading: Boolean;
  filteredPasswords: PasswordItem[];
  showPasswordIds: Set<string>;
  handleShowPassword: (id: string) => void;
  handleEditClick: (item: PasswordItem) => void;
  handleDelete: (id: string) => void;
}