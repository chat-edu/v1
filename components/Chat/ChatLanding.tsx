import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";

import useAuth from "@/hooks/useAuth";
import AuthProviderButtons from "@/components/Utilities/AuthButtons/AuthProviderButtons";

const HomeLanding = () => {

    const { user } = useAuth();

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
            textAlign={'center'}
            spacing={{
                base: 2,
                md: 4
            }}
        >
            <Welcome />
            {
                user ? (
                    <Text
                        fontSize={{
                            base: 'sm',
                            md: 'lg'
                        }}
                        textAlign={'center'}
                        fontWeight={'bold'}
                    >
                        Select a topic to get started!
                    </Text>
                ) : (
                    <VStack>
                        <Text
                            fontSize={{
                                base: 'sm',
                                md: 'lg'
                            }}
                            fontWeight={'bold'}
                        >
                            Sign in to get started!
                        </Text>
                        <AuthProviderButtons
                            width={'100%'}
                        />
                    </VStack>
                )
            }

        </VStack>
    )
};

export default HomeLanding;
