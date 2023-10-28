import React from 'react';

import {Box, Flex, Skeleton} from "@chakra-ui/react";

import NotConnected from "@/components/Layout/NotConnected";

interface Props {
    children: React.ReactNode,
    authGate?: boolean
}

const Layout: React.FC<Props> = ({ children, authGate }) => {


    const loading = false;
    const isConnected = true;

    return (
        <Box
            h={'100vh'}
        >
            <Flex
                direction={'column'}
                gap={4}
                w={'100%'}
                h={'100%'}
            >
                {
                    authGate ? (
                        loading ? (
                            <Skeleton />
                        ) : (
                            isConnected ? (
                                children
                            ) : (
                                <NotConnected />
                            )
                        )
                    ) : (
                        children
                    )
                }
            </Flex>
        </Box>
    );
};

export default Layout;
