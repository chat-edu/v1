import React from 'react';

import {Box, Flex, Skeleton} from "@chakra-ui/react";

import NotConnected from "@/components/Layout/NotConnected";
import Navbar, { navbarHeight } from "@/components/Navbar";
import {mobileHeaderHeight} from "@/components/Home/NotesMenu/MobileHeader";

import useAuth from "@/hooks/auth/useAuth";


interface Props {
    children: React.ReactNode,
    authGate?: boolean
}

const Layout: React.FC<Props> = ({ children, authGate }) => {

    const { loading, isConnected } = useAuth();

    if(typeof window === 'undefined') return null;

    return (
        <Box
            h={window.innerHeight}
            backgroundImage={!isConnected ? 'url(http://localhost:3000/background.png)' : undefined}
            backgroundSize={'cover'}
        >
            <Navbar />
            <Flex
                direction={'column'}
                gap={4}
                w={'100%'}
                h={{
                    base: window.innerHeight - navbarHeight - mobileHeaderHeight,
                    md: window.innerHeight - navbarHeight
                }}
                position={'relative'}
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
