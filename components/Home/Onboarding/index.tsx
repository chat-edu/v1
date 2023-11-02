import React from 'react';

import {Button, Card, Divider, Skeleton, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";
import SubjectOnboarding from "@/components/Home/Onboarding/SubjectOnboarding";
import NotesOnboarding from "@/components/Home/Onboarding/NotesOnboarding";

import useSubjects from "@/hooks/queries/useSubjects";
import useNotes from "@/hooks/queries/useNotes";

import {setUserDoc} from "@/services/user";

import {User} from "@firebase/auth";

interface Props {
    user: User
}

const Onboarding: React.FC<Props> = ({ user }) => {

    const { subjects, loading: subjectsLoading } = useSubjects();

    const subject = subjects.length > 0 ? subjects[0] : null;

    const { notes, loading: notesLoading } = useNotes(subject?.id || ' ');

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
        >
            <Card
                w={{
                    base: '100%',
                    md: '600px'
                }}
                alignItems={'center'}
                gap={{
                    base: 2,
                    md: 4
                }}
            >
                <Welcome />
                <VStack
                    flex={1}
                    spacing={{
                        base: 2,
                        md: 4
                    }}
                    justifyContent={'center'}
                    textAlign={'center'}
                >
                    <Text
                        fontSize={{
                            base: 'sm',
                            md: 'lg'
                        }}
                        textAlign={'center'}
                    >
                        ChatEDU is a platform that allows you to create study guides, ask questions, and answer practice problems based on your notes.
                    </Text>
                    <Divider />
                    {
                        subjectsLoading ? (
                            <Skeleton />
                        ) : (
                            <SubjectOnboarding subject={subject} />
                        )
                    }
                    <Divider />
                    {
                        notesLoading ? (
                            <Skeleton />
                        ) : (
                            <NotesOnboarding
                                subject={subject}
                                notes={notes}
                            />
                        )
                    }
                    <Divider />
                    <Button
                        colorScheme={'brand'}
                        onClick={() => setUserDoc(user.uid)}
                        isDisabled={subjects.length === 0 || notes.length === 0}
                    >
                        Start Learning
                    </Button>
                </VStack>
            </Card>
        </VStack>
    );
};

export default Onboarding;
