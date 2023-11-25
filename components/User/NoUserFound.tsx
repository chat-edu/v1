import React from 'react';
import {Button, Card, Heading, Text, VStack} from "@chakra-ui/react";
import Link from "next/link";

const NoUserFound = () => {
    return (
        <VStack
            h={'100%'}
            justifyContent={'center'}
        >
            <Card
                p={8}
                alignItems={'center'}
                display={'flex'}
                flexDirection={'column'}
                gap={2}
            >
                <Heading>
                    No user found
                </Heading>
                <Text>
                    There is no user associated with this ID
                </Text>
                <Link href={'/'}>
                    <Button
                        colorScheme={'brand'}
                    >
                        Go Home
                    </Button>
                </Link>
            </Card>
        </VStack>
    );
};

export default NoUserFound;
