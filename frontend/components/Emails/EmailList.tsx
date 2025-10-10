import { EmailListProps } from '@/types/Emails'
import { Button, Flex, Table, Text } from '@radix-ui/themes'
import React from 'react'



const EmailList = ({ loading, filteredPasswords, showPasswordIds, handleShowPassword, handleEditClick, handleDelete }: EmailListProps) => {
  return (
    <>
    { loading ? (
          <Text>Loading...</Text>
        ) : filteredPasswords.length === 0 ? (
          <Text>No emails found.</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Password</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredPasswords.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell className="w-[20%]">
                    {showPasswordIds.has(item.id) ? item.password : "********"}
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="2">
                      <Button
                        size="1"
                        variant="soft"
                        onClick={() => handleShowPassword(item.id)}
                      >
                        {showPasswordIds.has(item.id) ? "Hide" : "Show"}
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

export default EmailList