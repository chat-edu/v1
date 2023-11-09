import React from 'react';

import {HStack, Icon, Text, VStack} from "@chakra-ui/react";

import {MdExposurePlus1} from "react-icons/md";
import {AiOutlineExclamationCircle} from "react-icons/ai";

import {AnswerCorrectness, Correctness} from "@/types/prompts/AnswerCorrectness";
import Markdown from "@/components/Utilities/Markdown";

interface Props {
    correctness: AnswerCorrectness
}

const QuestionCorrectness: React.FC<Props> = ({ correctness }) => {

    if(correctness.correct === Correctness.Unknown) return null;

    return (
        <HStack
            spacing={{
                base: 2,
                md: 4
            }}
        >
            {
                correctness.correct === Correctness.Correct && (
                    <Icon
                        as={MdExposurePlus1}
                        color={'brand.500'}
                        boxSize={6}
                    />
                )
            }
            {
                correctness.correct === Correctness.Incorrect && (
                    <Icon
                        as={AiOutlineExclamationCircle}
                        color={'red.500'}
                        boxSize={6}
                    />
                )
            }
            <VStack
                align={'start'}
                spacing={0}
            >
                <Text
                    fontSize={{
                        base: 'xs',
                        md: 'md'
                    }}
                    color={correctness.correct == Correctness.Correct ? 'green.500' : 'red.500'}
                    fontWeight={'semibold'}
                >
                    {correctness.correct == Correctness.Correct ? 'Correct!' : 'Incorrect!'}
                </Text>
                <Markdown>
                    {correctness.explanation}
                </Markdown>
            </VStack>
        </HStack>
    );
};

export default QuestionCorrectness;
