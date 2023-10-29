import React from 'react';

import { Message as MessageInterface } from "ai";

import {Card, ColorMode, Text, useColorMode} from "@chakra-ui/react";

import StudyGuide from "@/components/Home/Chat/Message/StudyGuide";
import MultipleChoiceQuestion from "@/components/Home/Chat/Message/MultipleChoiceQuestion";
import TextBasedQuestion from "@/components/Home/Chat/Message/TextBasedQuestion";

import {parseMultipleChoice, multipleChoiceTag} from "@/lib/multipleChoice";
import {parseStudyGuide, studyGuideTag} from "@/lib/studyGuide";
import {parseTextBased, textBasedTag} from "@/lib/textBased";
import TextMessage from "@/components/Home/Chat/Message/TextMessage";


interface Props {
    message: MessageInterface,
    onMultipleChoiceAnswer: (answer: string) => void,
    askForFreeFormHint: () => void
}

const getRoleColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return 'brand.500';
        case 'assistant':
            return colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700';
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

const Message: React.FC<Props> = ({ message, onMultipleChoiceAnswer, askForFreeFormHint }) => {

    const { colorMode } = useColorMode();

    return (
        <Card
            w={'100%'}
        >
            <Text
                color={getRoleColor(message.role, colorMode)}
            >
                {getRoleName(message.role)}
            </Text>
            {
                getMessageComponent(message, onMultipleChoiceAnswer, askForFreeFormHint)
            }
        </Card>
    );
};

const getMessageComponent = (
    message: MessageInterface,
    onMultpleChoiceAnswer: (answer: string) => void,
    askForFreeFormHint: () => void,
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
                />
            );
        case textBasedTag:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseTextBased(message)}
                    askForFreeFormHint={askForFreeFormHint}
                />
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
