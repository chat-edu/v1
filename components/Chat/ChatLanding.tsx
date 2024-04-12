import React from 'react';

import {Card, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";
import AuthProviderButtons from "@/components/Utilities/AuthButtons/AuthProviderButtons";

import {Notebook} from "@/types/Notebook";
import NotebookKnowledgeGraph from "@/components/Notebook/TeacherOverview/NotebookKnowledgeGraph";
import {useCurrentUser} from "@/contexts/CurrentUserContext";
import StudentKnowledgeGraph from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentKnowledgeGraph";

interface Props {
    notebookId: Notebook["id"]
}

const HomeLanding: React.FC<Props> = ({ notebookId }) => {

    const { user } = useCurrentUser();

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
            textAlign={'center'}
            spacing={{
                base: 2,
                md: 4
            }}
        >
            <Welcome />
            {
                user ? (
                    <>
                        <Card
                            w={'100%'}
                            maxW={'4xl'}
                            alignItems={'center'}
                        >
                            <Text
                                fontSize={{
                                    base: 'lg',
                                    md: 'xl'
                                }}
                                fontWeight={'bold'}
                                textAlign={'center'}
                            >
                                {user.role === 'teacher' ? "Notebook Knowledge Graph" : "Your Knowledge Graph"}
                            </Text>
                            {
                                user.role === 'teacher' ? (
                                    <NotebookKnowledgeGraph notebookId={notebookId} />
                                ) : (
                                    <StudentKnowledgeGraph
                                        notebookId={notebookId}
                                        userId={user.id}
                                    />
                                )
                            }
                        </Card>
                        <Text
                            fontSize={{
                                base: 'sm',
                                md: 'lg'
                            }}
                            textAlign={'center'}
                            fontWeight={'bold'}
                        >
                            Select a note to get started!
                        </Text>
                    </>
                ) : (
                    <VStack>
                        <Text
                            fontSize={{
                                base: 'sm',
                                md: 'lg'
                            }}
                            fontWeight={'bold'}
                        >
                            Sign in to get started!
                        </Text>
                        <AuthProviderButtons />
                    </VStack>
                )
            }

        </VStack>
    )
};

export default HomeLanding;
