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


const fetchPasswords = async (): Promise<PasswordItem[]> => {
  // Replace with your API call
  return [
    {
      id: "1",
      name: "GitHub",
      username: "user123",
      password: "mygithubpassword",
      url: "https://github.com",
    },
    {
      id: "2",
      name: "Google",
      username: "user456",
      password: "mygooglepassword",
      url: "https://google.com",
    },
  ];
};

const PasswordsPage: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordIds, setShowPasswordIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<PasswordItem | null>(null);
  const [editForm, setEditForm] = useState<PasswordItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<PasswordItem>({
    id: "",
    name: "",
    username: "",
    password: "",
    url: "",
  });

  useEffect(() => {
    fetchPasswords().then((data) => {
      setPasswords(data);
      setLoading(false);
    });
  }, []);

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

  const handleEditSave = () => {
    if (editForm) {
      setPasswords((prev) =>
        prev.map((item) => (item.id === editForm.id ? editForm : item))
      );
      setEditItem(null);
      setEditForm(null);
    }
  };

  const handleDelete = (id: string) => {
    setPasswords((prev) => prev.filter((item) => item.id !== id));
  };

  // Add new password logic
  const handleAddChange = (field: keyof PasswordItem, value: string) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = () => {
    if (addForm.name && addForm.username && addForm.password) {
      setPasswords((prev) => [
        ...prev,
        { ...addForm, id: Date.now().toString() },
      ]);
      setAddForm({
        id: "",
        name: "",
        username: "",
        password: "",
        url: "",
      });
      setAddOpen(false);
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