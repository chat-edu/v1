import React from 'react';

import {Text} from "@chakra-ui/react";

import {TextBasedQuestion as TextBasedQuestionType} from "@/types/TextBasedQuestion";

interface Props {
    textBasedQuestion: TextBasedQuestionType
}

const TextBasedQuestion: React.FC<Props> = ({ textBasedQuestion }) => {
    return (
        <Text>
            {textBasedQuestion.question}
        </Text>
    );
};

export default TextBasedQuestion;
