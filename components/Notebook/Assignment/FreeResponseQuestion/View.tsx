import React, {ChangeEvent, useState} from 'react';

import {Input, Text, Textarea, VStack} from "@chakra-ui/react";

import {FreeResponseQuestion} from "@/types/assignment/FreeResponseQuestion";

interface Props {
    question: FreeResponseQuestion
}

const View: React.FC<Props> = ({ question}) => {

    const [value, setValue] = useState<string>("")

    return (
        <VStack
            w={'100%'}
            align={'flex-start'}
        >
            <Text
                fontWeight={'bold'}
                fontStyle={'italic'}
            >
                {question.question}
            </Text>
            <Textarea
                placeholder={"Type your response here..."}
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
                focusBorderColor={"brand.500"}
            />
        </VStack>
    );
};

export default View;
