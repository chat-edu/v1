import React from 'react';

import {Message as MessageInterface} from "ai";

import {Box, Flex, Text, VStack} from "@chakra-ui/react";

import Message from "@/components/Chat/Message";
import Welcome from "@/components/Welcome";
import {Command} from "@/types/commands/Command";
import {AnswerStates} from "@/hooks/useChatEdu";

interface Props {
    messages: MessageInterface[],
    isLoading: boolean,
    promptWithCommand: (command: Command<any>) => void,
    answerMapping: { [key: string]: AnswerStates }
}

const Messages: React.FC<Props> = ({ messages, promptWithCommand, answerMapping }) => {

    return (
        <Box
            w={'100%'}
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            px={2}
        >
            <Flex
                flex={1}
                w={'100%'}
                flexDirection={'column'}
                justifyContent={'flex-end'}
            >
                <VStack
                    w={'100%'}
                    spacing={4}
                    flex={messages.length === 0 ? 1 : undefined}
                    justifyContent={messages.length === 0 ? 'center' : undefined}
                    pt={2}
                >
                    {
                        messages.length > 0 ? (
                            messages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    promptWithCommand={promptWithCommand}
                                    answerState={answerMapping[message.id]}
                                />
                            ))
                        ) : (
                            <VStack
                                maxW={{ base: '100%', md: '60%' }}
                                px={4}
                            >
                                <Welcome />
                                <Text
                                    color={'brand.500'}
                                    fontWeight={'bold'}
                                    fontSize={{
                                        base: 'sm',
                                        md: 'lg'
                                    }}
                                    textAlign={'center'}
                                >
                                    Get started by making a multiple choice question, free form question, or study guide!
                                </Text>
                            </VStack>
                        )
                    }
                </VStack>
            </Flex>
        </Box>
    );
};

export default Messages;
