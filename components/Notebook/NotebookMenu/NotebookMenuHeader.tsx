import React from 'react';

import {Heading, Text, VStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook
}

const NotebookMenuHeader: React.FC<Props> = ({ notebook }) => {
    return (
        <VStack
            w={'100%'}
            align={'start'}
        >
            <Heading
                size={'md'}
            >
                {notebook.name}
            </Heading>
            <Text
                fontSize={'sm'}
                fontWeight={'semibold'}
                color={'gray.500'}
            >
                By {notebook.username}
            </Text>
        </VStack>
    );
};

export default NotebookMenuHeader;
