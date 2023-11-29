import React from 'react';

import {HStack, Text, VStack} from "@chakra-ui/react";

import ClickableCard from "@/components/Utilities/ClickableCard";
import NotebookTags from "@/components/NotebookUtilities/NotebookTags";
import UsernameText from "@/components/Utilities/UsernameText";

import {NotebookScore} from "@/types/score";

interface Props {
    notebookScore: NotebookScore,
    rightComponent?: React.ReactNode,
    onClick: () => void
}

const NotebookCard: React.FC<Props> = ({ notebookScore, rightComponent, onClick }) => {

    return (
        <ClickableCard
            onClick={onClick}
            flex={1}
            w={'100%'}
        >
            <HStack
                w={'100%'}
                h={'100%'}
            >
                <VStack
                    flex={1}
                    align={'start'}
                >
                    <NotebookTags
                        notebookId={notebookScore.notebookId}
                    />
                    <Text
                        fontWeight={'bold'}
                        fontSize={{
                            base: 'sm',
                            md: 'md'
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
                    <Text
                        fontSize={'sm'}
                        opacity={0.75}
                    >
                        {notebookScore.numNotes} modules
                    </Text>
                </VStack>
                {rightComponent}
            </HStack>
        </ClickableCard>
    );
};

export default NotebookCard;
