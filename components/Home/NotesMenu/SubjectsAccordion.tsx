import React, {useEffect} from 'react';

import {Accordion, Skeleton, Text, VStack} from "@chakra-ui/react";

import Subject from "@/components/Home/NotesMenu/Subject";

import useSubjects from "@/hooks/queries/useSubjects";

import {Note} from "@/types/Note";
import AddSubjectButton from "@/components/Home/AddSubject/AddSubjectButton";

interface Props {
    selectedNotes: Note[];
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    closeSidebar?: () => void;
}

const SubjectsAccordion: React.FC<Props> = ({ selectedNotes, addNote, removeNote, closeSidebar }) => {

    const { subjects, loading } = useSubjects();

    const [openSubjects, setOpenSubjects] = React.useState<{[key: string]: boolean}>({});

    useEffect(() => {
        if(loading) return;
        setOpenSubjects(subjects.reduce((acc, subject) => {
            return {
                ...acc,
                [subject.id]: openSubjects[subject.id] ?? true
            }
        }, {}))
    }, [subjects, loading])

    if(loading) return (
        <Skeleton
            h={'100px'}
        />
    );

    if(subjects.length === 0) return (
        <VStack
            alignItems={'start'}
        >
            <Text
                fontSize={'lg'}
                fontWeight={'medium'}
            >
                No Subjects
            </Text>
            <AddSubjectButton
                w={'100%'}
            />
        </VStack>
    )

    return (
        <Accordion
            allowMultiple
            w={'100%'}
            index={subjects.reduce((acc, subject, index) => {
                if(openSubjects[subject.id]) {
                    console.log('open', index)
                    return [...acc, index]
                }
                return acc;
            }, [] as number[])}
            onChange={(index: number[]) => {
                setOpenSubjects(subjects.reduce((acc, subject, i) => {
                    return {
                        ...acc,
                        [subject.id]: index.includes(i)
                    }
                }, {}))
            }}
        >
            {
                subjects.map((subject) => (
                    <Subject
                        key={subject.id}
                        subject={subject}
                        selectedNotes={selectedNotes}
                        addNote={addNote}
                        removeNote={removeNote}
                        closeSidebar={closeSidebar}
                    />
                ))
            }
        </Accordion>
    );
};

export default SubjectsAccordion;
