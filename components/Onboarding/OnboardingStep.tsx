import React from 'react';

import {Heading, VStack, Text} from "@chakra-ui/react";

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

const OnboardingStep: React.FC<Props> = ({ title, description, children }) => {
    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <Heading
                size={'lg'}
            >
                {title}
            </Heading>
            <Text
                textAlign={'center'}
            >
                {description}
            </Text>
            {children}
        </VStack>
    );
};

export default OnboardingStep;
