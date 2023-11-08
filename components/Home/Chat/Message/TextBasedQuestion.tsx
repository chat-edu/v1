import React from 'react';

import {Box, Button, HStack} from "@chakra-ui/react";

import {TextBasedQuestion as TextBasedQuestionType} from "@/types/prompts/TextBasedQuestion";
import Markdown from "@/components/Utilities/Markdown";

interface Props {
    textBasedQuestion: TextBasedQuestionType,
    askForHint: () => void,
    answered: boolean
}

const TextBasedQuestion: React.FC<Props> = ({ textBasedQuestion, askForHint, answered }) => {
    return (
        <HStack
            w={'100%'}
        >
            <Box
                flex={1}
            >
                <Markdown>
                    {`***${textBasedQuestion.question}***`}
                </Markdown>
            </Box>
            <Button
                variant={'outline'}
                colorScheme={'brand'}
                onClick={askForHint}
                isDisabled={answered}
            >
                Hint
            </Button>
        </HStack>
    );
};

export default TextBasedQuestion;
