import { BankAccountEditDialogProps } from '@/types/BankAccount'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const BankAccountEditDialog = ({
    editItem, 
    setEditItem, 
    editForm, 
    handleEditChange, 
    handleEditSave
}: BankAccountEditDialogProps) => {
  return (
    <>
        <Dialog.Root open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <Dialog.Content>
            <Dialog.Title>Edit Bank Account</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <TextField.Root
                value={editForm?.bankName || ""}
                onChange={(e) => handleEditChange("bankName", e.target.value)}
                placeholder="Bank Name">
              </TextField.Root>
              <TextField.Root
                value={editForm?.accountNumber || ""}
                onChange={(e) => handleEditChange("accountNumber", e.target.value)}
                placeholder="Account Number">
              </TextField.Root>
              <TextField.Root
                value={editForm?.routingNumber || ""}
                onChange={(e) => handleEditChange("routingNumber", e.target.value)}
                placeholder="Routing Number">
              </TextField.Root>
              <TextField.Root
                value={editForm?.accountType || ""}
                onChange={(e) => handleEditChange("accountType", e.target.value)}
                placeholder="Account Type (Checking, Savings, etc.)">
              </TextField.Root>
              <Flex gap="2" mt="4" justify="end">
                <Button variant="soft" onClick={() => setEditItem(null)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="green"
                  onClick={handleEditSave}
                  disabled={!editForm?.bankName || !editForm?.accountNumber}
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

export default BankAccountEditDialog
