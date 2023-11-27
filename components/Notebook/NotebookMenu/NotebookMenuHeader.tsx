import React from 'react';

import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";
import UsernameText from "@/components/Utilities/UsernameText";
import NotebookTags from "@/components/NotebookUtilities/NotebookTags";

interface Props {
    notebook: Notebook
}

const NotebookMenuHeader: React.FC<Props> = ({ notebook }) => {
    return (
        <VStack
            w={'100%'}
            align={'start'}
        >
            <NotebookTags
                notebookId={notebook.id}
            />
            <Heading
                size={'md'}
            >
                {notebook.name}
            </Heading>
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
    );
};

export default NotebookMenuHeader;
