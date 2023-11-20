import React from 'react';

import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import AddNotebookButton from "@/components/Home/AddNotebook/AddNotebookButton";

import { Notebook } from "@/types/Notebook";
import {CheckIcon} from "@chakra-ui/icons";

interface Props {
    notebook: Notebook | null
}

const NotebookOnboarding: React.FC<Props> = ({ notebook }) => {
    return (
        <VStack>
            <Heading
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Notebooks
            </Heading>
            <Text
                fontSize={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Your notes are organized in Notebooks - get started by creating a Notebook now:
            </Text>
            {
                notebook === null ? (
                    <AddNotebookButton />
                ) : (
                    <HStack
                        spacing={2}
                        borderRadius={'md'}
                        borderWidth={2}
                        borderColor={'brand.500'}
                        p={2}
                        color={'brand.500'}
                    >
                        <CheckIcon />
                        <Text
                            fontWeight={'bold'}
                        >
                            {notebook.name} Created
                        </Text>
                    </HStack>
                )
            }

        </VStack>
    );
};

export default NotebookOnboarding;
