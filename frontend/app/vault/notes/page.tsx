'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Flex,
} from "@radix-ui/themes";
import { RiAddLine } from "react-icons/ri";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosInstance } from "axios";
import { useAppSelector } from "@/redux/hooks";
import { decryptSecret, encryptSecret } from "cryptonism";
import toast from "react-hot-toast";
import { NotesItem } from "@/types/Notes";
import { BiNote } from "react-icons/bi";
import NoteList from "@/components/Notes/NoteList";
import NoteEditDialog from "@/components/Notes/NoteEditDialog";
import AddNoteDialog from "@/components/Notes/AddNoteDialog";


const fetchNotes = async (decryptedKey: Uint8Array | null, axiosSecure: AxiosInstance): Promise<NotesItem[]> => {
  const res = await axiosSecure.get(`/api/vault/notes`);
  const items = res.data.items as Array<{ id: string; title: string; encryptedSecret: string; iv: string; }>;

  if(!decryptedKey) return items.map(i => ({ id: i.id, title: i.title, note: "" }));

  const decrypted = await Promise.all(items.map(async (i) => {
    const dec = await decryptSecret({ encryptedSecret: i.encryptedSecret, iv: i.iv, decryptedKey });
    if(!dec?.success) {
      return { id: i.id, title: i.title, note: "" };
    }
    return { id: i.id, title: i.title, note: dec.decryptedSecret };
  }));

  return decrypted;
};

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NotesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotesIds, setShowNotesIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<NotesItem | null>(null);
  const [editForm, setEditForm] = useState<NotesItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [addForm, setAddForm] = useState<NotesItem>({
    id: "",
    title: "",
    note: "",
  });

  const { decryptedVaultKey } = useAppSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchNotes(decryptedVaultKey, axiosSecure);
        setNotes(data);
      } catch (_) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    })();
  }, [decryptedVaultKey]);

  const handleShowNote = (id: string) => {
    setShowNotesIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredNotes = notes.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) 
  );

  const handleEditClick = (item: NotesItem) => {
    setEditItem(item);
    setEditForm(item);
  };

  const handleEditChange = (field: keyof NotesItem, value: string) => {
    setEditForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      if (!editForm) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: editForm.note, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      await axiosSecure.put(`/api/vault/notes/${editForm.id}`, {
        title: editForm.title,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      setNotes((prev) => prev.map((item) => (item.id === editForm.id ? editForm : item)));
      setEditItem(null);
      setEditForm(null);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/api/vault/notes/${id}`);
      setNotes((prev) => prev.filter((item) => item.id !== id));
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddChange = (field: keyof NotesItem, value: string) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = async () => {
    try {
      if (!addForm.title || !addForm.note) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: addForm.note, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      const res = await axiosSecure.post(`/api/vault/passwords`, {
        name: addForm.title,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      const created = res.data as { id: string };
      setNotes((prev) => [ ...prev, { ...addForm, id: created.id } ]);
      setAddForm({ id: "", title: "", note: "" });
      setAddOpen(false);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className='mt-5 ml-14 md:mt-5 md:ml-5 lg:ml-10'>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center ">
            <BiNote className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Note</h1>
            <p className="text-gray-400">{notes.length} notes</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Flex mb="4" gap="3">
          <TextField.Root
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[60%]">
          </TextField.Root>
          <Button 
            style={{backgroundColor: 'white', color: 'black', cursor: 'pointer'}}  
            variant="solid" 
            onClick={() => setAddOpen(true)}
          >
            <RiAddLine className="size-4 mr-2" />
            Add New
          </Button>
        </Flex>
        {/* Password Lists */}
        <NoteList
        loading={loading}
        filteredNotes={filteredNotes} 
        showNotesIds={showNotesIds}
        handleShowNote={handleShowNote}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete} />

        {/* Edit Dialog */}
        <NoteEditDialog
          editItem={editItem}
          setEditItem={setEditItem}
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />

        {/* Add Dialog */}
        <AddNoteDialog 
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addForm={addForm} 
          handleAddChange={handleAddChange} 
          handleAddSave={handleAddSave} />
      </div>
    </>
  );
};

export default NotesPage;