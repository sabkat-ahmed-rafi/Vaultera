'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  Flex,
} from "@radix-ui/themes";
import { RiAddLine, RiUserLine } from "react-icons/ri";
import IdentityList from "@/components/Identity/IdentityList";
import { IdentityItem } from "@/types/Identity";
import IdentityEditDialog from "@/components/Identity/IdentityEditDialog";
import AddIdentityDialog from "@/components/Identity/AddIdentityDialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosInstance } from "axios";
import { config } from "@/config/config";
import { useAppSelector } from "@/redux/hooks";
import { decryptSecret, encryptSecret } from "cryptonism";
import toast from "react-hot-toast";


const fetchIdentities = async (decryptedKey: Uint8Array | null, axiosSecure: AxiosInstance): Promise<IdentityItem[]> => {
  const res = await axiosSecure.get(`/api/vault/identities`);
  const items = res.data.items as Array<{ 
    id: string; 
    firstName: string; 
    lastName: string; 
    email?: string; 
    phone?: string;
    address?: string;
    encryptedSecret: string; 
    iv: string; 
  }>;

  if(!decryptedKey) return items.map(i => ({ 
    id: i.id, 
    firstName: i.firstName, 
    lastName: i.lastName, 
    email: i.email, 
    phone: i.phone,
    address: i.address,
    ssn: ""
  }));

  const decrypted = await Promise.all(items.map(async (i) => {
    const dec = await decryptSecret({ encryptedSecret: i.encryptedSecret, iv: i.iv, decryptedKey });
    if(!dec?.success) {
      return { 
        id: i.id, 
        firstName: i.firstName, 
        lastName: i.lastName, 
        email: i.email, 
        phone: i.phone,
        address: i.address,
        ssn: ""
      };
    }
    return { 
      id: i.id, 
      firstName: i.firstName, 
      lastName: i.lastName, 
      email: i.email, 
      phone: i.phone,
      address: i.address,
      ssn: dec.decryptedSecret
    };
  }));

  return decrypted;
};

const IdentityPage: React.FC = () => {
  const [identities, setIdentities] = useState<IdentityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSSNIds, setShowSSNIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<IdentityItem | null>(null);
  const [editForm, setEditForm] = useState<IdentityItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [addForm, setAddForm] = useState<IdentityItem>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    ssn: "",
  });

  const { decryptedVaultKey } = useAppSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchIdentities(decryptedVaultKey, axiosSecure);
        setIdentities(data);
      } catch (_) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    })();
  }, [decryptedVaultKey, axiosSecure]);

  const handleShowSSN = (id: string) => {
    setShowSSNIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredIdentities = identities.filter(
    (item) =>
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item: IdentityItem) => {
    setEditItem(item);
    setEditForm(item);
  };

  const handleEditChange = (field: keyof IdentityItem, value: string) => {
    setEditForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      if (!editForm) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: editForm.ssn, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      await axiosSecure.put(`/api/vault/identities/${editForm.id}`, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      setIdentities((prev) => prev.map((item) => (item.id === editForm.id ? editForm : item)));
      setEditItem(null);
      setEditForm(null);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/api/vault/identities/${id}`);
      setIdentities((prev) => prev.filter((item) => item.id !== id));
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  // Add new identity logic
  const handleAddChange = (field: keyof IdentityItem, value: string) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = async () => {
    try {
      if (!addForm.firstName || !addForm.lastName || !addForm.ssn) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: addForm.ssn, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      const res = await axiosSecure.post(`/api/vault/identities`, {
        firstName: addForm.firstName,
        lastName: addForm.lastName,
        email: addForm.email,
        phone: addForm.phone,
        address: addForm.address,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      const created = res.data as { id: string };
      setIdentities((prev) => [ ...prev, { ...addForm, id: created.id } ]);
      setAddForm({ id: "", firstName: "", lastName: "", email: "", phone: "", address: "", ssn: "" });
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
            <RiUserLine className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Identities</h1>
            <p className="text-gray-400">{identities.length} identities</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Flex mb="4" gap="3">
          <TextField.Root
            placeholder="Search by name or email"
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
        {/* Identity Lists */}
        <IdentityList
        loading={loading}
        filteredIdentities={filteredIdentities} 
        showSSNIds={showSSNIds}
        handleShowSSN={handleShowSSN}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete} />

        {/* Edit Dialog */}
        <IdentityEditDialog
          editItem={editItem}
          setEditItem={setEditItem}
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />

        {/* Add Dialog */}
        <AddIdentityDialog 
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addForm={addForm} 
          handleAddChange={handleAddChange} 
          handleAddSave={handleAddSave} />
      </div>
    </>
  );
};

export default IdentityPage;
