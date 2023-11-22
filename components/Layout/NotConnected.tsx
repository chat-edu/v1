import React from 'react';

import {Card, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";

import AuthProviderButtons from "@/components/AuthButtons/AuthProviderButtons";

const NotConnected = () => {

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
        >
            <Card
                p={16}
            >
                <VStack>
                    <Welcome />
                    <VStack>
                        <Text
                            textAlign={'center'}
                            fontSize={{
                                base: 'xs',
                                md: 'md'
                            }}
                        >
                            Get started by logging in
                        </Text>
                        <AuthProviderButtons />
                    </VStack>
                </VStack>
            </Card>
        </VStack>
    );
};

export default NotConnected;
