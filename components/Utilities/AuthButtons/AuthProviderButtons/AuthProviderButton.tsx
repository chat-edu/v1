import React from 'react';

import {Button, Icon} from "@chakra-ui/react";

import { signIn } from "next-auth/react";

import {AuthProviderButton as AuthProviderButtonType} from "@/types/AuthProviderButton";

interface Props {
    provider: AuthProviderButtonType
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
            justifyContent={'flex-start'}
            flexShrink={0}
        >
            {provider.title}
        </Button>
    );
};

export default AuthProviderButton;
