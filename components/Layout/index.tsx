import React, {useEffect} from 'react';

import {Box, Flex} from "@chakra-ui/react";

import {useRouter} from "next/navigation";

import Navbar, { navbarHeight, mobileNavbarHeight } from "@/components/Layout/Navbar";
import Loading from "@/components/Utilities/Loading";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";

import useAuth from "@/hooks/useAuth";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import useUser from "@/hooks/queries/user/useUser";


interface Props {
    children: React.ReactElement,
    isOnboarding?: boolean
}

const Layout: React.FC<Props> = ({ children, isOnboarding }) => {

    const { user, loading: authLoading } = useAuth();

    const { height } = useViewportDimensions();

    const { userData, loading: userDataLoading } = useUser(user?.id || '');

    const router = useRouter();

    useEffect(() => {
        if(user && userData === null && !userDataLoading && !isOnboarding) {
            router.replace('/onboarding')
        }
    }, [user, userData, userDataLoading, router]);

    return (
        <Box
            h={height}
            backgroundSize={'cover'}
        >
            <Navbar
                isOnboarding={isOnboarding}
            />
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
                    loading={authLoading || userDataLoading || (Boolean(user) && !userData && !isOnboarding)}
                    h={'100%'}
                >
                    {children}
                </Loading>
            </Flex>
        </Box>
    );
};

export default Layout;
