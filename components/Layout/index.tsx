import React from 'react';

import {Box, Flex, Skeleton} from "@chakra-ui/react";

import NotConnected from "@/components/Layout/NotConnected";
import Navbar, { navbarHeight, mobileNavbarHeight } from "@/components/Navbar";
import {mobileHeaderHeight} from "@/components/Home/NotesMenu/MobileHeader";

import useAuth from "@/hooks/auth/useAuth";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";


interface Props {
    children: React.ReactNode,
    authGate?: boolean
}

const Layout: React.FC<Props> = ({ children, authGate }) => {

    const { loading, isConnected } = useAuth();

    const { height } = useViewportDimensions();

    return (
        <Box
            h={height}
            backgroundSize={'cover'}
        >
            <Navbar />
            <Flex
                direction={'column'}
                gap={4}
                w={'100%'}
                h={{
                    base: height - mobileNavbarHeight - mobileHeaderHeight,
                    md: height - navbarHeight
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
