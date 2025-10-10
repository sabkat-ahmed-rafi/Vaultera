
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