import React from 'react';

import {Heading, HStack, VStack} from "@chakra-ui/react";

interface Props {
    heading: string,
    headingRightComponent?: React.ReactNode,
    children: React.ReactNode
}

const SectionBlock: React.FC<Props> = ({ heading, headingRightComponent, children}) => {
    return (
        <VStack
            spacing={4}
            align={'start'}
            w={'100%'}
        >
            <HStack
                w={'100%'}
                justify={'space-between'}
            >
                <Heading
                    size={{
                        base: 'md',
                        md: 'lg'
                    }}
                >
                    {heading}
                </Heading>
                {headingRightComponent}
            </HStack>
            {children}
        </VStack>
    );
};

export default SectionBlock;
