import React from 'react';

import {Box, Card, HStack, IconButton, useDisclosure, VStack} from "@chakra-ui/react";

import {VscLayoutSidebarLeft, VscLayoutSidebarLeftOff} from "react-icons/vsc";

import NotesSelect from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect";
import NotebookMenuHeader from "@/components/Notebook/NotebookContent/NotebookMenu/NotebookMenuHeader";
import {navbarHeight} from "@/components/Layout/Navbar";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";
import {Assignment} from "@/types/assignment/Assignment";


const openWebSidebarWidthLg = 400;
const openWebSidebarWidthMd = 300;
const closedWebSidebarWidth = 72;

interface Props {
    notebook: Notebook,
    selectedLesson: Note | null,
    selectLesson: (note: Note) => void;
    deselectLesson: (id: Note["id"]) => void;
    selectedNotes: Note[],
    selectNotes: (notes: Note[]) => void,
    selectedAssignment: Assignment | null,
    selectAssignment: (assignment: Assignment) => void
    setOverviewMode?: () => void;
}

const Sidebar: React.FC<Props> = ({ notebook, selectedLesson, selectLesson, deselectLesson, selectedNotes, selectNotes, selectedAssignment, selectAssignment, setOverviewMode }) => {

    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    const { height } = useViewportDimensions();

    return (
        <Card
            display={{base: 'none', md: 'flex'}}
            h={height - navbarHeight}
            w={{
                md: isOpen ? `${openWebSidebarWidthMd}px` : `${closedWebSidebarWidth}px`,
                lg: isOpen ? `${openWebSidebarWidthLg}px` : `${closedWebSidebarWidth}px`
            }}
            minW={{
                md: isOpen ? `${openWebSidebarWidthMd}px` : `${closedWebSidebarWidth}px`,
                lg: isOpen ? `${openWebSidebarWidthLg}px` : `${closedWebSidebarWidth}px`
            }}
            rounded={'none'}
            gap={4}
            overflow={'auto'}
            transition={'0.2s ease-in-out'}
        >
            <Box
                display={isOpen ? 'flex' : 'none'}
                w={'100%'}
                flexDir={'column'}
                gap={4}
                h={'100%'}
            >
                <HStack
                    align={'center'}
                >
                    <NotebookMenuHeader
                        notebook={notebook}
                        setOverviewMode={setOverviewMode}
                    />
                    <VStack>
                        <IconButton
                            aria-label={'CloseSidebar'}
                            icon={<VscLayoutSidebarLeftOff />}
                            onClick={onClose}
                            size={'sm'}
                        />
                    </VStack>
                </HStack>
                <Box
                    h={'100%'}
                    w={'100%'}
                    overflow={'auto'}
                >
                    <NotesSelect
                        notebook={notebook}
                        selectedLesson={selectedLesson}
                        selectLesson={selectLesson}
                        deselectLesson={deselectLesson}
                        selectedNotes={selectedNotes}
                        selectNotes={selectNotes}
                        selectedAssignment={selectedAssignment}
                        selectAssignment={selectAssignment}
                    />
                </Box>
            </Box>
            <VStack
                display={isOpen ? 'none' : 'flex'}
            >
                <IconButton
                    aria-label={'OpenSidebar'}
                    icon={<VscLayoutSidebarLeft />}
                    onClick={onOpen}
                />
            </VStack>
        </Card>
    );
};

export default Sidebar;
