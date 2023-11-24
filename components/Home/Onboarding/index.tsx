import React from 'react';

import {Button, Card, Divider, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";

import useAuth from "@/hooks/useAuth";

import {addUser} from "@/services/user";

import {emitUsersChangedEvent} from "@/eventEmitters/userEventEmitter";

const Onboarding: React.FC = () => {

    const { user } = useAuth();

    const onStartLearning = async () => {
        if(!user) return;
        await addUser({
            id: user.id || '',
            email: user.email || '',
            name: user.name || '',
            username: '',
        });
        emitUsersChangedEvent(user.id)
    }

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
        >
            <Card
                w={{
                    base: '100%',
                    md: '600px'
                }}
                alignItems={'center'}
                gap={{
                    base: 2,
                    md: 4
                }}
            >
                <Welcome />
                <VStack
                    flex={1}
                    spacing={{
                        base: 2,
                        md: 4
                    }}
                    justifyContent={'center'}
                    textAlign={'center'}
                >
                    <Text
                        fontSize={{
                            base: 'sm',
                            md: 'lg'
                        }}
                        textAlign={'center'}
                    >
                        ChatEDU is a platform that allows you to create study guides, ask questions, and answer practice problems based on your notes.
                    </Text>
                    <Divider />
                    <Button
                        colorScheme={'brand'}
                        onClick={onStartLearning}
                    >
                        Start Learning
                    </Button>
                </VStack>
            </Card>
        </VStack>
    );
};

export default Onboarding;
