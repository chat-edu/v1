import React from 'react';

import {Stack, Text, VStack} from "@chakra-ui/react";

import {FaLeaf} from "react-icons/fa";
import {MdQuestionAnswer} from "react-icons/md";
import {SlOptionsVertical} from "react-icons/sl";

import Action from "@/components/Home/Chat/Action";

import {
    studyGuideCommand,
    multipleChoiceCommand,
    understandingQuestionCommand,
    applicationQuestionCommand,
} from "@/prompts";

import {Command} from "@/types/prompts/Command";


interface Props {
    promptWithCommand: (command: Command<any>) => void;
    disabled: boolean;
    showMessage: boolean;
}

const Actions: React.FC<Props> = ({ promptWithCommand, disabled, showMessage }) => {
    return (
        <VStack>
            {
                showMessage && (
                    <Text
                        fontWeight={'bold'}
                        fontSize={{
                            base: 'sm',
                            md: 'xl'
                        }}
                    >
                        Actions
                    </Text>
                )
            }
            <Stack
                w={'100%'}
                spacing={{ base: 2, md: 4 }}
                flexDirection={{ base: "row", md: "row" }}
            >
                <Action
                    label={"Study Guide"}
                    icon={FaLeaf}
                    onClick={() => promptWithCommand(studyGuideCommand)}
                    disabled={disabled}
                />
                <Action
                    label={"Multiple Choice"}
                    icon={SlOptionsVertical}
                    onClick={() => promptWithCommand(multipleChoiceCommand)}
                    disabled={disabled}
                />
                <Action
                    label={"Understanding Question"}
                    icon={MdQuestionAnswer}
                    onClick={() => promptWithCommand(understandingQuestionCommand)}
                    disabled={disabled}
                />
                <Action
                    label={"Application Questions"}
                    icon={MdQuestionAnswer}
                    onClick={() => promptWithCommand(applicationQuestionCommand)}
                    disabled={disabled}
                />
            </Stack>
        </VStack>
    );
};

export default Actions;
