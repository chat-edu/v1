import React from 'react';

import {Button, Heading, HStack, Text, VStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";
import UsernameText from "@/components/Utilities/UsernameText";
import {IoIosArrowBack} from "react-icons/io";

interface Props {
    notebook: Notebook,
    setOverviewMode?: () => void;
}

const NotebookMenuHeader: React.FC<Props> = ({ notebook, setOverviewMode }) => {
    return (
        <VStack
            w={'100%'}
            align={'start'}
        >
            {
                setOverviewMode && (
                    <Button
                        size={'xs'}
                        leftIcon={<IoIosArrowBack />}
                        onClick={setOverviewMode}
                        variant={'ghost'}
                    >
                        Back
                    </Button>
                )
            }
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
