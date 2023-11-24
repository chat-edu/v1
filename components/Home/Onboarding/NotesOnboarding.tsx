import React from 'react';

import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import {BiUpload} from "react-icons/bi";

import AddNotes from "@/components/Home/AddNotes";

import { Notebook } from "@/types/Notebook";
import {Note} from "@/types/Note";
import {CheckIcon} from "@chakra-ui/icons";

interface Props {
    notebook: Notebook | null,
    notes: Note[]
}


const NotesOnboarding: React.FC<Props> = ({ notebook, notes }) => {
    return (
        <VStack>
            <Heading
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Notes
            </Heading>
            <Text
                fontSize={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Your notes are used to train your personalized virtual tutor. The more notes you upload, the better your tutor will be!
            </Text>
            {
                notes.length > 0 ? (
                    <HStack
                        spacing={2}
                        borderRadius={'md'}
                        borderWidth={2}
                        borderColor={'brand.500'}
                        p={2}
                        color={'brand.500'}
                    >
                        <CheckIcon />
                        <Text
                            fontWeight={'bold'}
                        >
                            {notes[0].name} Uploaded
                        </Text>
                    </HStack>
                ) : <AddNotes
                    text={'Upload Notes'}
                    icon={<BiUpload />}
                    notebook={notebook || undefined}
                />
            }

        </VStack>
    );
};

export default NotesOnboarding;
