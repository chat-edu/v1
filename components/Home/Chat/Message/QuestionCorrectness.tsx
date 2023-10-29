import React from 'react';

import {Text} from "@chakra-ui/react";

interface Props {
    content: string
}

const QuestionCorrectness: React.FC<Props> = ({ content }) => {
    return (
        <Text>
            {content}
        </Text>
    );
};

export default QuestionCorrectness;
