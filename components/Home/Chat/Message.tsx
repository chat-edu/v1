import React from 'react';

import { Message as MessageInterface } from "ai";

import {Card, ColorMode, Text, useColorMode, Flex} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";

interface Props {
    message: MessageInterface
}

const getRoleColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return colorMode === 'light' ? 'whiteAlpha.900' : 'whiteAlpha.900';
        case 'assistant':
            return colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700';
        default:
            return 'gray.500';
    }
}

const getRoleBgColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return 'brand.500';
        case 'assistant':
            return 'undefined'
        default:
            return 'gray.500';
    }
}

const getRoleName = (role: string) => {
    switch (role) {
        case 'user':
            return 'You';
        case 'assistant':
            return 'Assistant';
        default:
            return 'Unknown';
    }
}

const getRoleFlexDirection = (role: string) => {
    switch (role) {
        case 'user':
            return 'row-reverse';  // Align to the right
        case 'assistant':
            return 'row';          // Align to the left
        default:
            return 'row';
    }
}

const getRoleJustifyContent = (role: string) => {
    switch (role) {
        case 'user':
            return 'flex-end';  // Align to the right
        case 'assistant':
            return 'flex-start'; // Align to the left
        default:
            return 'center';
    }
}

const Message: React.FC<Props> = ({ message }) => {

    const { colorMode } = useColorMode();

    return (
        <Flex justifyContent={getRoleJustifyContent(message.role)} w="120%" p={0.5}>
            <Flex flexDirection={getRoleFlexDirection(message.role)} w="80%" p={0.5}>
                <Card w={'80%'} mx="auto" bg={getRoleBgColor(message.role, colorMode)} borderRadius="2xl">
                    <Text color={getRoleColor(message.role, colorMode)}>
                        {getRoleName(message.role)}
                    </Text>
                    <Markdown content={message.content} />
                </Card>
            </Flex>
        </Flex>
    );
};

export default Message;
