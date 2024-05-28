import React from 'react';
import {DontKnow as DontKnowType} from "@/types/commands/DontKnow";
import Markdown from "@/components/Utilities/Markdown";
import {HStack, Icon} from "@chakra-ui/react";
import {FaInfo} from "react-icons/fa";

interface Props {
    dontKnow: DontKnowType
}

const DontKnow: React.FC<Props> = ({ dontKnow }) => {
    return (
        <HStack
            spacing={4}
        >
            <Icon
                as={FaInfo}
            />
            <Markdown>
                {dontKnow.explanation}
            </Markdown>
        </HStack>
    );
};

export default DontKnow;
