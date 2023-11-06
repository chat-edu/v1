import React from 'react';

import { Message as MessageInterface } from "ai";

import {Card, ColorMode, Flex, useColorMode} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

import {SlOptionsVertical} from "react-icons/sl";
import {MdQuestionAnswer} from "react-icons/md";
import {FaLeaf} from "react-icons/fa";
import {BsFillLightbulbFill} from "react-icons/bs";

import StudyGuide from "@/components/Home/Chat/Message/StudyGuide";
import MultipleChoiceQuestion from "@/components/Home/Chat/Message/MultipleChoiceQuestion";
import TextBasedQuestion from "@/components/Home/Chat/Message/TextBasedQuestion";
import TextMessage from "@/components/Home/Chat/Message/TextMessage";
import QuestionCorrectness from "@/components/Home/Chat/Message/QuestionCorrectness";
import ActionPrompt from "@/components/Home/Chat/Message/ActionPrompt";
import Hint from "@/components/Home/Chat/Message/Hint";

import {
    ResponseTags,
    PromptTags,
    parseResponse,
    studyGuideCommand,
    hintCommand,
    multipleChoiceCommand,
    understandingQuestionCommand,
    applicationQuestionCommand,
    answerCorrectnessDefaults
} from "@/prompts";

interface Props {
    message: MessageInterface,
    onMultipleChoiceAnswer: (answer: string) => void,
    askForHint: () => void,
    isCorrect?: boolean
}

const getRoleBgColor = (role: string, colorMode: ColorMode) => {
    switch (role) {
        case 'user':
            return transparentize(colorMode === 'light' ? 'brand.200' : 'brand.300', 0.3);
        case 'assistant':
            return undefined
        default:
            return 'gray.500';
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
            borderColor={isCorrect === undefined ? undefined : isCorrect ? 'brand.500' : 'red.500'}
        >
            <Card
                maxW={'95%'}
                borderColor={isCorrect === undefined ? undefined : isCorrect ? 'brand.500' : 'red.500'}
                borderWidth={isCorrect === undefined ? undefined : 2}
                // @ts-ignore
                bg={getRoleBgColor(message.role, colorMode)}
            >
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
    const messageParts = message.content.split(':');
    switch (messageParts[0]) {
        case ResponseTags.STUDY_GUIDE:
            return (
                <StudyGuide
                    studyGuide={parseResponse(studyGuideCommand, message)}
                />
            );
        case ResponseTags.MULTIPLE_CHOICE:
            return (
                <MultipleChoiceQuestion
                    question={parseResponse(multipleChoiceCommand, message)}
                    onAnswer={onMultpleChoiceAnswer}
                    askForHint={askForHint}
                    answered={answered}
                />
            );
        case ResponseTags.UNDERSTANDING:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(understandingQuestionCommand, message)}
                    askForHint={askForHint}
                    answered={answered}
                />
            );
        case ResponseTags.APPLICATION:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(applicationQuestionCommand, message)}
                    askForHint={askForHint}
                    answered={answered}
                />
            );
        case ResponseTags.ANSWER_CORRECTNESS:
            return (
                <QuestionCorrectness
                    correctness={parseResponse(answerCorrectnessDefaults, message)}
                />
            );
        case ResponseTags.HINT:
            return (
                <Hint
                    hint={parseResponse(hintCommand, message)}
                />
            );
        case PromptTags.HINT:
            return (
                <ActionPrompt
                    title={"Hint"}
                    icon={BsFillLightbulbFill}
                />
            );
        case PromptTags.MULTIPLE_CHOICE:
            return (
                <ActionPrompt
                    title={"Multiple Choice Question"}
                    icon={SlOptionsVertical}
                />
            );
        case PromptTags.STUDY_GUIDE:
            return (
                <ActionPrompt
                    title={"Study Guide"}
                    icon={FaLeaf}
                />
            );
        case PromptTags.UNDERSTANDING:
            return (
                <ActionPrompt
                    title={"Understanding Question"}
                    icon={MdQuestionAnswer}
                />
            );
        case PromptTags.APPLICATION:
            return (
                <ActionPrompt
                    title={"Application Question"}
                    icon={MdQuestionAnswer}
                />
            );
        case PromptTags.ANSWER_CORRECTNESS:
            return (
                <TextMessage content={messageParts[1].trim()} />
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
