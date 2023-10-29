import React from 'react';

import {Box, Flex, Skeleton} from "@chakra-ui/react";

import NotConnected from "@/components/Layout/NotConnected";
import Navbar, { navbarHeight } from "@/components/Navbar";

import useAuth from "@/hooks/auth/useAuth";

interface Props {
    children: React.ReactNode,
    authGate?: boolean
}

const Layout: React.FC<Props> = ({ children, authGate }) => {

    const { loading, isConnected } = useAuth();

    return (
        <Box
            h={'100vh'}
            // add the background image here, which is at /background.png
            backgroundImage={!isConnected ? 'url(http://localhost:3000/background.png)' : undefined}
            backgroundSize={'cover'}
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
