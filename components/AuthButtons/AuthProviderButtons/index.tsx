import React from 'react';

import {VStack} from "@chakra-ui/react";

import AuthProviderButton from "@/components/AuthButtons/AuthProviderButtons/AuthProviderButton";
import authProviderButtons from "@/components/AuthButtons/buttons";

const AuthProviderButtons = () => {
    return (
        <VStack>
            {
                authProviderButtons.map(providerButton => (
                    <AuthProviderButton
                        key={providerButton.title}
                        provider={providerButton}
                    />
                ))
            }
        </VStack>
    )
};

export default AuthProviderButtons;