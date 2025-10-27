'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  Flex,
} from "@radix-ui/themes";
import { RiAddLine, RiBankLine } from "react-icons/ri";
import BankAccountList from "@/components/BankAccount/BankAccountList";
import { BankAccountItem } from "@/types/BankAccount";
import BankAccountEditDialog from "@/components/BankAccount/BankAccountEditDialog";
import AddBankAccountDialog from "@/components/BankAccount/AddBankAccountDialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosInstance } from "axios";
import { config } from "@/config/config";
import { useAppSelector } from "@/redux/hooks";
import { decryptSecret, encryptSecret } from "cryptonism";
import toast from "react-hot-toast";


const fetchBankAccounts = async (decryptedKey: Uint8Array | null, axiosSecure: AxiosInstance): Promise<BankAccountItem[]> => {
  const res = await axiosSecure.get(`/api/vault/bank-accounts`);
  const items = res.data.items as Array<{ 
    id: string; 
    bankName: string; 
    accountNumber: string; 
    routingNumber?: string; 
    accountType?: string;
    encryptedSecret: string; 
    iv: string; 
  }>;

  if(!decryptedKey) return items.map(i => ({ 
    id: i.id, 
    bankName: i.bankName, 
    accountNumber: "", 
    routingNumber: i.routingNumber, 
    accountType: i.accountType 
  }));

  const decrypted = await Promise.all(items.map(async (i) => {
    const dec = await decryptSecret({ encryptedSecret: i.encryptedSecret, iv: i.iv, decryptedKey });
    if(!dec?.success) {
      return { 
        id: i.id, 
        bankName: i.bankName, 
        accountNumber: "", 
        routingNumber: i.routingNumber, 
        accountType: i.accountType 
      };
    }
    return { 
      id: i.id, 
      bankName: i.bankName, 
      accountNumber: dec.decryptedSecret, 
      routingNumber: i.routingNumber, 
      accountType: i.accountType 
    };
  }));

  return decrypted;
};

const BankAccountPage: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccountItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAccountIds, setShowAccountIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<BankAccountItem | null>(null);
  const [editForm, setEditForm] = useState<BankAccountItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [addForm, setAddForm] = useState<BankAccountItem>({
    id: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "",
  });

  const { decryptedVaultKey } = useAppSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBankAccounts(decryptedVaultKey, axiosSecure);
        setBankAccounts(data);
      } catch (_) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    })();
  }, [decryptedVaultKey, axiosSecure]);

  const handleShowAccount = (id: string) => {
    setShowAccountIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredBankAccounts = bankAccounts.filter(
    (item) =>
      item.bankName.toLowerCase().includes(search.toLowerCase()) ||
      item.accountType?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item: BankAccountItem) => {
    setEditItem(item);
    setEditForm(item);
  };

  const handleEditChange = (field: keyof BankAccountItem, value: string) => {
    setEditForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      if (!editForm) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: editForm.accountNumber, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      await axiosSecure.put(`/api/vault/bank-accounts/${editForm.id}`, {
        bankName: editForm.bankName,
        routingNumber: editForm.routingNumber,
        accountType: editForm.accountType,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      setBankAccounts((prev) => prev.map((item) => (item.id === editForm.id ? editForm : item)));
      setEditItem(null);
      setEditForm(null);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/api/vault/bank-accounts/${id}`);
      setBankAccounts((prev) => prev.filter((item) => item.id !== id));
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  // Add new bank account logic
  const handleAddChange = (field: keyof BankAccountItem, value: string) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = async () => {
    try {
      if (!addForm.bankName || !addForm.accountNumber) return;
      if (!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: addForm.accountNumber, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error("encrypt-failed");
      const res = await axiosSecure.post(`/api/vault/bank-accounts`, {
        bankName: addForm.bankName,
        routingNumber: addForm.routingNumber,
        accountType: addForm.accountType,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      });
      const created = res.data as { id: string };
      setBankAccounts((prev) => [ ...prev, { ...addForm, id: created.id } ]);
      setAddForm({ id: "", bankName: "", accountNumber: "", routingNumber: "", accountType: "" });
      setAddOpen(false);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className='mt-5 ml-14 md:mt-5 md:ml-5 lg:ml-10'>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center ">
            <RiBankLine className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Bank Accounts</h1>
            <p className="text-gray-400">{bankAccounts.length} bank accounts</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Flex mb="4" gap="3">
          <TextField.Root
            placeholder="Search by bank name or account type"
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
        {/* Bank Account Lists */}
        <BankAccountList
        loading={loading}
        filteredBankAccounts={filteredBankAccounts} 
        showAccountIds={showAccountIds}
        handleShowAccount={handleShowAccount}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete} />

        {/* Edit Dialog */}
        <BankAccountEditDialog
          editItem={editItem}
          setEditItem={setEditItem}
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />

        {/* Add Dialog */}
        <AddBankAccountDialog 
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addForm={addForm} 
          handleAddChange={handleAddChange} 
          handleAddSave={handleAddSave} />
      </div>
    </>
  );
};

export default BankAccountPage;
