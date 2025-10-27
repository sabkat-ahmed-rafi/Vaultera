import { AddIdentityDialogProps } from '@/types/Identity'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const AddIdentityDialog = ({
    addOpen, 
    setAddOpen, 
    addForm, 
    handleAddChange, 
    handleAddSave
}: AddIdentityDialogProps) => {
  return (
    <>
        <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
          <Dialog.Content>
            <Dialog.Title>Add New Identity</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <TextField.Root
                value={addForm.firstName}
                onChange={(e) => handleAddChange("firstName", e.target.value)}
                placeholder="First Name">
              </TextField.Root>
              <TextField.Root
                value={addForm.lastName}
                onChange={(e) => handleAddChange("lastName", e.target.value)}
                placeholder="Last Name">
              </TextField.Root>
              <TextField.Root
                value={addForm.email ?? ""}
                onChange={(e) => handleAddChange("email", e.target.value)}
                placeholder="Email">
              </TextField.Root>
              <TextField.Root
                value={addForm.phone ?? ""}
                onChange={(e) => handleAddChange("phone", e.target.value)}
                placeholder="Phone">
              </TextField.Root>
              <TextField.Root
                value={addForm.address ?? ""}
                onChange={(e) => handleAddChange("address", e.target.value)}
                placeholder="Address">
              </TextField.Root>
              <TextField.Root
                value={addForm.ssn}
                onChange={(e) => handleAddChange("ssn", e.target.value)}
                placeholder="SSN">
              </TextField.Root>
              <Flex gap="2" mt="4" justify="end">
                <Button variant="soft" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="green"
                  onClick={handleAddSave}
                  disabled={!addForm.firstName || !addForm.lastName || !addForm.ssn}
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

export default AddIdentityDialog
