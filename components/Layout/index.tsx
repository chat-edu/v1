import React from 'react';

import {Box, Flex} from "@chakra-ui/react";

import Navbar, { navbarHeight, mobileNavbarHeight } from "@/components/Layout/Navbar";
import Loading from "@/components/Utilities/Loading";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";
import Onboarding from "@/components/Layout/Onboarding";

import useAuth from "@/hooks/useAuth";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import useUser from "@/hooks/queries/user/useUser";


interface Props {
    children: React.ReactElement,
}

const Layout: React.FC<Props> = ({ children }) => {

    const { user, loading: authLoading } = useAuth();

    const { height } = useViewportDimensions();

    const { userData, loading: userDataLoading } = useUser(user?.id || '');

    console.log(user, userData)

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
                    loading={authLoading || userDataLoading}
                    h={'100%'}
                >
                    {
                        user && !userData ? (
                            <Onboarding />
                        ) : (
                            children
                        )
                    }
                </Loading>
            </Flex>
        </Box>
    );
};

export default Layout;
