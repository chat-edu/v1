import React, { useState, useRef } from 'react';

import {Button, HStack, VStack} from "@chakra-ui/react";

import {
    MultipleChoiceKey,
    MultipleChoiceQuestion as MultipleChoiceQuestionType
} from "@/types/commands/MultipleChoiceQuestion";

import confetti from 'canvas-confetti';
import Markdown from "@/components/Utilities/Markdown";
import {Command} from "@/types/commands/Command";
import {answerCorrectnessCommand, hintCommand} from "@/prompts";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

interface Props {
    question: MultipleChoiceQuestionType,
    promptWithCommand: (command: Command<any>) => void,
    answered: boolean
}

const MultipleChoiceQuestion: React.FC<Props> = ({ question, promptWithCommand, answered }) => {

    const [selectedOption, setSelectedOption] = useState<MultipleChoiceKey | null>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const { height, width } = useViewportDimensions();

    const onClick = (option: MultipleChoiceKey, index: number) => {
        if (selectedOption == null) {
            setSelectedOption(option);
            // @ts-ignore
            promptWithCommand(answerCorrectnessCommand(question.question, question.options[option]));
            if (option === question.answer) {
                const buttonRef = buttonRefs.current[index];
                if (buttonRef) {
                    triggerConfettiFromButton(buttonRef);
                }
            }
        }
    };

    const triggerConfettiFromButton = (button: HTMLButtonElement) => {
        const rect = button.getBoundingClientRect(); // get button's position
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        confetti({
            particleCount: 50,
            startVelocity: 25,
            spread: 360,
            gravity: 0.6,
            origin: { x: x / width, y: y / height },
            colors: ["#4caf50"]
        });
    }

    const buttonColorScheme = (key: MultipleChoiceKey) => (
        selectedOption == key
            ? (key == question.answer ? 'green' : 'red')
            : (answered && key == question.answer ? 'green' : undefined)
    )

    return (
        <HStack
            w={'100%'}
            spacing={4}
        >
            <VStack
                w={'100%'}
                alignItems={'flex-start'}
                flex={1}
            >
                <HStack
                    justifyContent={'space-between'}
                    gap={4}
                >
                    <Markdown>
                        {`***${question.question}***`}
                    </Markdown>
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
                </HStack>
                <VStack
                    w={'100%'}
                >
                    {
                        Object.keys(question.options || {}).map((option, index) => (
                            <Button
                                ref={(el: HTMLButtonElement | null) => buttonRefs.current[index] = el}
                                variant={'outline'}
                                key={index}
                                maxW={'100%'}
                                w={'100%'}
                                wordBreak={'break-word'}
                                whiteSpace="normal"
                                h={'auto'}
                                py={2}
                                textAlign={'left'}
                                justifyContent={'flex-start'}
                                fontSize={{
                                    base: 'xs',
                                    md: 'md'
                                }}
                                fontWeight={'normal'}
                                colorScheme={buttonColorScheme(option as MultipleChoiceKey)}
                                onClick={() => onClick(option as MultipleChoiceKey, index)}
                                isDisabled={answered}
                            >
                                <Markdown>
                                    {
                                        // @ts-ignore
                                        question.options[option]
                                    }
                                </Markdown>
                            </Button>
                        ))
                    }
                </VStack>
            </VStack>
        </HStack>
    );
};

export default MultipleChoiceQuestion;
