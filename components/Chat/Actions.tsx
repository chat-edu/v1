import React from 'react';

import {SimpleGrid, Text, VStack} from "@chakra-ui/react";

import {MdQuestionAnswer} from "react-icons/md";
import {SlOptionsVertical} from "react-icons/sl";

import Action from "@/components/Chat/Action";

import {
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
                columns={{ base: 2, xl: 3 }}
            >
                <Action
                    label={"Multiple Choice"}
                    icon={SlOptionsVertical}
                    onClick={() => promptWithCommand(multipleChoiceCommand)}
                    disabled={disabled}
                    tooltip={"Generate a multiple choice question."}
                />
                <Action
                    label={"Understanding"}
                    icon={MdQuestionAnswer}
                    onClick={() => promptWithCommand(understandingQuestionCommand)}
                    disabled={disabled}
                    tooltip={"Demonstrate your understanding in a free response question."}
                />
                <Action
                    label={"Application"}
                    icon={MdQuestionAnswer}
                    onClick={() => promptWithCommand(applicationQuestionCommand)}
                    disabled={disabled}
                    tooltip={"Apply your knowledge in a free response question."}
                />
                {/*<Action*/}
                {/*    label={"Study Guide"}*/}
                {/*    icon={FaLeaf}*/}
                {/*    onClick={() => promptWithCommand(studyGuideCommand)}*/}
                {/*    disabled={disabled}*/}
                {/*    tooltip={"Create a study guide for this topic."}*/}
                {/*/>*/}
            </SimpleGrid>
        </VStack>
    );
};

export default Actions;
