'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Flex,
} from "@radix-ui/themes";
import { RiAddLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";
import CardList from "@/components/Cards/CardList";
import CardEditDialog from "@/components/Cards/CardEditDialog";
import AddCardDialog from "@/components/Cards/AddCardDialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosInstance } from "axios";
import { useAppSelector } from "@/redux/hooks";
import { encryptSecret, decryptSecret } from "cryptonism";
import toast from "react-hot-toast";
import { CardItem } from "@/types/Cards";



const fetchCards = async (decryptedKey: Uint8Array | null, axiosSecure: AxiosInstance): Promise<CardItem[]> => {
  const res = await axiosSecure.get("/api/vault/cards");
  const items: CardItem[] = res.data.items;

  if (!decryptedKey) return items.map(i => ({ ...i }));

  const decrypted = await Promise.all(items.map(async (i) => {
    if (!i.encryptedData || !i.iv) return i;

    const dec = await decryptSecret({ encryptedSecret: i.encryptedData, iv: i.iv, decryptedKey });
    if (!dec?.success) return i;

    const data = JSON.parse(dec.decryptedSecret);
    return { ...i, ...data };
  }));

  return decrypted;
};

const CardsPage: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<CardItem | null>(null);
  const [editForm, setEditForm] = useState<CardItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const [addForm, setAddForm] = useState<CardItem>({
    id: "",
    brand: "",
    last4: "",
    expMonth: "",
    expYear: "",
    cardholderName: "",
  });

  const { decryptedVaultKey } = useAppSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCards(decryptedVaultKey, axiosSecure);
        setCards(data);
      } catch (_) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    })();
  }, [decryptedVaultKey]);

  const filteredCards = cards.filter(
    (item) =>
      item.brand.toLowerCase().includes(search.toLowerCase()) ||
      item.cardholderName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item: CardItem) => {
    setEditItem(item);
    setEditForm(item);
  };

  const handleEditChange = (field: keyof CardItem, value: string) => {
    setEditForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleEditSave = async () => {
    try {
      if (!editForm || !decryptedVaultKey) return;

      const sensitiveData = {
        last4: editForm.last4,
        expMonth: editForm.expMonth,
        expYear: editForm.expYear,
        cardholderName: editForm.cardholderName,
      };

      const enc = await encryptSecret({ secret: JSON.stringify(sensitiveData), decryptedKey: decryptedVaultKey });
      if (!enc?.success) throw new Error("encrypt-failed");

      await axiosSecure.put(`/api/vault/cards/${editForm.id}`, {
        brand: editForm.brand,
        encryptedData: enc.encryptedSecret,
        iv: enc.iv,
      });

      setCards((prev) => prev.map((item) => (item.id === editForm.id ? editForm : item)));
      setEditItem(null);
      setEditForm(null);
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/api/vault/cards/${id}`);
      setCards((prev) => prev.filter((item) => item.id !== id));
    } catch (_) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddChange = (field: keyof CardItem, value: string) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = async () => {
    try {
      if (!addForm.brand || !addForm.last4 || !addForm.expMonth || !addForm.expYear || !addForm.cardholderName) return;
      if (!decryptedVaultKey) return;

      const sensitiveData = {
        last4: addForm.last4,
        expMonth: addForm.expMonth,
        expYear: addForm.expYear,
        cardholderName: addForm.cardholderName,
      };

      const enc = await encryptSecret({ secret: JSON.stringify(sensitiveData), decryptedKey: decryptedVaultKey });
      if (!enc?.success) throw new Error("encrypt-failed");

      const res = await axiosSecure.post("/api/vault/cards", {
        brand: addForm.brand,
        encryptedData: enc.encryptedSecret,
        iv: enc.iv,
      });

      const created = res.data as { id: string };
      setCards((prev) => [...prev, { ...addForm, id: created.id }]);
      setAddForm({ id: "", brand: "", last4: "", expMonth: "", expYear: "", cardholderName: "" });
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
            <FaRegCreditCard className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Cards</h1>
            <p className="text-gray-400">{cards.length} cards</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Flex mb="4" gap="3">
          <TextField.Root
            placeholder="Search by brand or cardholder"
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

        {/* Card List */}
        <CardList
          loading={loading}
          filteredCards={filteredCards} 
          handleEditClick={handleEditClick}
          handleDelete={handleDelete} 
        />

        {/* Edit Dialog */}
        <CardEditDialog
          editItem={editItem}
          setEditItem={setEditItem}
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />

        {/* Add Dialog */}
        <AddCardDialog 
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addForm={addForm} 
          handleAddChange={handleAddChange} 
          handleAddSave={handleAddSave} 
        />
      </div>
    </>
  );
};

export default CardsPage;
