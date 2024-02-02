import React from 'react';
import {Text} from "@chakra-ui/react";

interface Props {
    children: React.ReactNode,
    color?: string
}

const BoldText: React.FC<Props> = ({ children, color }) => {
    return (
        <Text
            as={'span'}
            fontWeight={'bold'}
            color={color}
        >
            {children}
        </Text>
    );
};

export default BoldText;
