import React from 'react';

import {Button, HStack} from "@chakra-ui/react";

import {hintCommand} from "@/prompts";
import {dontKnowCommand} from "@/prompts/commands/dontKnow";

import {Command} from "@/types/commands/Command";

interface Props {
    promptWithCommand: (command: Command<any>) => void,
    answered: boolean
}

const QuestionButtons: React.FC<Props> = ({ promptWithCommand, answered }) => {
    return (
        <HStack>
            <Button
                variant={'outline'}
                colorScheme={'brand'}
                onClick={() => promptWithCommand(hintCommand)}
                isDisabled={answered}
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                Hint
            </Button>
            <Button
                variant={'outline'}
                onClick={() => {
                    promptWithCommand(dontKnowCommand)
                }}
                isDisabled={answered}
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            >
                {"Don't Know"}
            </Button>
        </HStack>
    );
};

export default QuestionButtons;
