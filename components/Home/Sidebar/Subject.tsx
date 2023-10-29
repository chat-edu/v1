import React from 'react';

import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    CheckboxGroup,
    HStack,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

import UploadNotes from "@/components/Home/UploadNotes";
import DeleteSubject from "@/components/Home/Sidebar/DeleteSubject";
import Note from "@/components/Home/Sidebar/Note";

import useNotes from "@/hooks/queries/useNotes";
import useAuth from "@/hooks/auth/useAuth";


import {Subject as SubjectType} from "@/types/Subject";
import {Note as NoteType} from "@/types/Note";

interface Props {
    subject: SubjectType,
    addNote: (note: NoteType) => void
    removeNote: (id: string) => void
}

const Subject: React.FC<Props> = ({ subject, addNote, removeNote }) => {

    const { user } = useAuth();

    const { notes, loading } = useNotes(user?.uid || "a", subject.id);

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
                                        notes.map((note) => (
                                            <Note
                                                key={note.id}
                                                note={note}
                                                addNote={addNote}
                                                removeNote={removeNote}
                                            />
                                        ))
                                    }
                                </VStack>
                            </CheckboxGroup>
                        )
                    }
                    <UploadNotes
                        text={"Add Note"}
                        icon={<SmallAddIcon />}
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
