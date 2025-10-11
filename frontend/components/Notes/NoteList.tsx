import { NoteListProps } from '@/types/Notes'
import { Button, Flex, Table, Text } from '@radix-ui/themes'
import React from 'react'



const NoteList = ({ loading, filteredNotes, showNotesIds, handleShowNote, handleEditClick, handleDelete }: NoteListProps) => {
  return (
    <>
    { loading ? (
          <Text>Loading...</Text>
        ) : filteredNotes.length === 0 ? (
          <Text>No passwords found.</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Note</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredNotes.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell className="w-[20%]">
                    {showNotesIds.has(item.id) ? item.note : "********"}
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="2">
                      <Button
                        size="1"
                        variant="soft"
                        onClick={() => handleShowNote(item.id)}
                      >
                        {showNotesIds.has(item.id) ? "Hide" : "Show"}
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

export default NoteList