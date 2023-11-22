import React from 'react';

import {Card, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";

import AuthProviderButtons from "@/components/Utilities/AuthButtons/AuthProviderButtons";

const NotConnected = () => {

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
        >
            <Card
                p={16}
            >
                <VStack
                    w={'100%'}
                    spacing={8}
                >
                    <Welcome />
                    <AuthProviderButtons />
                </VStack>
            </Card>
        </VStack>
    );
};

export default NotConnected;
