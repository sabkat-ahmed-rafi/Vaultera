import { PasswordEditDialogProps } from '@/types/Passwords'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const PasswordEditDialog = ({ 
    editItem, 
    setEditItem, 
    editForm, 
    handleEditChange, 
    handleEditSave
 }: PasswordEditDialogProps) => {
  return (
    <>
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
    </>
  )
}

export default PasswordEditDialog