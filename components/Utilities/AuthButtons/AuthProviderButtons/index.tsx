import React from 'react';

import {VStack} from "@chakra-ui/react";

import AuthProviderButton from "@/components/Utilities/AuthButtons/AuthProviderButtons/AuthProviderButton";
import authProviderButtons from "@/components/Utilities/AuthButtons/buttons";

const AuthProviderButtons = () => {
    return (
        <VStack
            w={{
                base: '100%',
                md: '75%'
            }}
        >
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