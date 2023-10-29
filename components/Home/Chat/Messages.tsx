import React, { useEffect } from 'react';

import {Message as MessageInterface} from "ai";

import {Box, Flex, VStack} from "@chakra-ui/react";

import Message from "@/components/Home/Chat/Message";

interface Props {
    messages: MessageInterface[],
    onMultipleChoiceAnswer: (answer: string) => void,
    askForHint: () => void,
    correctAnswers: { [key: string]: boolean }
}

const Messages: React.FC<Props & { setShowMessage: (value: boolean) => void }> = ({ messages, setShowMessage, onMultipleChoiceAnswer, askForHint, correctAnswers  }) => {
    
    // Use effect to listen for changes in the messages array
    useEffect(() => {
        if (messages.length > 0) {
            setShowMessage(false);
        }
    }, [messages, setShowMessage]);
    
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
                overflow={'auto'}
            >
                <VStack
                    w={'100%'}
                    spacing={4}
                >
                    {
                        messages.map(message => (
                            <Message
                                 key={message.id}
                                 message={message}
                                 onMultipleChoiceAnswer={onMultipleChoiceAnswer}
                                 askForHint={askForHint}
                                 isCorrect={correctAnswers[message.id]}
                            />
                        ))
                    }
                </VStack>
            </Flex>
        </Box>
    );
};

export default Messages;
