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
    Skeleton,
    Accordion,
    Box,
    IconButton, Button,
} from '@chakra-ui/react'

import AddSubject from "@/components/Home/Sidebar/AddSubject";
import Subject from "@/components/Home/Sidebar/Subject";
import useSubjects from "@/hooks/queries/useSubjects";

import {Note} from "@/types/Note";
import {BiNote} from "react-icons/bi";

interface Props {
    addNote: (note: Note) => void;
    removeNote: (id: string) => void
}

const MobileSidebar: React.FC<Props> = ({ addNote, removeNote }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { subjects, loading } = useSubjects();

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
                                Subjects
                            </Heading>
                            <AddSubject />
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody>
                        <Box
                            flex={1}
                            w={'100%'}
                        >
                            {
                                loading ? (
                                    <Skeleton />
                                ) : (
                                    <Accordion
                                        allowToggle
                                        allowMultiple
                                        w={'100%'}
                                        defaultIndex={subjects.map((_, index) => index)}
                                    >
                                        {
                                            subjects.map((subject) => (
                                                <Subject
                                                    key={subject.id}
                                                    subject={subject}
                                                    addNote={addNote}
                                                    removeNote={removeNote}
                                                />
                                            ))
                                        }
                                    </Accordion>
                                )
                            }
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
