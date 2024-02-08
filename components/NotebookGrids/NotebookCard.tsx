import React from 'react';

import {HStack, Text, VStack} from "@chakra-ui/react";

import ClickableCard from "@/components/Utilities/ClickableCard";
import UsernameText from "@/components/Utilities/UsernameText";

import Link from "next/link";

import {Notebook} from "@/types/Notebook";
import NotebookBarChart from "@/components/Utilities/NotebookBarChart";
import StudentSubmissions from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentSubmissions";
import useAuth from "@/hooks/useAuth";

interface Props {
    notebook: Notebook,
    rightComponent?: React.ReactNode,
    onClick: () => void,
    isTeacher: boolean
}

const NotebookCard: React.FC<Props> = ({ notebook, rightComponent, isTeacher }) => {

    const { user } = useAuth();

    return (
        <Link
            href={`/notebooks/${notebook.id}`}
        >
            <ClickableCard
                onClick={() => {}}
                flex={1}
                w={'100%'}
                gap={4}
            >
                <HStack
                    w={'100%'}
                    h={'100%'}
                    maxW={'100%'}
                >
                    <VStack
                        flex={1}
                        align={'start'}
                    >
                        <Text
                            fontWeight={'bold'}
                            fontSize={{
                                base: 'md',
                                md: 'lg'
                            }}
                            mb={0}
                        >
                            {notebook.name}
                        </Text>
                        <HStack
                            spacing={0}
                        >
                            <Text
                                fontSize={'sm'}
                                opacity={0.75}
                            >
                                By
                            </Text>
                            <UsernameText
                                username={notebook.username}
                                id={notebook.userId}
                                verified={notebook.verified}
                                opacity={0.75}
                            />
                        </HStack>
                    </VStack>
                    <VStack
                        h={'100%'}
                        justifyContent={'space-between'}
                        align={'end'}
                    >
                        {rightComponent}
                    </VStack>
                </HStack>
                {
                    isTeacher ? (
                        <NotebookBarChart
                            notebookId={notebook.id}
                            height={100}
                        />
                    ) : (
                        <StudentSubmissions
                            userId={user?.id || ""}
                            notebookId={notebook.id}
                            height={100}
                            hideHeader
                        />
                    )
                }
            </ClickableCard>
        </Link>
    );
};

export default NotebookCard;
