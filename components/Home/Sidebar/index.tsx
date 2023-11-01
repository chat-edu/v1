import React from 'react';

import {
    Accordion,
    Box,
    Card,
    Heading,
    HStack,
    IconButton,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";

import Subject from "@/components/Home/Sidebar/Subject";
import AddSubject from "@/components/Home/Sidebar/AddSubject";

import useSubjects from "@/hooks/queries/useSubjects";

import {Note} from "@/types/Note";
import {navbarHeight} from "@/components/Navbar";
import MobileSidebar from "@/components/Home/Sidebar/MobileSidebar";
import {VscLayoutSidebarLeft, VscLayoutSidebarLeftOff} from "react-icons/vsc";

interface Props {
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    notes: Note[];
}

export const mobileHeaderHeight = 80;
export const openWebSidebarWidth = 400;
export const closedWebSidebarWidth = 72;

const CoursesSidebar: React.FC<Props> = ({ addNote, removeNote, notes }) => {

    const { subjects, loading } = useSubjects();

    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    return (
        <>
            <Card
                display={{base: 'flex', md: 'none'}}
                h={`${mobileHeaderHeight}px`}
                rounded={'none'}
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
                            Courses
                        </Text>
                        <Text
                            fontSize={'sm'}
                            opacity={0.7}
                        >
                            {notes.length} notes selected
                        </Text>
                    </VStack>
                    <MobileSidebar
                        addNote={addNote}
                        removeNote={removeNote}
                    />
                </HStack>
            </Card>
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
                >
                    <HStack
                        w={'100%'}
                        justifyContent={'space-between'}
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
                        {
                            !loading && (
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
                </Box>
                <IconButton
                    display={isOpen ? 'none' : 'flex'}
                    aria-label={'OpenSidebar'}
                    icon={<VscLayoutSidebarLeft />}
                    onClick={onOpen}
                />
            </Card>
        </>

    );
};

export default CoursesSidebar;
