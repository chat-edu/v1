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
    VStack,
    CircularProgress, 
    CircularProgressLabel
} from "@chakra-ui/react";


import DeleteSubject from "@/components/Home/Sidebar/DeleteSubject";

import useNotes from "@/hooks/queries/useNotes";
import useAuth from "@/hooks/auth/useAuth";

import {Subject as SubjectType} from "@/types/Subject";
import {Note} from "@/types/Note";
import UploadNotes from "@/components/Home/UploadNotes";
import {SmallAddIcon} from "@chakra-ui/icons";
import { MAX_SCORE } from '@/lib/score';

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
                                            <HStack
                                                key={note.id}
                                                w={'100%'}
                                                justifyContent={'space-between'}
                                            >
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
                                            <CircularProgress 
                                                value={note.score} 
                                                max={MAX_SCORE}
                                                color='brand.400' 
                                                thickness='13px' 
                                                size='25px'
                                            />
                                            </HStack>
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
