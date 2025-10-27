import { IdentityEditDialogProps } from '@/types/Identity'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const IdentityEditDialog = ({
    editItem, 
    setEditItem, 
    editForm, 
    handleEditChange, 
    handleEditSave
}: IdentityEditDialogProps) => {
  return (
    <>
        <Dialog.Root open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <Dialog.Content>
            <Dialog.Title>Edit Identity</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <TextField.Root
                value={editForm?.firstName || ""}
                onChange={(e) => handleEditChange("firstName", e.target.value)}
                placeholder="First Name">
              </TextField.Root>
              <TextField.Root
                value={editForm?.lastName || ""}
                onChange={(e) => handleEditChange("lastName", e.target.value)}
                placeholder="Last Name">
              </TextField.Root>
              <TextField.Root
                value={editForm?.email || ""}
                onChange={(e) => handleEditChange("email", e.target.value)}
                placeholder="Email">
              </TextField.Root>
              <TextField.Root
                value={editForm?.phone || ""}
                onChange={(e) => handleEditChange("phone", e.target.value)}
                placeholder="Phone">
              </TextField.Root>
              <TextField.Root
                value={editForm?.address || ""}
                onChange={(e) => handleEditChange("address", e.target.value)}
                placeholder="Address">
              </TextField.Root>
              <TextField.Root
                value={editForm?.ssn || ""}
                onChange={(e) => handleEditChange("ssn", e.target.value)}
                placeholder="SSN">
              </TextField.Root>
              <Flex gap="2" mt="4" justify="end">
                <Button variant="soft" onClick={() => setEditItem(null)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="green"
                  onClick={handleEditSave}
                  disabled={!editForm?.firstName || !editForm?.lastName || !editForm?.ssn}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
    </>
  )
}

export default IdentityEditDialog
