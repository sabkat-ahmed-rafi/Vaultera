import { Dispatch, SetStateAction } from "react";

export type IdentityItem = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  ssn: string;
};

export interface IdentityListProps {
  loading: boolean;
  filteredIdentities: IdentityItem[];
  showSSNIds: Set<string>;
  handleShowSSN: (id: string) => void;
  handleEditClick: (item: IdentityItem) => void;
  handleDelete: (id: string) => void;
}

export interface IdentityEditDialogProps {
  editItem: IdentityItem | null;
  setEditItem: Dispatch<SetStateAction<IdentityItem | null>>;
  editForm: IdentityItem | null;
  handleEditChange: (field: "firstName" | "lastName" | "email" | "phone" | "address" | "ssn", value: string) => void;
  handleEditSave: () => void;
}

export interface AddIdentityDialogProps {
  addOpen: boolean;
  setAddOpen: Dispatch<SetStateAction<boolean>>, 
  addForm: IdentityItem, 
  handleAddChange: (field: "firstName" | "lastName" | "email" | "phone" | "address" | "ssn", value: string) => void, 
  handleAddSave: () => void
}
