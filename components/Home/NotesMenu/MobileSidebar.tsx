import React from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Heading,
    HStack,
    Box,
    IconButton, Button,
} from '@chakra-ui/react'

import {BiNote} from "react-icons/bi";

import AddNotebook from "@/components/Home/NotesMenu/AddNotebook";
import NotebooksAccordion from "@/components/Home/NotesMenu/NotebooksAccordion";

import {Note} from "@/types/Note";


interface Props {
    selectedNotes: Note[],
    addNote: (note: Note) => void;
    removeNote: (id: string) => void
}

const MobileSidebar: React.FC<Props> = ({ selectedNotes, addNote, removeNote }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label={'Open Sidebar'}
                icon={<BiNote />}
                onClick={onOpen}
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                size={'full'}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <HStack
                            w={'100%'}
                        >
                            <Heading
                                size={'md'}
                            >
                                Notebooks
                            </Heading>
                            <AddNotebook />
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody>
                        <Box
                            flex={1}
                            w={'100%'}
                        >
                            <NotebooksAccordion
                                selectedNotes={selectedNotes}
                                addNote={addNote}
                                removeNote={removeNote}
                                closeSidebar={onClose}
                            />
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            variant='outline'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    );
};

export default MobileSidebar;
