import React from 'react';

import {Box, Card, HStack, IconButton, useDisclosure} from "@chakra-ui/react";

import {VscLayoutSidebarLeft, VscLayoutSidebarLeftOff} from "react-icons/vsc";

import NotesSelect from "@/components/Notebook/NotebookMenu/NotesSelect";
import NotebookMenuHeader from "@/components/Notebook/NotebookMenu/NotebookMenuHeader";
import {navbarHeight} from "@/components/Layout/Navbar";
import NotebookLeaderboard from "@/components/NotebookUtilities/NotebookLeaderboard";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";


const openWebSidebarWidthLg = 400;
const openWebSidebarWidthMd = 300;
const closedWebSidebarWidth = 72;

interface Props {
    notebook: Notebook,
    selectedNotes: Note[],
    addNote: (note: Note) => void;
    removeNote: (id: Note["id"]) => void
}

const Sidebar: React.FC<Props> = ({ notebook, selectedNotes, addNote, removeNote }) => {

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
                    align={'start'}
                >
                    <NotebookMenuHeader
                        notebook={notebook}
                    />
                    <IconButton
                        aria-label={'CloseSidebar'}
                        icon={<VscLayoutSidebarLeftOff />}
                        onClick={onClose}
                        size={'sm'}
                    />
                </HStack>
                <Box
                    h={'100%'}
                    w={'100%'}
                    overflow={'auto'}
                >
                    <NotesSelect
                        notebook={notebook}
                        selectedNotes={selectedNotes}
                        addNote={addNote}
                        removeNote={removeNote}
                    />
                </Box>
                <NotebookLeaderboard
                    notebookId={notebook.id}
                />
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
