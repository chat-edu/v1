import React from 'react';

import {Card, HStack, Text, VStack} from "@chakra-ui/react";

import MobileSidebar from "@/components/Notebook/NotebookMenu/MobileHeader/MobileSidebar";
import MobileLeaderboard from "@/components/Notebook/NotebookMenu/MobileHeader/MobileLeaderboard";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

export const mobileHeaderHeight = 60;

interface Props {
    notebook: Notebook;
    selectedLesson: Note | null;
    selectLesson: (note: Note) => void;
    deselectLesson: (id: Note["id"]) => void;
    selectNotes: (notes: Note[]) => void;
}

const MobileHeader: React.FC<Props> = ({ notebook, selectedLesson, selectLesson, deselectLesson, selectNotes }) => {
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
                </VStack>
                <HStack>
                    <MobileSidebar
                        notebook={notebook}
                        selectedLesson={selectedLesson}
                        selectLesson={selectLesson}
                        deselectLesson={deselectLesson}
                        selectNotes={selectNotes}
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
