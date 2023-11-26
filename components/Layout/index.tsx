import React from 'react';

import {Box, Flex} from "@chakra-ui/react";

import NotConnected from "@/components/Layout/NotConnected";
import Navbar, { navbarHeight, mobileNavbarHeight } from "@/components/Layout/Navbar";
import Loading from "@/components/Utilities/Loading";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";

import useAuth from "@/hooks/useAuth";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";


interface Props {
    children: React.ReactElement,
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
                        <Loading
                            loading={loading}
                            h={'100%'}
                        >
                            {
                                isConnected ? (
                                    children
                                ) : (
                                    <NotConnected />
                                )
                            }
                        </Loading>
                    ) : (
                        children
                    )
                }
            </Flex>
        </Box>
    );
};

export default Layout;
