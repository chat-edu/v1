import React from 'react';

import {HStack, Text, VStack} from "@chakra-ui/react";

import ClickableCard from "@/components/Utilities/ClickableCard";
import NotebookTags from "@/components/NotebookUtilities/NotebookTags";

import {Notebook} from "@/types/Notebook";
import UsernameText from "@/components/Utilities/UsernameText";

interface Props {
    notebook: Notebook,
    rightComponent?: React.ReactNode,
    onClick: () => void
}

const NotebookCard: React.FC<Props> = ({ notebook, rightComponent, onClick }) => {

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
                        notebookId={notebook.id}
                    />
                    <Text
                        fontWeight={'bold'}
                        fontSize={{
                            base: 'sm',
                            md: 'md'
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
                    <Text
                        fontSize={'sm'}
                        opacity={0.75}
                    >
                        {notebook.numNotes} modules
                    </Text>
                </VStack>
                {rightComponent}
            </HStack>
        </ClickableCard>
    );
};

export default NotebookCard;
