import { AddEmailDialogProps } from '@/types/Emails'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const AddEmailDialog = ({
    addOpen, 
    setAddOpen, 
    addForm, 
    handleAddChange, 
    handleAddSave
}: AddEmailDialogProps) => {
  return (
    <>
        <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
          <Dialog.Content>
            <Dialog.Title>Add New Email</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <TextField.Root
                value={addForm.email}
                onChange={(e) => handleAddChange("email", e.target.value)}
                placeholder="Email">

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
              <Flex gap="2" mt="4" justify="end">
                <Button variant="soft" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="green"
                  onClick={handleAddSave}
                  disabled={!addForm.email || !addForm.username || !addForm.password}
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

export default AddEmailDialog