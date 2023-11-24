import React from 'react';

import {Box, Card, Heading, HStack, IconButton, useDisclosure} from "@chakra-ui/react";

import {VscLayoutSidebarLeft, VscLayoutSidebarLeftOff} from "react-icons/vsc";

import AddNotebook from "@/components/Home/NotesMenu/AddNotebook";
import NotebooksAccordion from "@/components/Home/NotesMenu/NotebooksAccordion";
import {navbarHeight} from "@/components/Layout/Navbar";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

import {Note} from "@/types/Note";

const openWebSidebarWidthLg = 400;
const openWebSidebarWidthMd = 300;
const closedWebSidebarWidth = 72;

interface Props {
    selectedNotes: Note[],
    addNote: (note: Note) => void;
    removeNote: (id: Note["id"]) => void
}

const Sidebar: React.FC<Props> = ({ selectedNotes, addNote, removeNote }) => {

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
                        Notebooks
                    </Heading>
                    <HStack>
                        <AddNotebook />
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
                    <NotebooksAccordion
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
