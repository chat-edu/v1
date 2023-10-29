import React from 'react';

import { Message as MessageInterface } from "ai";

import {Card, ColorMode, Text, Flex, useColorMode} from "@chakra-ui/react";

import StudyGuide from "@/components/Home/Chat/Message/StudyGuide";
import MultipleChoiceQuestion from "@/components/Home/Chat/Message/MultipleChoiceQuestion";
import TextBasedQuestion from "@/components/Home/Chat/Message/TextBasedQuestion";
import TextMessage from "@/components/Home/Chat/Message/TextMessage";
import QuestionCorrectness from "@/components/Home/Chat/Message/QuestionCorrectness";

import {parseMultipleChoice, multipleChoiceTag} from "@/lib/multipleChoice";
import {parseStudyGuide, studyGuideTag} from "@/lib/studyGuide";
import {parseTextBased, textBasedTag} from "@/lib/textBased";
import TextMessage from "@/components/Home/Chat/Message/TextMessage";
import {answerCheckTag, parseAnswerCorrectness} from "@/lib/answerCorrectness";
import QuestionCorrectness from "@/components/Home/Chat/Message/QuestionCorrectness";


interface Props {
    message: MessageInterface,
    onMultipleChoiceAnswer: (answer: string) => void,
    askForHint: () => void,
    isCorrect?: boolean
}

const getRoleColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return colorMode === 'light' ? 'brand.500' : 'brand.500';
        case 'assistant':
            return colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700';
        default:
            return 'gray.500';
    }
}

const getRoleBgColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return colorMode === 'light' ? 'brand.50' : 'brand.800';
        case 'assistant':
            return 'undefined'
        default:
            return 'gray.500';
    }
}

const getRoleName = (role: string) => {
    switch (role) {
        case 'user':
            return 'You';
        case 'assistant':
            return 'Assistant';
        default:
            return 'Unknown';
    }
}

const getRoleJustifyContent = (role: string) => {
    switch (role) {
        case 'user':
            return 'flex-end';  // Align to the right
        case 'assistant':
            return 'flex-start'; // Align to the left
        default:
            return 'center';
    }
}

const Message: React.FC<Props> = ({ message, onMultipleChoiceAnswer, askForHint, isCorrect }) => {

    const { colorMode } = useColorMode();

    return (
        <Flex
            justifyContent={getRoleJustifyContent(message.role)}
            w="100%"
        <Card
            w={'100%'}
            borderColor={isCorrect === undefined ? undefined : isCorrect ? 'brand.500' : 'red.500'}
        >
            <Card
                w={'95%'}
                borderColor={isCorrect === undefined ? undefined : isCorrect ? 'brand.500' : 'red.500'}
                borderWidth={isCorrect === undefined ? undefined : 2}
                bg={getRoleBgColor(message.role, colorMode)}
            >
                <Text
                    color={getRoleColor(message.role, colorMode)}
                    fontWeight={'semibold'}
                >
                    {getRoleName(message.role)}
                </Text>
                {
                    getMessageComponent(message, onMultipleChoiceAnswer, askForHint, isCorrect !== undefined)
                }
            </Card>
        </Flex>
                {getRoleName(message.role)}
            </Text>
            {
                getMessageComponent(message, onMultipleChoiceAnswer, askForHint, isCorrect !== undefined)
            }
        </Card>
    );
};

const getMessageComponent = (
    message: MessageInterface,
    onMultpleChoiceAnswer: (answer: string) => void,
    askForHint: () => void,
    answered: boolean
) => {
    const messageType = message.content.split(':')[0];
    switch (messageType) {
        case studyGuideTag:
            return (
                <StudyGuide
                    studyGuide={parseStudyGuide(message)}
                />
            );
        case multipleChoiceTag:
            return (
                <MultipleChoiceQuestion
                    question={parseMultipleChoice(message)}
                    onAnswer={onMultpleChoiceAnswer}
                    askForHint={askForHint}
                    answered={answered}
                />
            );
        case textBasedTag:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseTextBased(message)}
                    askForHint={askForHint}
                    answered={answered}
                />
            );
        case answerCheckTag:
            return (
                <QuestionCorrectness content={parseAnswerCorrectness(message)} />
            );
        default:
            return (
                <TextMessage
                    content={message.content}
                />
            )
    }
}




export default Message;
