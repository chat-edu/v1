import React, { useState, useRef } from 'react';

import {Button, HStack, VStack} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";

import {MultipleChoiceKey, MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/commands/MultipleChoiceQuestion";

interface Props {
    question: MultipleChoiceQuestionType,
    setAnswer: (answer: MultipleChoiceKey) => void
}

const View: React.FC<Props> = ({ question, setAnswer }) => {

    const [selectedOption, setSelectedOption] = useState<MultipleChoiceKey | null>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const onClick = (option: MultipleChoiceKey) => {
        setSelectedOption(option);
        setAnswer(option);
    };

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
                <Markdown>
                    {`***${question.question}***`}
                </Markdown>
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
                                onClick={() => onClick(option as MultipleChoiceKey)}
                                colorScheme={selectedOption === option ? 'blue' : undefined}
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

export default View;
