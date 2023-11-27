import React from 'react';

import {Text} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";

interface Props {
    text: string;
}

const Summary: React.FC<Props> = ({ text }) => {

    if(text === '') {
        return (
            <Text>
                Generate a summery by clicking the button below.
            </Text>
        )
    }

    return (
        <Markdown>
            {text}
        </Markdown>
    );
};

export default Summary;
