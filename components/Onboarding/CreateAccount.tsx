import React from 'react';

import {Avatar, Button, Card, Heading, Text, VStack} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormUtilities/TextInput";

import useCreateUser from "@/hooks/mutators/useCreateUser";
import {useRouter} from "next/navigation";

const CreateAccount: React.FC = () => {

    const router = useRouter();

    const {
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        submitForm,
        randomizeProfilePicture,
        disabled,
        isSubmitting
    } = useCreateUser();

    const handleSubmit = async () => {
        const success = await submitForm();
        if(success) {
            router.replace('/')
        }
    }

    return (
        <Card
            p={4}
            flexDir={'column'}
            alignItems={'center'}
            w={'100%'}
            gap={4}
        >
            <VStack>
                <Heading>
                    Welcome to ChatEDU
                </Heading>
                <Text>
                    Get started by creating an account.
                </Text>
            </VStack>
            <VStack>
                <Avatar
                    size={'xl'}
                    name={values.name}
                    src={values.profilePictureUrl}
                />
                <Button
                    onClick={randomizeProfilePicture}
                    variant={'outline'}
                    colorScheme={'brand'}
                >
                    Randomize Profile Picture
                </Button>
            </VStack>
            <TextInput
                label={"Username"}
                placeholder={"Username"}
                value={values.username}
                onChange={(val) => setFieldValue('username', val)}
                error={touched.username && errors.username ? errors.username : ''}
                onBlur={() => setFieldTouched('username')}
            />
            <Button
                onClick={handleSubmit}
                isDisabled={disabled}
                colorScheme={'brand'}
                isLoading={isSubmitting}
            >
                Create Account
            </Button>
        </Card>
    );
};

export default CreateAccount;
