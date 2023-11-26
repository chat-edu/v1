import React from 'react';

import {VStack} from "@chakra-ui/react";

import AuthProviderButton from "@/components/Utilities/AuthButtons/AuthProviderButtons/AuthProviderButton";
import authProviderButtons from "@/components/Utilities/AuthButtons/buttons";

interface Props {
    width?: string
}

const AuthProviderButtons: React.FC<Props> = ({ width = '75%'}) => {
    return (
        <VStack
            w={{
                base: '100%',
                md: width
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