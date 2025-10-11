import { Dispatch, SetStateAction } from "react";

export type NotesItem = {
  id: string;
  title: string;
  note: string;
};

export interface NoteListProps {
  loading: boolean;
  filteredNotes: NotesItem[];
  showNotesIds: Set<string>;
  handleShowNote: (id: string) => void;
  handleEditClick: (item: NotesItem) => void;
  handleDelete: (id: string) => void;
}

export interface NoteEditDialogProps {
  editItem: NotesItem | null;
  setEditItem: Dispatch<SetStateAction<NotesItem | null>>;
  editForm: NotesItem | null;
  handleEditChange: (field: "title" | "note" , value: string) => void;
  handleEditSave: () => void;
}

export interface AddNoteDialogProps {
  addOpen: boolean;
  setAddOpen: Dispatch<SetStateAction<boolean>>, 
  addForm: NotesItem, 
  handleAddChange: (field: "title" | "note" , value: string) => void, 
  handleAddSave: () => void
}