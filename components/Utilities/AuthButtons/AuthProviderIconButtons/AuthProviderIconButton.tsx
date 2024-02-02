import React from 'react';

import {Icon, IconButton} from "@chakra-ui/react";

import { signIn } from "next-auth/react";

import {AuthProviderButton} from "@/types/AuthProviderButton";

interface Props {
    provider: AuthProviderButton
}

const AuthProviderIconButton: React.FC<Props> = ({ provider }) => {
    return (
        <IconButton
            icon={
                <Icon
                    as={provider.icon}
                    boxSize={'24px'}
                />
            }
            aria-label={provider.provider}
            onClick={() => signIn(provider.provider)}
        />
    );
};

export default AuthProviderIconButton;
