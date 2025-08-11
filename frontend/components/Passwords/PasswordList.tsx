import { PasswordListProps } from '@/types/Passwords'
import { Button, Flex, Table, Text } from '@radix-ui/themes'
import React from 'react'



const PasswordList = ({ loading, filteredPasswords, showPasswordIds, handleShowPassword, handleEditClick, handleDelete }: PasswordListProps) => {
  return (
    <>
    { loading ? (
          <Text>Loading...</Text>
        ) : filteredPasswords.length === 0 ? (
          <Text>No passwords found.</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Password</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>URL</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredPasswords.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell className="w-[20%]">
                    {showPasswordIds.has(item.id) ? item.password : "********"}
                  </Table.Cell>
                  <Table.Cell>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#2563eb", textDecoration: "underline" }}
                      >
                        {item.url}
                      </a>
                    ) : (
                      "-"
                    )}
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

export default PasswordList