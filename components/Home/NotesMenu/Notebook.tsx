import React from 'react';

import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    CheckboxGroup,
    HStack,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

import AddNotes from "@/components/Home/AddNotes";
import DeleteNotebook from "@/components/Home/NotesMenu/DeleteNotebook";
import Note from "@/components/Home/NotesMenu/Note";
import UploadNotes from "@/components/Home/UploadNotes";

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

const Notebook: React.FC<Props> = ({ notebook, selectedNotes,  addNote, removeNote, closeSidebar }) => {

    const { notes, loading } = useNotes(notebook.id);

    return (
        <AccordionItem>
            <HStack>
                <AccordionButton
                    flex={1}
                >
                    <HStack
                        w={'100%'}
                        justifyContent={'space-between'}
                    >
                        <Text>
                            {notebook.name}
                        </Text>
                        <AccordionIcon />
                    </HStack>
                </AccordionButton>
                <DeleteNotebook
                    notebook={notebook}
                />
            </HStack>
            <AccordionPanel>
                <VStack
                    align={'start'}
                    spacing={4}
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
            </AccordionPanel>
        </AccordionItem>
    );
};

export default Notebook;
