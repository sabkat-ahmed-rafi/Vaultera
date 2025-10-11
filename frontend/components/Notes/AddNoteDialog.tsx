import { AddNoteDialogProps } from '@/types/Notes'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const AddNoteDialog = ({
    addOpen, 
    setAddOpen, 
    addForm, 
    handleAddChange, 
    handleAddSave
}: AddNoteDialogProps) => {
  return (
    <>
        <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
          <Dialog.Content>
            <Dialog.Title>Add New Password</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <TextField.Root
                value={addForm.title}
                onChange={(e) => handleAddChange("title", e.target.value)}
                placeholder="Title">

              </TextField.Root>
              <TextField.Root
                value={addForm.note}
                onChange={(e) => handleAddChange("note", e.target.value)}
                placeholder="Note">
              </TextField.Root>
              <Flex gap="2" mt="4" justify="end">
                <Button variant="soft" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="green"
                  onClick={handleAddSave}
                  disabled={!addForm.title || !addForm.note}
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

export default AddNoteDialog