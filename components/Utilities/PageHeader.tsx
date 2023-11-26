import React from 'react';

import {Heading, HStack, Image, Text, VStack} from "@chakra-ui/react";

interface Props {
    imageSrc: string,
    imageAlt: string,
    heading: React.ReactNode,
    subheading: React.ReactNode
}

const PageHeader: React.FC<Props> = ({ imageSrc, imageAlt, heading, subheading }) => {

    return (
        <HStack
            spacing={{
                base: 4,
                md: 8
            }}
            w={'100%'}
        >
            <Image
                src={imageSrc}
                boxSize={'100px'}
                alt={imageAlt}
            />
            <VStack
                align={'start'}
            >
                <Heading
                    size={{
                        base: 'lg',
                        md: 'xl'
                    }}
                >
                    {heading}
                </Heading>
                <Text
                    fontSize={{
                        base: 'sm',
                        md: 'lg'
                    }}
                >
                    {subheading}
                </Text>
            </VStack>
        </HStack>
    );
};

export default PageHeader;
