import React from 'react';

import {Container as ChakraContainer, ContainerProps} from "@chakra-ui/react";

const Container: React.FC<ContainerProps> = ({ children, ...rest}) => {
    return (
        <ChakraContainer
            maxW={'6xl'}
            py={{
                base: 4,
                md: 8
            }}
            display={'flex'}
            flexDir={'column'}
            gap={{
                base: 4,
                md: 8
            }}
            {...rest}
        >
            {children}
        </ChakraContainer>
    )
}

export default Container;