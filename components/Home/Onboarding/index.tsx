import React from 'react';

import {Button, Card, Divider, Skeleton, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";
import NotebookOnboarding from "@/components/Home/Onboarding/NotebookOnboarding";
import NotesOnboarding from "@/components/Home/Onboarding/NotesOnboarding";

import useNotes from "@/hooks/queries/useNotes";
import useUserNotebooks from "@/hooks/queries/useUserNotebooks";

import {addUser} from "@/services/user";

import {emitUsersChangedEvent} from "@/eventEmitters/userEventEmitter";

interface Props {
    userId: string
}

const Onboarding: React.FC<Props> = ({ userId }) => {

    const { notebooks, loading: notebooksLoading } = useUserNotebooks(userId);

    const notebook = notebooks.length > 0 ? notebooks[0] : null;

    const { notes, loading: notesLoading } = useNotes(notebook?.id || 0);

    const onStartLearning = async () => {
        await addUser(userId);
        emitUsersChangedEvent(userId)
    }

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
                        notebooksLoading ? (
                            <Skeleton />
                        ) : (
                            <NotebookOnboarding notebook={notebook} />
                        )
                    }
                    <Divider />
                    {
                        notesLoading ? (
                            <Skeleton />
                        ) : (
                            <NotesOnboarding
                                notebook={notebook}
                                notes={notes}
                            />
                        )
                    }
                    <Divider />
                    <Button
                        colorScheme={'brand'}
                        onClick={onStartLearning}
                        isDisabled={notebooks.length === 0 || notes.length === 0}
                    >
                        Start Learning
                    </Button>
                </VStack>
            </Card>
        </VStack>
    );
};

export default Onboarding;
