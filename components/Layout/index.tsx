import React from 'react';

import {Box, Flex} from "@chakra-ui/react";

import Navbar, { navbarHeight, mobileNavbarHeight } from "@/components/Layout/Navbar";
import Loading from "@/components/Utilities/Loading";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookContent/NotebookMenu/MobileHeader";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

import {useCurrentUser} from "@/contexts/CurrentUserContext";


interface Props {
    children: React.ReactElement,
}

const Layout: React.FC<Props> = ({ children }) => {

    const { height } = useViewportDimensions();

    const { loading } = useCurrentUser();

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
                <Loading
                    loading={loading}
                    h={'100%'}
                >
                    {children}
                </Loading>
            </Flex>
        </Box>
    );
};

export default Layout;
