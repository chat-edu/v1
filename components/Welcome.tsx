import React from 'react';

import {Heading, Image, Text, VStack} from "@chakra-ui/react";

const Welcome = () => {
    return (
        <VStack
            gap={{
                base: 2,
                md: 4
            }}
        >
            <Image
                src={'/logo.png'}
                boxSize={'100px'}
                alt={'Edu Chat Logo'}
            />
            <Heading
                textAlign={'center'}
                size={{
                    base: 'md',
                    md: 'lg'
                }}
            >
                <Text
                    as='span'
                >
                    Welcome to Chat
                </Text>
                <Text
                    as='span'
                    color={'brand.500'}
                >
                    EDU
                </Text>
            </Heading>
            <Text
                textAlign={'center'}
                fontSize={{
                    base: 'sm',
                    md: '2xl'
            }}
                fontWeight={'bold'}
            >
                Supercharge your learning with AI
            </Text>
        </VStack>
    );
};

export default Welcome;
