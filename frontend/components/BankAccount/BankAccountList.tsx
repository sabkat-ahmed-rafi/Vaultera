import { BankAccountListProps } from '@/types/BankAccount'
import { Button, Flex, Table, Text } from '@radix-ui/themes'
import React from 'react'

const BankAccountList = ({ loading, filteredBankAccounts, showAccountIds, handleShowAccount, handleEditClick, handleDelete }: BankAccountListProps) => {
  return (
    <>
    { loading ? (
          <Text>Loading...</Text>
        ) : filteredBankAccounts.length === 0 ? (
          <Text>No bank accounts found.</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Bank Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Account Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Routing Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Account Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredBankAccounts.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.bankName}</Table.Cell>
                  <Table.Cell className="w-[20%]">
                    {showAccountIds.has(item.id) ? item.accountNumber : "****"}
                  </Table.Cell>
                  <Table.Cell>{item.routingNumber || "-"}</Table.Cell>
                  <Table.Cell>{item.accountType || "-"}</Table.Cell>
                  <Table.Cell>
                    <Flex gap="2">
                      <Button
                        size="1"
                        variant="soft"
                        onClick={() => handleShowAccount(item.id)}
                      >
                        {showAccountIds.has(item.id) ? "Hide" : "Show"}
                      </Button>
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
  )
}

export default BankAccountList
