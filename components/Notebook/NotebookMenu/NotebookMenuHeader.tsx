import React from 'react';

import {Heading, Text, VStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";
import UsernameText from "@/components/Utilities/UsernameText";

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
                By<UsernameText username={notebook.username} id={notebook.userId} />
            </Text>
        </VStack>
    );
};

export default NotebookMenuHeader;
