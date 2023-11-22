import React from 'react';

import {SimpleGrid, Text, VStack} from "@chakra-ui/react";

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

import {Command} from "@/types/commands/Command";


interface Props {
    promptWithCommand: (command: Command<any>) => void;
    disabled: boolean;
    showMessage: boolean;
}

const Actions: React.FC<Props> = ({ promptWithCommand, disabled, showMessage }) => {
    return (
        <VStack
            px={2}
        >
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
            <SimpleGrid
                w={'100%'}
                spacing={{ base: 2, xl: 4 }}
                columns={{ base: 2, xl: 4 }}
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
                    label={"Understanding"}
                    icon={MdQuestionAnswer}
                    onClick={() => promptWithCommand(understandingQuestionCommand)}
                    disabled={disabled}
                />
                <Action
                    label={"Application"}
                    icon={MdQuestionAnswer}
                    onClick={() => promptWithCommand(applicationQuestionCommand)}
                    disabled={disabled}
                />
            </SimpleGrid>
        </VStack>
    );
};

export default Actions;
