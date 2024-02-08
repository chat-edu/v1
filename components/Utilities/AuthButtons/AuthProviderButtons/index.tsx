import React from 'react';

import {HStack} from "@chakra-ui/react";

import AuthProviderButton from "@/components/Utilities/AuthButtons/AuthProviderButtons/AuthProviderButton";
import authProviderButtons from "@/components/Utilities/AuthButtons/buttons";

const AuthProviderButtons: React.FC = () => {
    return (
        <HStack>
            {
                authProviderButtons.map(providerButton => (
                    <AuthProviderButton
                        key={providerButton.title}
                        provider={providerButton}
                    />
                ))
            }
        </HStack>
    )
};

export default AuthProviderButtons;