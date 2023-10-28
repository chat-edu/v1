import React, {ChangeEventHandler} from 'react';

import {Button, Card, Flex, FormControl, FormLabel, HStack, Input, useColorModeValue} from "@chakra-ui/react";

import Actions from "@/components/Home/Chat/Actions";

import {Note} from "@/types/Note";

interface Props {
    value: string,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    notes: Note[]
}

const InputBox: React.FC<Props> = ({ value, handleChange, handleSubmit, notes }) => {

    const inputBoxColor = useColorModeValue("white", "#2D2D2D")

    return (
        <Flex
           flexDirection={'column'}
           gap={4}
           position={'sticky'}
           bottom={0}
           right={0}
           pt={4}
        >
            <Actions
                notes={notes}
            />
            <Card
                bg={inputBoxColor}
                p={4}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: '100%'
                    }}
                >
                    <HStack
                        align={'flex-end'}
                    >
                        <FormControl
                            flex={1}
                        >
                            <FormLabel>
                                Prompt
                            </FormLabel>
                            <Input
                                value={value}
                                onChange={handleChange}
                                focusBorderColor={'brand.500'}
                                flex={1}
                            />
                        </FormControl>
                        <Button
                            type={'submit'}
                            colorScheme={'brand'}
                            flexShrink={0}
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
