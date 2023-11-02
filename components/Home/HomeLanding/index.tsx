import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";

const HomeLanding = () => {

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
            textAlign={'center'}
            spacing={{
                base: 2,
                md: 4
            }}
        >
            <Welcome />
            <Text
                fontSize={{
                    base: 'sm',
                    md: 'lg'
                }}
                textAlign={'center'}
                fontWeight={'bold'}
            >
                Select a note to get started!
            </Text>
        </VStack>
    )
};

export default HomeLanding;
