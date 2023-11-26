import React from 'react';

import { Message as MessageInterface } from "ai";

import {Card, ColorMode, Flex, useColorMode} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

import {SlOptionsVertical} from "react-icons/sl";
import {MdQuestionAnswer} from "react-icons/md";
import {FaLeaf} from "react-icons/fa";
import {BsFillLightbulbFill} from "react-icons/bs";

// @ts-ignore
import jsonAutocomplete from "json-autocomplete";

import StudyGuide from "@/components/Chat/Message/StudyGuide";
import MultipleChoiceQuestion from "@/components/Chat/Message/MultipleChoiceQuestion";
import TextBasedQuestion from "@/components/Chat/Message/TextBasedQuestion";
import TextMessage from "@/components/Chat/Message/TextMessage";
import QuestionCorrectness from "@/components/Chat/Message/QuestionCorrectness";
import ActionPrompt from "@/components/Chat/Message/ActionPrompt";
import Hint from "@/components/Chat/Message/Hint";

import {
    ResponseTags,
    CommandTags,
    parseResponse,
    studyGuideCommand,
    hintCommand,
    multipleChoiceCommand,
    understandingQuestionCommand,
    applicationQuestionCommand,
    answerCorrectnessDefaults
} from "@/prompts";

import {Command} from "@/types/commands/Command";

interface Props {
    message: MessageInterface,
    promptWithCommand: (command: Command<any>) => void,
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

const Message: React.FC<Props> = ({ message, promptWithCommand, isCorrect }) => {

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
                    getMessageComponent(message, promptWithCommand, isCorrect !== undefined)
                }
            </Card>
        </Flex>
    );
};

const getMessageComponent = (
    message: MessageInterface,
    promptWithCommand: (command: Command<any>) => void,
    answered: boolean
) => {
    // const messageContent = jsonAutocomplete(message.content) as string;
    let tag: string;
    let content: any;
    try {
        let parsed;
        try {
            parsed = JSON.parse(message.content);
        } catch (e) {
            parsed = JSON.parse(jsonAutocomplete(message.content) as string);
        }
        console.log(parsed)
        tag = parsed.tag;
        content = parsed.content;
    } catch (e) {
        return null;
    }
    if(!content) return null;
    switch (tag) {
        case ResponseTags.STUDY_GUIDE:
            return (
                <StudyGuide
                    studyGuide={parseResponse(studyGuideCommand, content)}
                />
            );
        case ResponseTags.MULTIPLE_CHOICE:
            return (
                <MultipleChoiceQuestion
                    question={parseResponse(multipleChoiceCommand, content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.UNDERSTANDING:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(understandingQuestionCommand, content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.APPLICATION:
            return (
                <TextBasedQuestion
                    textBasedQuestion={parseResponse(applicationQuestionCommand, content)}
                    promptWithCommand={promptWithCommand}
                    answered={answered}
                />
            );
        case ResponseTags.ANSWER_CORRECTNESS:
            return (
                <QuestionCorrectness
                    correctness={parseResponse(answerCorrectnessDefaults, content)}
                />
            );
        case ResponseTags.HINT:
            return (
                <Hint
                    hint={parseResponse(hintCommand, content)}
                />
            );
        case CommandTags.HINT:
            return (
                <ActionPrompt
                    title={"Hint"}
                    icon={BsFillLightbulbFill}
                />
            );
        case CommandTags.MULTIPLE_CHOICE:
            return (
                <ActionPrompt
                    title={"Multiple Choice Question"}
                    icon={SlOptionsVertical}
                />
            );
        case CommandTags.STUDY_GUIDE:
            return (
                <ActionPrompt
                    title={"Study Guide"}
                    icon={FaLeaf}
                />
            );
        case CommandTags.UNDERSTANDING:
            return (
                <ActionPrompt
                    title={"Understanding Question"}
                    icon={MdQuestionAnswer}
                />
            );
        case CommandTags.APPLICATION:
            return (
                <ActionPrompt
                    title={"Application Question"}
                    icon={MdQuestionAnswer}
                />
            );
        case CommandTags.ANSWER_CORRECTNESS:
            return (
                <TextMessage content={(content || "").trim()} />
            );
        default:
            return (
                <TextMessage
                    content={content}
                />
            )
    }
}




export default Message;
