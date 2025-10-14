import React from "react";
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { CardItem } from "@/types/Cards";

export interface CardEditDialogProps {
  editItem: CardItem | null;
  setEditItem: (item: CardItem | null) => void;
  editForm: CardItem | null;
  handleEditChange: (field: keyof CardItem, value: string) => void;
  handleEditSave: () => void;
}

const CardEditDialog: React.FC<CardEditDialogProps> = ({
  editItem,
  setEditItem,
  editForm,
  handleEditChange,
  handleEditSave,
}) => {
  const isSaveDisabled =
    !editForm?.brand ||
    !editForm?.last4 ||
    !editForm?.expMonth ||
    !editForm?.expYear ||
    !editForm?.cardholderName;

  return (
    <Dialog.Root
      open={!!editItem}
      onOpenChange={(open) => {
        if (!open) setEditItem(null);
      }}
    >
      <Dialog.Content>
        <Dialog.Title>Edit Card</Dialog.Title>
        {editForm && (
          <Flex direction="column" gap="3" mt="3">
            <TextField.Root
              value={editForm.brand}
              onChange={(e) => handleEditChange("brand", e.target.value)}
              placeholder="Card Brand (e.g., Visa, Mastercard)"
            />

            <TextField.Root
              value={editForm.last4}
              onChange={(e) => handleEditChange("last4", e.target.value)}
              placeholder="Last 4 Digits"
              maxLength={4}
            />

            <Flex gap="2">
              <TextField.Root
                value={editForm.expMonth}
                onChange={(e) => handleEditChange("expMonth", e.target.value)}
                placeholder="Expiry Month (MM)"
                maxLength={2}
              />
              <TextField.Root
                value={editForm.expYear}
                onChange={(e) => handleEditChange("expYear", e.target.value)}
                placeholder="Expiry Year (YYYY)"
                maxLength={4}
              />
            </Flex>

            <TextField.Root
              value={editForm.cardholderName}
              onChange={(e) => handleEditChange("cardholderName", e.target.value)}
              placeholder="Cardholder Name"
            />

            <Flex gap="2" mt="4" justify="end">
              <Button variant="soft" onClick={() => setEditItem(null)}>
                Cancel
              </Button>
              <Button
                variant="solid"
                color="blue"
                onClick={handleEditSave}
                disabled={isSaveDisabled}
              >
                Save
              </Button>
            </Flex>
          </Flex>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CardEditDialog;
