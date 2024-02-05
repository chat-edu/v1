import React from 'react';

import {Card, HStack, Text, VStack} from "@chakra-ui/react";

import MobileSidebar from "@/components/Notebook/NotebookContent/NotebookMenu/MobileHeader/MobileSidebar";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";
import {Assignment} from "@/types/assignment/Assignment";

export const mobileHeaderHeight = 60;

interface Props {
    notebook: Notebook;
    selectedLesson: Note | null;
    selectLesson: (note: Note) => void;
    deselectLesson: (id: Note["id"]) => void;
    selectedNotes: Note[];
    selectNotes: (notes: Note[]) => void;
    selectedAssignment: Assignment | null;
    selectAssignment: (assignment: Assignment) => void;
    setOverviewMode?: () => void;
}

const MobileHeader: React.FC<Props> = ({ notebook, selectedLesson, selectLesson, deselectLesson, selectedNotes, selectNotes, selectedAssignment, selectAssignment, setOverviewMode }) => {
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
                        selectedNotes={selectedNotes}
                        deselectLesson={deselectLesson}
                        selectNotes={selectNotes}
                        selectedAssignment={selectedAssignment}
                        selectAssignment={selectAssignment}
                        setOverviewMode={setOverviewMode}
                    />
                </HStack>
            </HStack>
        </Card>
    );
};

export default MobileHeader;
