import React from "react";
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { AddCardDialogProps } from "@/types/Cards";


const AddCardDialog: React.FC<AddCardDialogProps> = ({
  addOpen,
  setAddOpen,
  addForm,
  handleAddChange,
  handleAddSave,
}) => {
  const isAddDisabled =
    !addForm.brand ||
    !addForm.last4 ||
    !addForm.expMonth ||
    !addForm.expYear ||
    !addForm.cardholderName;

  return (
    <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
      <Dialog.Content>
        <Dialog.Title>Add New Card</Dialog.Title>
        <Flex direction="column" gap="3" mt="3">
          <TextField.Root
            value={addForm.brand}
            onChange={(e) => handleAddChange("brand", e.target.value)}
            placeholder="Card Brand (e.g., Visa, Mastercard)"
          />

          <TextField.Root
            value={addForm.last4}
            onChange={(e) => handleAddChange("last4", e.target.value)}
            placeholder="Last 4 Digits"
            maxLength={4}
          />

          <Flex gap="2">
            <TextField.Root
              value={addForm.expMonth}
              onChange={(e) => handleAddChange("expMonth", e.target.value)}
              placeholder="Expiry Month (MM)"
              maxLength={2}
            />
            <TextField.Root
              value={addForm.expYear}
              onChange={(e) => handleAddChange("expYear", e.target.value)}
              placeholder="Expiry Year (YYYY)"
              maxLength={4}
            />
          </Flex>

          <TextField.Root
            value={addForm.cardholderName}
            onChange={(e) => handleAddChange("cardholderName", e.target.value)}
            placeholder="Cardholder Name"
          />

          <Flex gap="2" mt="4" justify="end">
            <Button variant="soft" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="green"
              onClick={handleAddSave}
              disabled={isAddDisabled}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddCardDialog;
