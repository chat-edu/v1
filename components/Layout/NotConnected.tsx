import React from 'react';

import {Card, Heading, Text, VStack} from "@chakra-ui/react";

const NotConnected = () => {
    return (
        <Card>
            <VStack
                spacing={4}
            >
                <Heading
                    size={'lg'}
                >
                    You are not signed in
                </Heading>
                <Text>
                    You must be signed in with your Vanderbilt Google account to view this page.
                </Text>
            </VStack>
        </Card>
    );
};

export default NotConnected;
