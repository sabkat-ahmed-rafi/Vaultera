import { AddBankAccountDialogProps } from '@/types/BankAccount'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

const AddBankAccountDialog = ({
    addOpen, 
    setAddOpen, 
    addForm, 
    handleAddChange, 
    handleAddSave
}: AddBankAccountDialogProps) => {
  return (
    <>
        <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
          <Dialog.Content>
            <Dialog.Title>Add New Bank Account</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <TextField.Root
                value={addForm.bankName}
                onChange={(e) => handleAddChange("bankName", e.target.value)}
                placeholder="Bank Name">
              </TextField.Root>
              <TextField.Root
                value={addForm.accountNumber}
                onChange={(e) => handleAddChange("accountNumber", e.target.value)}
                placeholder="Account Number">
              </TextField.Root>
              <TextField.Root
                value={addForm.routingNumber ?? ""}
                onChange={(e) => handleAddChange("routingNumber", e.target.value)}
                placeholder="Routing Number">
              </TextField.Root>
              <TextField.Root
                value={addForm.accountType ?? ""}
                onChange={(e) => handleAddChange("accountType", e.target.value)}
                placeholder="Account Type (Checking, Savings, etc.)">
              </TextField.Root>
              <Flex gap="2" mt="4" justify="end">
                <Button variant="soft" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="green"
                  onClick={handleAddSave}
                  disabled={!addForm.bankName || !addForm.accountNumber}
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

export default AddBankAccountDialog
