import React from 'react';
import {HStack, Icon, Text} from "@chakra-ui/react";

import {IconType} from "react-icons";

interface Props {
    title: string;
    icon: IconType;
}

const ActionPrompt: React.FC<Props> = ({ title, icon }) => {
    return (
        <HStack
            spacing={4}
        >
            <Icon
                as={icon}
                boxSize={8}
            />
            <Text
                fontSize={'lg'}
                fontWeight={'medium'}
            >
                {title}
            </Text>
        </HStack>
    );
};

export default ActionPrompt;
