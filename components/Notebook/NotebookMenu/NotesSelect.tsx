import React from 'react';

import {
    Button,
    CheckboxGroup,
    Flex,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

import AddNotes from "@/components/Home/AddNotes";
import Note from "@/components/Home/NotesMenu/Note";
import UploadNotes from "@/components/Home/UploadNotes";

import useAuth from "@/hooks/useAuth";
import useNotes from "@/hooks/queries/useNotes";

import {Notebook as NotebookType} from "@/types/Notebook";
import {Note as NoteType} from "@/types/Note";

interface Props {
    notebook: NotebookType,
    selectedNotes: NoteType[],
    addNote: (note: NoteType) => void
    removeNote: (id: string) => void,
    closeSidebar?: () => void
}

const NotesSelect: React.FC<Props> = ({ notebook, selectedNotes,  addNote, removeNote, closeSidebar }) => {

    const { user } = useAuth();

    const { notes, loading } = useNotes(notebook.id);

    return (
        <Flex
            direction={'column'}
            gap={4}
        >
            <VStack
                align={'start'}
                spacing={2}
            >
                {
                    loading ? (
                        <Skeleton />
                    ) : (
                        <CheckboxGroup colorScheme='brand'>
                            <VStack
                                w={'100%'}
                                spacing={2}
                                align={'start'}
                                mb={2}
                            >
                                {
                                    notes.length > 0 ? (
                                        notes.map((note) => (
                                            <Note
                                                key={note.id}
                                                note={note}
                                                addNote={addNote}
                                                removeNote={removeNote}
                                            />
                                        ))
                                    ) : (
                                        <Text>
                                            No notes found
                                        </Text>
                                    )
                                }
                            </VStack>
                        </CheckboxGroup>
                    )
                }
                {
                    closeSidebar && selectedNotes.length > 0 && (
                        <Button
                            onClick={closeSidebar}
                            colorScheme={'brand'}
                            w={'100%'}
                            variant={'outline'}
                        >
                            Start Studying
                        </Button>
                    )
                }
                {
                    user && user.id === notebook.userId && (
                        <VStack
                            w={'100%'}
                        >
                            <AddNotes
                                text={"Add Note"}
                                icon={<SmallAddIcon />}
                                notebook={notebook}
                                buttonProps={{
                                    w: '100%',
                                }}
                            />
                            <UploadNotes
                                notebookId={notebook.id}
                            />
                        </VStack>
                    )
                }
            </VStack>
        </Flex>
    );
};

export default NotesSelect;