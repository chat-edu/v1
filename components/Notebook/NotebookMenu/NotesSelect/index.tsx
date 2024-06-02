import React from 'react';

import {
    Button,
    CheckboxGroup,
    Flex,
    Text, Tooltip,
    VStack,
} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

import {MdQuiz} from "react-icons/md";

import AddNoteButton from "@/components/AddModals/AddNote/AddNoteButton";
import Note from "@/components/Notebook/NotebookMenu/NotesSelect/Note";
import StudyGuide from "@/components/Notebook/NotebookMenu/StudyGuide";
import Loading from "@/components/Utilities/Loading";

import useAuth from "@/hooks/useAuth";
import useNotes from "@/hooks/queries/notes/useNotes";

import {Notebook as NotebookType} from "@/types/Notebook";
import {Note as NoteType} from "@/types/Note";

interface Props {
    notebook: NotebookType,
    selectedNotes: NoteType[],
    addNote: (note: NoteType) => void
    removeNote: (id: NoteType["id"]) => void,
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
                <Text
                    fontWeight={'bold'}
                >
                    Topics
                </Text>
                <Loading
                    loading={loading}
                >
                    {
                        <CheckboxGroup colorScheme='brand'>
                            <VStack
                                w={'100%'}
                                spacing={2}
                                align={'start'}
                                mb={2}
                                wordBreak={'break-word'}
                            >
                                {
                                    notes.length > 0 ? (
                                        notes.map((note) => (
                                            <Note
                                                key={note.id}
                                                note={note}
                                                notebook={notebook}
                                                addNote={addNote}
                                                removeNote={removeNote}
                                                selected={selectedNotes.some((selectedNote) => selectedNote.id === note.id)}
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
                    }
                </Loading>
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
                            <AddNoteButton
                                text={"Add Content"}
                                icon={<SmallAddIcon />}
                                notebook={notebook}
                                buttonProps={{
                                    w: '100%',
                                }}
                            />
                        </VStack>
                    )
                }
                {
                    selectedNotes.length > 0 && (
                        <VStack
                            w={'100%'}
                        >
                            <StudyGuide
                                notes={selectedNotes}
                            />
                        </VStack>
                    )
                }
                {
                    selectedNotes.length > 0 && (
                        <Tooltip
                            label={'Coming soon!'}
                        >
                            <Button
                                w={'100%'}
                                leftIcon={<MdQuiz />}
                                isDisabled
                            >
                                Create Practice Test
                            </Button>
                        </Tooltip>
                    )
                }
            </VStack>
        </Flex>
    );
};

export default NotesSelect;
