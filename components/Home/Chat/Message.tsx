import React from 'react';

import { Message as MessageInterface } from "ai";

import {Card, ColorMode, Text, useColorMode} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";

interface Props {
    message: MessageInterface
}

const getRoleColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return 'brand.500';
        case 'assistant':
            return colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700';
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

const Message: React.FC<Props> = ({ message }) => {

    const { colorMode } = useColorMode();

    return (
        <Card
            w={'100%'}
        >
            <Text
                color={getRoleColor(message.role, colorMode)}
            >
                {getRoleName(message.role)}
            </Text>
            <Markdown
                content={message.content}
            />
        </Card>
    );
};

export default Message;
