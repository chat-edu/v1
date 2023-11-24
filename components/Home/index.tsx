import React from 'react';

import Explore from "@/components/Home/Explore";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/useUser";
import {Skeleton} from "@chakra-ui/react";
import Onboarding from "@/components/Home/Onboarding";

const Home = () => {

    const { user } = useAuth();

    const { userData, loading } = useUser(user?.id || '');

    if (loading) {
        return <Skeleton />
    }

    if(!userData) {
        return <Onboarding />
    }

    return (
        <Explore />
    );
};

export default Home;
