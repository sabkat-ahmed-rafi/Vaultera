import React from "react";
import { Button, Flex, Table, Text } from "@radix-ui/themes";
import { CardListProps } from "@/types/Cards";


const CardList: React.FC<CardListProps> = ({
  loading,
  filteredCards,
  handleEditClick,
  handleDelete,
}) => {
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : filteredCards.length === 0 ? (
        <Text>No cards found.</Text>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Brand</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cardholder</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Last 4</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Expiry</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredCards.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.brand}</Table.Cell>
                <Table.Cell>{item.cardholderName || "-"}</Table.Cell>
                <Table.Cell>{item.last4 ? `**** **** **** ${item.last4}` : "-"}</Table.Cell>
                <Table.Cell>
                  {item.expMonth && item.expYear
                    ? `${item.expMonth}/${item.expYear}`
                    : "-"}
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <Button
                      size="1"
                      variant="soft"
                      color="blue"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="1"
                      variant="soft"
                      color="red"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

export default CardList;
