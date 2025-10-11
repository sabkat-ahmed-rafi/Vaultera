import { NoteEditDialogProps } from '@/types/Notes'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const NoteEditDialog = ({ 
    editItem, 
    setEditItem, 
    editForm, 
    handleEditChange, 
    handleEditSave
 }: NoteEditDialogProps) => {
  return (
    <>
        <Dialog.Root open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
          <Dialog.Content>
            <Dialog.Title>Edit Note</Dialog.Title>
            {editForm && (
              <Flex direction="column" gap="3" mt="3">
                <TextField.Root 
                  value={editForm.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                  placeholder="Title">

                </TextField.Root>
                <TextField.Root
                  value={editForm.note}
                  onChange={(e) => handleEditChange("note", e.target.value)}
                  placeholder="Note">
  
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

export default NoteEditDialog