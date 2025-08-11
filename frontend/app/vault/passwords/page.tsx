'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  TextField,
  Dialog,
  Flex,
  Text,
} from "@radix-ui/themes";
import { RiAddLine, RiShieldKeyholeLine } from "react-icons/ri";

type PasswordItem = {
  id: string;
  name: string;
  username: string;
  password: string;
  url?: string;
};

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
        {loading ? (
          <Text>Loading...</Text>
        ) : filteredPasswords.length === 0 ? (
          <Text>No passwords found.</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Password</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>URL</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredPasswords.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell className="w-[20%]">
                    {showPasswordIds.has(item.id) ? item.password : "********"}
                  </Table.Cell>
                  <Table.Cell>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#2563eb", textDecoration: "underline" }}
                      >
                        {item.url}
                      </a>
                    ) : (
                      "-"
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="2">
                      <Button
                        size="1"
                        variant="soft"
                        onClick={() => handleShowPassword(item.id)}
                      >
                        {showPasswordIds.has(item.id) ? "Hide" : "Show"}
                      </Button>
                      <Button
                        size="1"
                        variant="soft"
                        color="blue"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="1"
                        variant="soft"
                        color="red"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}

        {/* Edit Dialog */}
        <Dialog.Root open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
          <Dialog.Content>
            <Dialog.Title>Edit Password</Dialog.Title>
            {editForm && (
              <Flex direction="column" gap="3" mt="3">
                <TextField.Root 
                  value={editForm.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  placeholder="Name">

                </TextField.Root>
                <TextField.Root
                  value={editForm.username}
                  onChange={(e) => handleEditChange("username", e.target.value)}
                  placeholder="Username">

                </TextField.Root>
                <TextField.Root
                  value={editForm.password}
                  onChange={(e) => handleEditChange("password", e.target.value)}
                  placeholder="Password">
  
                </TextField.Root>
                <TextField.Root
                  value={editForm.url ?? ""}
                  onChange={(e) => handleEditChange("url", e.target.value)}
                  placeholder="URL">

                </TextField.Root>
                <Flex gap="2" mt="4" justify="end">
                  <Button variant="soft" onClick={() => setEditItem(null)}>
                    Cancel
                  </Button>
                  <Button variant="solid" color="blue" onClick={handleEditSave}>
                    Save
                  </Button>
                </Flex>
              </Flex>
            )}
          </Dialog.Content>
        </Dialog.Root>

        {/* Add Dialog */}
        <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
          <Dialog.Content>
            <Dialog.Title>Add New Password</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <TextField.Root
                value={addForm.name}
                onChange={(e) => handleAddChange("name", e.target.value)}
                placeholder="Name">

              </TextField.Root>
              <TextField.Root
                value={addForm.username}
                onChange={(e) => handleAddChange("username", e.target.value)}
                placeholder="Username">
              </TextField.Root>
              <TextField.Root
                value={addForm.password}
                onChange={(e) => handleAddChange("password", e.target.value)}
                placeholder="Password">
              </TextField.Root>
              <TextField.Root
                value={addForm.url ?? ""}
                onChange={(e) => handleAddChange("url", e.target.value)}
                placeholder="URL">
              </TextField.Root>
              <Flex gap="2" mt="4" justify="end">
                <Button variant="soft" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="green"
                  onClick={handleAddSave}
                  disabled={!addForm.name || !addForm.username || !addForm.password}
                >
                  Add
                </Button>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
};

export default PasswordsPage;