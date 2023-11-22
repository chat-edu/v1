import React from 'react';

import {IconButton, Image} from "@chakra-ui/react";

import { signIn } from "next-auth/react";

import {AuthProviderButton} from "@/types/AuthProviderButton";

interface Props {
    provider: AuthProviderButton
}

const AuthProviderIconButton: React.FC<Props> = ({ provider }) => {
    return (
        <IconButton
            icon={
                <Image
                    src={provider.imageSrc}
                    alt={provider.provider}
                    boxSize={'24px'}
                />
            }
            aria-label={provider.provider}
            onClick={() => signIn(provider.provider)}
        />
    );
};

export default AuthProviderIconButton;
