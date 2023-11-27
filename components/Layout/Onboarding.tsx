import React from 'react';

import {Button, Card, Divider, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";
import TextInput from "@/components/Utilities/FormUtilities/TextInput";

import useCreateUser from "@/hooks/mutators/useCreateUser";

const Onboarding: React.FC = () => {

    const {
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        submitForm,
        disabled
    } = useCreateUser();

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
                    <TextInput
                        label={'Username'}
                        placeholder={'Username'}
                        value={values.username}
                        onChange={(value) => setFieldValue('username', value)}
                        onBlur={() => setFieldTouched('username')}
                        error={touched.username ? errors.username : undefined}
                    />
                    <Button
                        colorScheme={'brand'}
                        onClick={submitForm}
                        isDisabled={disabled}
                    >
                        Start Learning
                    </Button>
                </VStack>
            </Card>
        </VStack>
    );
};

export default Onboarding;
