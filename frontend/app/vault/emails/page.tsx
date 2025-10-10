'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Flex,
} from "@radix-ui/themes";
import { RiAddLine, RiShieldKeyholeLine } from "react-icons/ri";
import { EmailItem } from "@/types/Emails";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosInstance } from "axios";
import { useAppSelector } from "@/redux/hooks";
import { decryptSecret, encryptSecret } from "cryptonism";
import toast from "react-hot-toast";
import EmailList from "@/components/Emails/EmailList";
import EmailEditDialog from "@/components/Emails/EmailEditDialog";
import AddEmailDialog from "@/components/Emails/AddEmailDialog";
import { TfiEmail } from "react-icons/tfi";


const fetchEmails = async (decryptedKey: Uint8Array | null, axiosSecure: AxiosInstance): Promise<EmailItem[]> => {
  const res = await axiosSecure.get(`/api/vault/emails`);
  const items = res.data.items as Array<{ id: string; email: string; username: string; encryptedSecret: string; iv: string; }>;

  if(!decryptedKey) return items.map(i => ({ id: i.id, email: i.email, username: i.username, password: "" }));

  const decrypted = await Promise.all(items.map(async (i) => {
    const dec = await decryptSecret({ encryptedSecret: i.encryptedSecret, iv: i.iv, decryptedKey });
    if(!dec?.success) {
      return { id: i.id, email: i.email, username: i.username, password: "" };
    }
    return { id: i.id, email: i.email, username: i.username, password: dec.decryptedSecret };
  }));

  return decrypted;
};

const Email: React.FC = () => {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordIds, setShowPasswordIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<EmailItem | null>(null);
  const [editForm, setEditForm] = useState<EmailItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [addForm, setAddForm] = useState<EmailItem>({
    id: "",
    email: "",
    username: "",
    password: "",
  });

  const { decryptedVaultKey } = useAppSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEmails(decryptedVaultKey, axiosSecure);
        setEmails(data);
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

  const filteredPasswords = emails.filter(
    (item) =>
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item: EmailItem) => {
    setEditItem(item);
    setEditForm(item);
  };

  const handleEditChange = (field: keyof EmailItem, value: string) => {
    setEditForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      if (!editForm) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: editForm.password, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      await axiosSecure.put(`/api/vault/emails/${editForm.id}`, {
        email: editForm.email,
        username: editForm.username,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      setEmails((prev) => prev.map((item) => (item.id === editForm.id ? editForm : item)));
      setEditItem(null);
      setEditForm(null);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/api/vault/emails/${id}`);
      setEmails((prev) => prev.filter((item) => item.id !== id));
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddChange = (field: keyof EmailItem, value: string) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = async () => {
    try {
      if (!addForm.email || !addForm.username || !addForm.password) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: addForm.password, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      const res = await axiosSecure.post(`/api/vault/passwords`, {
        email: addForm.email,
        username: addForm.username,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      const created = res.data as { id: string };
      setEmails((prev) => [ ...prev, { ...addForm, id: created.id } ]);
      setAddForm({ id: "", email: "", username: "", password: "" });
      setAddOpen(false);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className='mt-5 ml-14 md:mt-5 md:ml-5 lg:ml-10'>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center ">
            <TfiEmail className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Email</h1>
            <p className="text-gray-400">{emails.length} Emails</p>
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
        <EmailList
        loading={loading}
        filteredPasswords={filteredPasswords} 
        showPasswordIds={showPasswordIds}
        handleShowPassword={handleShowPassword}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete} />

        {/* Edit Dialog */}
        <EmailEditDialog
          editItem={editItem}
          setEditItem={setEditItem}
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />

        {/* Add Dialog */}
        <AddEmailDialog
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addForm={addForm} 
          handleAddChange={handleAddChange} 
          handleAddSave={handleAddSave} />
      </div>
    </>
  );
};

export default Email;