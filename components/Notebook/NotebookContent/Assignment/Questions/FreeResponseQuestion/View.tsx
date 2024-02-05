import React, {ChangeEvent, useState} from 'react';

import {Text, Textarea, VStack} from "@chakra-ui/react";

import {FreeResponseQuestion} from "@/types/assignment/FreeResponseQuestion";

interface Props {
    question: FreeResponseQuestion,
    setAnswer: (answer: string) => void;
}

const View: React.FC<Props> = ({ question, setAnswer}) => {

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
                onBlur={() => setAnswer(value)}
            />
        </VStack>
    );
};

export default View;
