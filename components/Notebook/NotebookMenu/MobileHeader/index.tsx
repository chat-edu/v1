import React from 'react';

import {Card, HStack, Text, VStack} from "@chakra-ui/react";

import MobileSidebar from "@/components/Notebook/NotebookMenu/MobileHeader/MobileSidebar";
import MobileLeaderboard from "@/components/Notebook/NotebookMenu/MobileHeader/MobileLeaderboard";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

export const mobileHeaderHeight = 60;

interface Props {
    notebook: Notebook;
    selectedNotes: Note[];
    addNote: (note: Note) => void;
    removeNote: (id: Note["id"]) => void;
}

const MobileHeader: React.FC<Props> = ({ notebook, selectedNotes, addNote, removeNote}) => {
    return (
        <Card
            display={{base: 'flex', md: 'none'}}
            h={`${mobileHeaderHeight}px`}
            roundedTop={'none'}
            roundedBottom={'md'}
            justifyContent={'center'}
            py={0}
            px={4}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
            >
                <VStack
                    alignItems={'flex-start'}
                    spacing={0}
                >
                    <Text
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                    >
                        {notebook.name}
                    </Text>
                    <Text
                        fontSize={'sm'}
                        opacity={0.7}
                    >
                        {selectedNotes.length} notes selected
                    </Text>
                </VStack>
                <HStack>
                    <MobileSidebar
                        notebook={notebook}
                        selectedNotes={selectedNotes}
                        addNote={addNote}
                        removeNote={removeNote}
                    />
                    <MobileLeaderboard
                        notebook={notebook}
                    />
                </HStack>
            </HStack>
        </Card>
    );
};

export default MobileHeader;
