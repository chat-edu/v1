import React from 'react';
import {Heading, HStack, Image, Text, VStack} from "@chakra-ui/react";
import useAuth from "@/hooks/useAuth";

const ExploreHeader = () => {

    const { user } = useAuth();

    return (
        <HStack
            spacing={{
                base: 4,
                md: 8
            }}
        >
            <Image
                src={'/logo.png'}
                boxSize={'100px'}
                alt={'Edu Chat Logo'}
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
                    <Text
                        as='span'
                    >
                        , {user?.name?.split(' ')[0]}
                    </Text>
                </Heading>
                <Text
                    fontSize={{
                        base: 'sm',
                        md: 'lg'
                    }}
                >
                    Supercharge your learning with AI
                </Text>
            </VStack>
        </HStack>
    );
};

export default ExploreHeader;
