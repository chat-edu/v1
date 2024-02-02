import React from 'react';

import {HStack, Text, VStack} from "@chakra-ui/react";

import ClickableCard from "@/components/Utilities/ClickableCard";
import UsernameText from "@/components/Utilities/UsernameText";

import {NotebookScore} from "@/types/score";
import Link from "next/link";

interface Props {
    notebookScore: NotebookScore,
    rightComponent?: React.ReactNode,
    onClick: () => void
}

const NotebookCard: React.FC<Props> = ({ notebookScore, rightComponent }) => {

    return (
        <Link
            href={`/notebooks/${notebookScore.notebookId}`}
        >
            <ClickableCard
                onClick={() => {}}
                flex={1}
                w={'100%'}
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
                            {notebookScore.notebookName}
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
                                username={notebookScore.authorUsername}
                                id={notebookScore.authorId}
                                verified={notebookScore.authorVerified}
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
            </ClickableCard>
        </Link>
    );
};

export default NotebookCard;
