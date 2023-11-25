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
    Box,
    IconButton, Button,
} from '@chakra-ui/react'

import {BiNote} from "react-icons/bi";

import NotesSelect from "@/components/Notebook/NotebookMenu/NotesSelect";
import NotebookMenuHeader from "@/components/Notebook/NotebookMenu/NotebookMenuHeader";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook,
    selectedNotes: Note[],
    addNote: (note: Note) => void;
    removeNote: (id: Note["id"]) => void
}

const MobileSidebar: React.FC<Props> = ({ notebook, selectedNotes, addNote, removeNote }) => {

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
                        <NotebookMenuHeader
                            notebook={notebook}
                        />
                    </DrawerHeader>
                    <DrawerBody>
                        <Box
                            flex={1}
                            w={'100%'}
                        >
                            <NotesSelect
                                notebook={notebook}
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
