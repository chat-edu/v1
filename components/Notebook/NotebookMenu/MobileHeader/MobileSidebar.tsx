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
import {Assignment} from "@/types/assignment/Assignment";

interface Props {
    notebook: Notebook,
    selectedLesson: Note | null,
    selectLesson: (note: Note) => void;
    deselectLesson: (id: Note["id"]) => void
    selectedNotes: Note[],
    selectNotes: (notes: Note[]) => void,
    selectedAssignment: Assignment | null,
    selectAssignment: (assignment: Assignment) => void
}

const MobileSidebar: React.FC<Props> = ({ notebook, selectedLesson, selectLesson, deselectLesson, selectedNotes, selectNotes, selectedAssignment, selectAssignment }) => {

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
                                selectedLesson={selectedLesson}
                                selectLesson={selectLesson}
                                deselectLesson={deselectLesson}
                                selectedNotes={selectedNotes}
                                selectNotes={selectNotes}
                                selectedAssignment={selectedAssignment}
                                selectAssignment={selectAssignment}
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
