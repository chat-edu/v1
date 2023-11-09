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

import UploadNotes from "@/components/Home/UploadNotes";
import DeleteSubject from "@/components/Home/NotesMenu/DeleteSubject";
import Note from "@/components/Home/NotesMenu/Note";

import useNotes from "@/hooks/queries/useNotes";

import {Subject as SubjectType} from "@/types/Subject";
import {Note as NoteType} from "@/types/Note";

interface Props {
    subject: SubjectType,
    selectedNotes: NoteType[],
    addNote: (note: NoteType) => void
    removeNote: (id: string) => void,
    closeSidebar?: () => void
}

const Subject: React.FC<Props> = ({ subject, selectedNotes,  addNote, removeNote, closeSidebar }) => {

    const { notes, loading } = useNotes(subject.id);

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
                            {subject.name}
                        </Text>
                        <AccordionIcon />
                    </HStack>
                </AccordionButton>
                <DeleteSubject
                    subject={subject}
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
                    <UploadNotes
                        text={"Add Note"}
                        icon={<SmallAddIcon />}
                        subject={subject}
                        buttonProps={{
                            w: '100%',
                        }}
                    />
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    );
};

export default Subject;
