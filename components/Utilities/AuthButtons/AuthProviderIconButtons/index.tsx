import React from 'react';

import {HStack} from "@chakra-ui/react";

import AuthProviderIconButton from "@/components/Utilities/AuthButtons/AuthProviderIconButtons/AuthProviderIconButton";
import authProviderButtons from "@/components/Utilities/AuthButtons/buttons";

const AuthProviderIconButtons = () => {
    return (
        <HStack>
            {
                authProviderButtons.map(providerButton => (
                    <AuthProviderIconButton
                        key={providerButton.title}
                        provider={providerButton}
                    />
                ))
            }
        </HStack>
    )
};

export default AuthProviderIconButtons;