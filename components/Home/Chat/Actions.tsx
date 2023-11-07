import React from 'react';

import {Stack, Text, VStack} from "@chakra-ui/react";

import {FaLeaf} from "react-icons/fa";
import {MdQuestionAnswer} from "react-icons/md";
import {SlOptionsVertical} from "react-icons/sl";

import Action from "@/components/Home/Chat/Action";

interface Props {
    askMultipleChoice: () => Promise<void>;
    askUnderstanding: () => Promise<void>;
    askApplication: () => Promise<void>;
    generateStudyGuide: () => Promise<void>;
    disabled: boolean;
    showMessage: boolean;
}

const Actions: React.FC<Props> = ({ askMultipleChoice, askUnderstanding, askApplication, generateStudyGuide, disabled, showMessage }) => {
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
                    onClick={generateStudyGuide}
                    disabled={disabled}
                />
                <Action
                    label={"Multiple Choice"}
                    icon={SlOptionsVertical}
                    onClick={askMultipleChoice}
                    disabled={disabled}
                />
                <Action
                    label={"Understanding Question"}
                    icon={MdQuestionAnswer}
                    onClick={askUnderstanding}
                    disabled={disabled}
                />
                <Action
                    label={"Application Questions"}
                    icon={MdQuestionAnswer}
                    onClick={askApplication}
                    disabled={disabled}
                />
            </Stack>
        </VStack>
    );
};

export default Actions;
