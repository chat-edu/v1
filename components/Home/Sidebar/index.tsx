import React from 'react';

import {
    Accordion,
    Box,
    Card,
    Heading, HStack,
    Skeleton, Text, VStack,
} from "@chakra-ui/react";

import Subject from "@/components/Home/Sidebar/Subject";
import AddSubject from "@/components/Home/Sidebar/AddSubject";

import useSubjects from "@/hooks/queries/useSubjects";

import {Note} from "@/types/Note";
import {navbarHeight} from "@/components/Navbar";
import MobileSidebar from "@/components/Home/Sidebar/MobileSidebar";

interface Props {
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    notes: Note[];
}

export const mobileHeaderHeight = 80;

const CoursesSidebar: React.FC<Props> = ({ addNote, removeNote, notes }) => {

    const { subjects, loading } = useSubjects();

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
                        <Text>
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
                display={{base: 'none', md: 'block'}}
                h={`calc(100vh - ${navbarHeight}px)`}
                w={'400px'}
                minW={'400px'}
                rounded={'none'}
                gap={4}
                overflow={'auto'}
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
                    <AddSubject />
                </HStack>
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
            </Card>
        </>

    );
};

export default CoursesSidebar;
