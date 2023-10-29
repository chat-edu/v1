import React, { useState } from 'react';

import {Button, Text, VStack} from "@chakra-ui/react";

import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/MultipleChoiceQuestion";

interface Props {
    question: MultipleChoiceQuestionType
}

const MultipleChoiceQuestion: React.FC<Props> = ({ question }) => {

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const buttonColorScheme = (index: number) => (
        selectedIndex == index
            ? (index == question.answerIndex ? 'green' : 'red')
            : undefined
    )

    return (
        <VStack
            w={'100%'}
            alignItems={'flex-start'}
        >
            <Text
                fontSize={'lg'}
                fontWeight={'bold'}
            >
                {question.question}
            </Text>
            <VStack
                w={'100%'}
            >
                {
                    question.options.map((option, index) => (
                        <Button
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
                            fontWeight={'normal'}
                            colorScheme={buttonColorScheme(index)}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {option}
                        </Button>
                    ))
                }
            </VStack>
        </VStack>
    );
};

export default MultipleChoiceQuestion;
