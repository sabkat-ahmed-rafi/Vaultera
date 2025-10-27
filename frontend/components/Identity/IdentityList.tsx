import { IdentityListProps } from '@/types/Identity'
import { Button, Flex, Table, Text } from '@radix-ui/themes'
import React from 'react'

const IdentityList = ({ loading, filteredIdentities, showSSNIds, handleShowSSN, handleEditClick, handleDelete }: IdentityListProps) => {
  return (
    <>
    { loading ? (
          <Text>Loading...</Text>
        ) : filteredIdentities.length === 0 ? (
          <Text>No identities found.</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>SSN</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredIdentities.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.firstName} {item.lastName}</Table.Cell>
                  <Table.Cell>{item.email || "-"}</Table.Cell>
                  <Table.Cell>{item.phone || "-"}</Table.Cell>
                  <Table.Cell className="w-[20%]">
                    {showSSNIds.has(item.id) ? item.ssn : "***-**-****"}
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="2">
                      <Button
                        size="1"
                        variant="soft"
                        onClick={() => handleShowSSN(item.id)}
                      >
                        {showSSNIds.has(item.id) ? "Hide" : "Show"}
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

export default IdentityList
