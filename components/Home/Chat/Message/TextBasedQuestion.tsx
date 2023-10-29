import React from 'react';

import {Button, HStack, Text} from "@chakra-ui/react";

import {TextBasedQuestion as TextBasedQuestionType} from "@/types/TextBasedQuestion";

interface Props {
    textBasedQuestion: TextBasedQuestionType,
    askForFreeFormHint: () => void
}

const TextBasedQuestion: React.FC<Props> = ({ textBasedQuestion, askForFreeFormHint }) => {
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
                onClick={askForFreeFormHint}
            >
                Hint
            </Button>
        </HStack>
    );
};

export default TextBasedQuestion;
