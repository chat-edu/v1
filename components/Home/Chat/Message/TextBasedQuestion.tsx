import React from 'react';

import {Button, HStack, Text} from "@chakra-ui/react";

import {TextBasedQuestion as TextBasedQuestionType} from "@/types/TextBasedQuestion";

interface Props {
    textBasedQuestion: TextBasedQuestionType,
    askForHint: () => void
}

const TextBasedQuestion: React.FC<Props> = ({ textBasedQuestion, askForHint }) => {
    return (
        <HStack
            w={'100%'}
        >
            <Text
                flex={1}
                fontSize={'lg'}
                fontWeight={'bold'}
            >
                {textBasedQuestion.question}
            </Text>
            <Button
                variant={'outline'}
                colorScheme={'brand'}
                onClick={askForHint}
            >
                Hint
            </Button>
        </HStack>
    );
};

export default TextBasedQuestion;
