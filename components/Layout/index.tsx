import React from 'react';

import {Box, Flex, Skeleton} from "@chakra-ui/react";

import NotConnected from "@/components/Layout/NotConnected";
import Navbar, { navbarHeight } from "@/components/Navbar";

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
            <Navbar />
            <Flex
                direction={'column'}
                gap={4}
                w={'100%'}
                h={`calc(100vh - ${navbarHeight})`}
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
