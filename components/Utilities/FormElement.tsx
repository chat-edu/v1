import React from 'react';

import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";

interface Props {
    label: string,
    error?: string,
    children: React.ReactNode,
}

const FormElement: React.FC<Props> = ({ label, error, children}) => {
    return (
        <FormControl
            isInvalid={!!error}
            py={0}
            colorScheme={"brand"}
            w={"100%"}
        >
            <FormLabel>{label}</FormLabel>
            {children}
            {error && (
                <FormErrorMessage>{error}</FormErrorMessage>
            )}
        </FormControl>
    );
};

export default FormElement;
