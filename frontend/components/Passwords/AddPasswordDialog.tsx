import { AddPasswordDialogProps } from '@/types/Passwords'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const AddPasswordDialog = ({
    addOpen, 
    setAddOpen, 
    addForm, 
    handleAddChange, 
    handleAddSave
}: AddPasswordDialogProps) => {
  return (
    <>
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
    </>
  )
}

export default AddPasswordDialog