export interface CardItem {
  id: string;
  brand: string;
  encryptedData?: string;
  iv?: string;
  last4?: string;
  expMonth?: string;
  expYear?: string;
  cardholderName?: string;
}

export interface CardEditDialogProps {
  editItem: CardItem | null;
  setEditItem: (item: CardItem | null) => void;
  editForm: CardItem | null;
  handleEditChange: (field: keyof CardItem, value: string) => void;
  handleEditSave: () => void;
}

export interface AddCardDialogProps {
  addOpen: boolean;
  setAddOpen: (open: boolean) => void;
  addForm: CardItem;
  handleAddChange: (field: keyof CardItem, value: string) => void;
  handleAddSave: () => void;
}

export interface CardListProps {
  loading: boolean;
  filteredCards: CardItem[];
  handleEditClick: (item: CardItem) => void;
  handleDelete: (id: string) => void;
}