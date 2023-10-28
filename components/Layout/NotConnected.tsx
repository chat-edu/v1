import React from 'react';

import {Button, Card, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";

import SignInWithGoogleButton from "@/components/Navbar/SignInWithGoogleButton";

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
                        >
                            Get started by logging in with your vanderbilt.edu email
                        </Text>
                        <SignInWithGoogleButton />
                        <Text
                            textAlign={'center'}
                        >
                            If you want to try the app without logging in
                        </Text>
                        <Button>
                            Test as Guest
                        </Button>
                    </VStack>
                </VStack>
            </Card>
        </VStack>
    );
};

export default NotConnected;
