import React, {useState} from 'react';

import {Heading, HStack, Text, Tooltip, useClipboard, useColorModeValue, useToast, VStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";
import UsernameText from "@/components/Utilities/UsernameText";

interface Props {
    notebook: Notebook
}

const NotebookHeader: React.FC<Props> = ({ notebook }) => {

    const hoverColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

    const [copied, setCopied] = useState<boolean>(false);

    const toast = useToast()
    const { onCopy } = useClipboard(notebook.accessCode);

    const onAccessCodeClick = () => {
        onCopy();
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
        toast({
            title: 'Access Code Copied',
            status: 'success',
            duration: 2000,
            isClosable: true
        })
    }

    return (
        <HStack
            w={'100%'}
            justify={'space-between'}
        >
            <VStack
                align={'flex-start'}
            >
                <Heading>
                    {notebook.name}
                </Heading>
                <UsernameText
                    username={notebook.username}
                    id={notebook.userId}
                    verified={notebook.verified}
                />
                <Tooltip
                    label={copied ? "Copied!" : "Copy Access Code"}
                    flexShrink={0}
                >
                    <Text
                        cursor={'pointer'}
                        onClick={onAccessCodeClick}
                        _hover={{
                            bg: hoverColor
                        }}
                        rounded={'md'}
                        transition={'all 0.2s ease-in-out'}
                        fontSize={{
                            base: 'sm',
                            md: 'md'
                        }}
                    >
                        Access Code: {notebook.accessCode}
                    </Text>
                </Tooltip>
            </VStack>
        </HStack>
    );
};

export default NotebookHeader;
