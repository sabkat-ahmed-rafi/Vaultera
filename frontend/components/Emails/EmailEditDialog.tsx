import { EmailEditDialogProps } from '@/types/Emails'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const EmailEditDialog = ({ 
    editItem, 
    setEditItem, 
    editForm, 
    handleEditChange, 
    handleEditSave
 }: EmailEditDialogProps) => {
  return (
    <>
        <Dialog.Root open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
          <Dialog.Content>
            <Dialog.Title>Edit Email</Dialog.Title>
            {editForm && (
              <Flex direction="column" gap="3" mt="3">
                <TextField.Root 
                  value={editForm.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  placeholder="Email">

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

export default EmailEditDialog