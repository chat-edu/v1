import React from 'react';

import {Heading, HStack, Image, Stack, Text, VStack} from "@chakra-ui/react";

interface Props {
    imageSrc: string,
    imageAlt: string,
    heading: React.ReactNode,
    subheading: React.ReactNode,
    rightComponent?: React.ReactNode
}

const PageHeader: React.FC<Props> = ({ imageSrc, imageAlt, heading, subheading, rightComponent }) => {

    return (
        <Stack
            w={'100%'}
            direction={{
                base: 'column',
                md: 'row'
            }}
            justifyContent={{
                base: 'center',
                md: 'space-between'
            }}
            spacing={{
                base: 4,
                md: 8
            }}
        >
            <HStack
                spacing={{
                    base: 4,
                    md: 8
                }}
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
            {rightComponent}
        </Stack>
    );
};

export default PageHeader;
