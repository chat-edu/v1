import React from 'react';

import {Box, Card, Heading, HStack, IconButton, useDisclosure} from "@chakra-ui/react";

import {VscLayoutSidebarLeft, VscLayoutSidebarLeftOff} from "react-icons/vsc";

import AddSubject from "@/components/Home/NotesMenu/AddSubject";
import SubjectsAccordion from "@/components/Home/NotesMenu/SubjectsAccordion";

import {navbarHeight} from "@/components/Navbar";

import {Note} from "@/types/Note";

export const openWebSidebarWidth = 400;
export const closedWebSidebarWidth = 72;

interface Props {
    selectedNotes: Note[],
    addNote: (note: Note) => void;
    removeNote: (id: string) => void
}

const Sidebar: React.FC<Props> = ({ selectedNotes, addNote, removeNote }) => {

    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    return (
        <Card
            display={{base: 'none', md: 'flex'}}
            h={`calc(100vh - ${navbarHeight}px)`}
            w={isOpen ? `${openWebSidebarWidth}px` : `${closedWebSidebarWidth}px`}
            minW={isOpen ? `${openWebSidebarWidth}px` : `${closedWebSidebarWidth}px`}
            rounded={'none'}
            gap={4}
            overflow={'auto'}
            transition={'0.2s ease-in-out'}
        >
            <Box
                display={isOpen ? 'block' : 'none'}
                w={'100%'}
            >
                <HStack
                    w={'100%'}
                    justifyContent={'space-between'}
                    mb={2}
                >
                    <Heading
                        size={'md'}
                    >
                        Subjects
                    </Heading>
                    <HStack>
                        <AddSubject />
                        <IconButton
                            aria-label={'CloseSidebar'}
                            icon={<VscLayoutSidebarLeftOff />}
                            onClick={onClose}
                        />
                    </HStack>
                </HStack>
                <Box
                    flex={1}
                    w={'100%'}
                >
                    <SubjectsAccordion
                        selectedNotes={selectedNotes}
                        addNote={addNote}
                        removeNote={removeNote}
                    />
                </Box>
            </Box>
            <IconButton
                display={isOpen ? 'none' : 'flex'}
                aria-label={'OpenSidebar'}
                icon={<VscLayoutSidebarLeft />}
                onClick={onOpen}
            />
        </Card>
    );
};

export default Sidebar;