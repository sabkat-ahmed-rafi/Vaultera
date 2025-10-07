'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  Flex,
} from "@radix-ui/themes";
import { RiAddLine, RiShieldKeyholeLine } from "react-icons/ri";
import PasswordList from "@/components/Passwords/PasswordList";
import { PasswordItem } from "@/types/Passwords";
import PasswordEditDialog from "@/components/Passwords/PasswordEditDialog";
import AddPasswordDialog from "@/components/Passwords/AddPasswordDialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosInstance } from "axios";
import { config } from "@/config/config";
import { useAppSelector } from "@/redux/hooks";
import { decryptSecret, encryptSecret } from "cryptonism";
import toast from "react-hot-toast";


const fetchPasswords = async (decryptedKey: Uint8Array | null, axiosSecure: AxiosInstance): Promise<PasswordItem[]> => {
  const res = await axiosSecure.get(`/api/vault/passwords`);
  const items = res.data.items as Array<{ id: string; name: string; username: string; url?: string; encryptedSecret: string; iv: string; }>;

  if(!decryptedKey) return items.map(i => ({ id: i.id, name: i.name, username: i.username, password: "", url: i.url }));

  const decrypted = await Promise.all(items.map(async (i) => {
    const dec = await decryptSecret({ encryptedSecret: i.encryptedSecret, iv: i.iv, decryptedKey });
    if(!dec?.success) {
      return { id: i.id, name: i.name, username: i.username, password: "", url: i.url };
    }
    return { id: i.id, name: i.name, username: i.username, password: dec.decryptedSecret, url: i.url };
  }));

  return decrypted;
};

const PasswordsPage: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordIds, setShowPasswordIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<PasswordItem | null>(null);
  const [editForm, setEditForm] = useState<PasswordItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [addForm, setAddForm] = useState<PasswordItem>({
    id: "",
    name: "",
    username: "",
    password: "",
    url: "",
  });

  const { decryptedVaultKey } = useAppSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPasswords(decryptedVaultKey, axiosSecure);
        setPasswords(data);
      } catch (_) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    })();
  }, [decryptedVaultKey]);

  const handleShowPassword = (id: string) => {
    setShowPasswordIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredPasswords = passwords.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item: PasswordItem) => {
    setEditItem(item);
    setEditForm(item);
  };

  const handleEditChange = (field: keyof PasswordItem, value: string) => {
    setEditForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      if (!editForm) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: editForm.password, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      await axiosSecure.put(`/api/vault/passwords/${editForm.id}`, {
        name: editForm.name,
        username: editForm.username,
        url: editForm.url,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      setPasswords((prev) => prev.map((item) => (item.id === editForm.id ? editForm : item)));
      setEditItem(null);
      setEditForm(null);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/api/vault/passwords/${id}`);
      setPasswords((prev) => prev.filter((item) => item.id !== id));
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddChange = (field: keyof PasswordItem, value: string) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = async () => {
    try {
      if (!addForm.name || !addForm.username || !addForm.password) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: addForm.password, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      const res = await axiosSecure.post(`/api/vault/passwords`, {
        name: addForm.name,
        username: addForm.username,
        url: addForm.url,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      const created = res.data as { id: string };
      setPasswords((prev) => [ ...prev, { ...addForm, id: created.id } ]);
      setAddForm({ id: "", name: "", username: "", password: "", url: "" });
      setAddOpen(false);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className='mt-5 ml-14 md:mt-5 md:ml-5 lg:ml-10'>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center ">
            <RiShieldKeyholeLine className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Password</h1>
            <p className="text-gray-400">{passwords.length} passwords</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Flex mb="4" gap="3">
          <TextField.Root
            placeholder="Search by name or username"
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
        <PasswordList
        loading={loading}
        filteredPasswords={filteredPasswords} 
        showPasswordIds={showPasswordIds}
        handleShowPassword={handleShowPassword}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete} />

        {/* Edit Dialog */}
        <PasswordEditDialog
          editItem={editItem}
          setEditItem={setEditItem}
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />

        {/* Add Dialog */}
        <AddPasswordDialog 
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addForm={addForm} 
          handleAddChange={handleAddChange} 
          handleAddSave={handleAddSave} />
      </div>
    </>
  );
};

export default PasswordsPage;