import React from 'react';

import {Button, Icon} from "@chakra-ui/react";

import { signIn } from "next-auth/react";

import {AuthProviderButton} from "@/types/AuthProviderButton";

interface Props {
    provider: AuthProviderButton
}

const AuthProviderButton: React.FC<Props> = ({ provider }) => {
    return (
        <Button
            leftIcon={
                <Icon
                    as={provider.icon}
                    boxSize={'24px'}
                />
            }
            onClick={() => signIn(provider.provider)}
            w={'100%'}
            justifyContent={'flex-start'}
            variant={'outline'}
        >
            {provider.title}
        </Button>
    );
};

export default AuthProviderButton;
