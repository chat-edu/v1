import React from 'react';

import {
    Accordion,
    Box,
    Card,
    Heading, HStack,
    Skeleton,
} from "@chakra-ui/react";

import Subject from "@/components/Home/Sidebar/Subject";
import AddSubject from "@/components/Home/Sidebar/AddSubject";

import useSubjects from "@/hooks/queries/useSubjects";

import {Note} from "@/types/Note";

interface Props {
    addNote: (note: Note) => void;
    removeNote: (id: string) => void
}

const CoursesSidebar: React.FC<Props> = ({ addNote, removeNote }) => {

    const { subjects, loading } = useSubjects();

    return (
        <Card
            h={'100%'}
            w={{base: '100%', md: '400px' }}
            minW={{base: '100%', md: '400px' }}
            rounded={'none'}
            gap={4}
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
    );
};

export default CoursesSidebar;
