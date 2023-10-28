import React from 'react';

import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Checkbox,
    CheckboxGroup,
    HStack,
    Skeleton,
    Text,
    VStack
} from "@chakra-ui/react";


import DeleteSubject from "@/components/Home/Sidebar/DeleteSubject";

import useNotes from "@/hooks/queries/useNotes";
import useAuth from "@/hooks/auth/useAuth";

import {Subject as SubjectType} from "@/types/Subject";
import {Note} from "@/types/Note";

interface Props {
    subject: SubjectType,
    addNote: (note: Note) => void
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
                {
                    loading ? (
                        <Skeleton />
                    ) : (
                        <CheckboxGroup colorScheme='brand'>
                            <VStack
                                spacing={2}
                                align={'start'}
                            >
                                {
                                    notes.map((note) => (
                                        <Checkbox
                                            key={note.id}
                                            value={note.id}
                                            onChange={(e) => {
                                                if(e.target.checked) {
                                                    addNote(note);
                                                } else {
                                                    removeNote(note.id);
                                                }
                                            }}
                                        >
                                            {note.title}
                                        </Checkbox>
                                    ))
                                }
                            </VStack>
                        </CheckboxGroup>
                    )
                }
            </AccordionPanel>
        </AccordionItem>
    );
};

export default Subject;
