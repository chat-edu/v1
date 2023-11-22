import React from 'react';

import {Box, Button, HStack} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";

import {TextBasedQuestion as TextBasedQuestionType} from "@/types/commands/TextBasedQuestion";
import {Command} from "@/types/commands/Command";
import {hintCommand} from "@/prompts";

interface Props {
    textBasedQuestion: TextBasedQuestionType,
    promptWithCommand: (command: Command<any>) => void,
    answered: boolean
}

const TextBasedQuestion: React.FC<Props> = ({ textBasedQuestion, promptWithCommand, answered }) => {
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
                onClick={() => promptWithCommand(hintCommand)}
                isDisabled={answered}
            >
                Hint
            </Button>
        </HStack>
    );
};

export default TextBasedQuestion;
