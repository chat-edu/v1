import React, {useEffect} from 'react';

import {Accordion, Skeleton, Text, VStack} from "@chakra-ui/react";

import Subject from "@/components/Home/NotesMenu/Subject";

import useSubjects from "@/hooks/queries/useSubjects";

import {Note} from "@/types/Note";
import AddSubjectButton from "@/components/Home/AddSubject/AddSubjectButton";

interface Props {
    addNote: (note: Note) => void;
    removeNote: (id: string) => void
}

const SubjectsAccordion: React.FC<Props> = ({ addNote, removeNote }) => {

    const { subjects, loading } = useSubjects();

    const [openSubjects, setOpenSubjects] = React.useState<{[key: string]: boolean}>({});

    useEffect(() => {
        // create an object where the key is the subject id and the value is true if the subject is already open or if it is undefined
        setOpenSubjects(subjects.reduce((acc, subject) => {
            return {
                ...acc,
                [subject.id]: openSubjects[subject.id] ?? true
            }
        }, {}))
    }, [subjects])

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
            allowToggle
            allowMultiple
            w={'100%'}
            index={subjects.reduce((acc, subject, index) => {
                if(openSubjects[subject.id]) {
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
                        addNote={addNote}
                        removeNote={removeNote}
                    />
                ))
            }
        </Accordion>
    );
};

export default SubjectsAccordion;
