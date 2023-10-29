import React from 'react';

import {Message as MessageInterface} from "ai";

import {Box, Flex, Text, VStack} from "@chakra-ui/react";

import Message from "@/components/Home/Chat/Message";
import Welcome from "@/components/Welcome";

interface Props {
    messages: MessageInterface[],
    onMultipleChoiceAnswer: (answer: string) => void,
    askForHint: () => void,
    correctAnswers: { [key: string]: boolean }
}

const Messages: React.FC<Props> = ({ messages, onMultipleChoiceAnswer, askForHint, correctAnswers }) => {

    return (
        <Box
            w={'100%'}
            flex={1}
            display={'flex'}
            flexDirection={'column'}
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
                            messages.map(message => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    onMultipleChoiceAnswer={onMultipleChoiceAnswer}
                                    askForHint={askForHint}
                                    isCorrect={correctAnswers[message.id]}
                                />
                            ))
                        ) : (
                            <VStack
                                maxW={{ base: '100%', md: '40%' }}
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
