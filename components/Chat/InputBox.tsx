import React, {ChangeEventHandler} from 'react';

import {
    Box,
    Button,
    Card,
    CircularProgress,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Text,
    Textarea,
    useColorModeValue
} from "@chakra-ui/react";

import Actions from "@/components/Chat/Actions";

import {Command, CommandTypes} from "@/types/commands/Command";

import {Note} from "@/types/Note";

interface Props {
    value: string,
    isLoading: boolean,
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    notes: Note[],
    promptWithCommand: (command: Command<any>) => void,
    promptType: CommandTypes
    showMessage: boolean;
    correctAnswers: { [key: string]: boolean };
}

const InputBox: React.FC<Props> = ({ value, isLoading, handleChange, handleSubmit, promptWithCommand, promptType, showMessage, correctAnswers }) => {

    const inputBoxColor = useColorModeValue("white", "#2D2D2D")

    return (
        <Flex
           flexDirection={'column'}
           gap={{
               base: 2,
               md: 4
           }}
           position={'sticky'}
           bottom={0}
           right={0}
           pt={4}
        >
            <Actions
                promptWithCommand={promptWithCommand}
                disabled={promptType === CommandTypes.TEXT_BASED || promptType === CommandTypes.MULTIPLE_CHOICE || promptType === CommandTypes.HINT || isLoading}
                showMessage={showMessage}
            />
            <Card
                bg={inputBoxColor}
                roundedBottom={{
                    base: 'none',
                    md: 'md'
                }}
                roundedTop={'md'}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: '100%'
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                            handleSubmit(event);
                        }
                    }}
                >
                    <HStack
                        align={'flex-end'}
                    >
                        {
                            Object.keys(correctAnswers).length > 0 && (
                                <Box
                                    position={'relative'}
                                    boxSize={'60px'}
                                >
                                    <CircularProgress
                                        color={'brand.500'}
                                        value={Object.values(correctAnswers).filter(Boolean).length}
                                        max={Object.keys(correctAnswers).length}
                                        size={'60px'}
                                    />
                                    <Text
                                        position={'absolute'}
                                        top={'50%'}
                                        left={'50%'}
                                        transform={'translate(-50%, -50%)'}
                                        fontSize={'xs'}
                                        fontWeight={'bold'}
                                    >
                                        {Math.ceil(Object.values(correctAnswers).filter(Boolean).length / Object.keys(correctAnswers).length * 100)}%
                                    </Text>
                                </Box>
                            )
                        }
                        <FormControl
                            flex={1}
                        >
                            <FormLabel>
                                {promptType === CommandTypes.TEXT_BASED ? 'Answer' : 'Ask ChatEDU'}
                            </FormLabel>
                            <Textarea
                                value={value}
                                onChange={handleChange}
                                focusBorderColor={'brand.500'}
                                flex={1}
                                isDisabled={promptType === CommandTypes.MULTIPLE_CHOICE || isLoading}
                                rows={1}
                                size={{
                                    base: 'sm',
                                    md: 'md'
                                }}
                            />
                        </FormControl>
                        <Button
                            type={'submit'}
                            colorScheme={'brand'}
                            flexShrink={0}
                            isDisabled={promptType === CommandTypes.MULTIPLE_CHOICE || isLoading}
                            size={{
                                base: 'sm',
                                md: 'md'
                            }}
                            isLoading={isLoading}
                        >
                            Send
                        </Button>
                    </HStack>
                </form>
            </Card>
        </Flex>
    );
};

export default InputBox;
