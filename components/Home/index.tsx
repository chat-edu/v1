import React from 'react';

import Explore from "@/components/Home/Explore";
import Onboarding from "@/components/Home/Onboarding";
import Loading from "@/components/Utilities/Loading";

import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser"

const Home = () => {

    const { user } = useAuth();

    const { userData, loading } = useUser(user?.id || '');

    return (
        <Loading
            loading={loading}
        >
            {
                userData ? (
                    <Explore />
                ) : (
                    <Onboarding />
                )
            }
        </Loading>
    )
};

export default Home;
