import React from 'react';

import { Message as MessageInterface } from "ai";

import {Card, ColorMode, Flex, useColorMode} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

import {SlOptionsVertical} from "react-icons/sl";
import {MdQuestionAnswer} from "react-icons/md";
import {FaLeaf} from "react-icons/fa";

import StudyGuide from "@/components/Home/Chat/Message/StudyGuide";
import MultipleChoiceQuestion from "@/components/Home/Chat/Message/MultipleChoiceQuestion";
import TextBasedQuestion from "@/components/Home/Chat/Message/TextBasedQuestion";
import TextMessage from "@/components/Home/Chat/Message/TextMessage";
import QuestionCorrectness from "@/components/Home/Chat/Message/QuestionCorrectness";
import ActionPrompt from "@/components/Home/Chat/Message/ActionPrompt";

import {parseMultipleChoice, multipleChoiceQuestionTag, multipleChoicePromptTag} from "@/lib/multipleChoice";
import {parseStudyGuide, studyGuideAnswerTag, studyGuidePromptTag} from "@/lib/studyGuide";
import {parseTextBased, textBasedPromptTag, textBasedQuestionTag} from "@/lib/textBased";
import {answerCheckTag, parseAnswerCorrectness} from "@/lib/answerCorrectness";


interface Props {
    message: MessageInterface,
    onMultipleChoiceAnswer: (answer: string) => void,
    askForHint: () => void,
    isCorrect?: boolean
}

// const getRoleColor = (role: string, colorMode: ColorMode) => {
//     switch (role) {
//         case 'user':
//             return colorMode === 'light' ? 'brand.500' : 'brand.500';
//         case 'assistant':
//             return colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700';
//         default:
//             return 'gray.500';
//     }
// }

const getRoleBgColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return transparentize(colorMode === 'light' ? 'brand.200' : 'brand.300', 0.2);
        case 'assistant':
            return undefined
        default:
            return 'gray.500';
    }
}

// const getRoleName = (role: string) => {
//     switch (role) {
//         case 'user':
//             return 'You';
//         case 'assistant':
//             return 'Assistant';
//         default:
//             return 'Unknown';
//     }
// }

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
            borderColor={isCorrect === undefined ? undefined : isCorrect ? 'brand.500' : 'red.500'}
        >
            <Card
                w={'95%'}
                borderColor={isCorrect === undefined ? undefined : isCorrect ? 'brand.500' : 'red.500'}
                borderWidth={isCorrect === undefined ? undefined : 2}
                // @ts-ignore
                bg={getRoleBgColor(message.role, colorMode)}
            >
                {/*<Text*/}
                {/*    color={getRoleColor(message.role, colorMode)}*/}
                {/*    fontWeight={'semibold'}*/}
                {/*>*/}
                {/*    {getRoleName(message.role)}*/}
                {/*</Text>*/}
                {
                    getMessageComponent(message, onMultipleChoiceAnswer, askForHint, isCorrect !== undefined)
                }
            </Card>
        </Flex>
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
        case studyGuideAnswerTag:
            return (
                <StudyGuide
                    studyGuide={parseStudyGuide(message)}
                />
            );
        case multipleChoiceQuestionTag:
            return (
                <MultipleChoiceQuestion
                    question={parseMultipleChoice(message)}
                    onAnswer={onMultpleChoiceAnswer}
                    askForHint={askForHint}
                    answered={answered}
                />
            );
        case textBasedQuestionTag:
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
        case multipleChoicePromptTag:
            return (
                <ActionPrompt
                    title={"Multiple Choice Question"}
                    icon={SlOptionsVertical}
                />
            );
        case studyGuidePromptTag:
            return (
                <ActionPrompt
                    title={"Study Guide"}
                    icon={FaLeaf}
                />
            );
        case textBasedPromptTag:
            return (
                <ActionPrompt
                    title={"Free-From Question"}
                    icon={MdQuestionAnswer}
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
