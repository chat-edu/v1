import React from 'react';

import YourNotebooks from "@/components/NotebookGrids/YourNotebooks";
import HomeHeader from "@/components/Home/HomeHeader";
import Container from "@/components/Utilities/Container";
import useAuth from "@/hooks/useAuth";
import Overview from "@/components/Home/Overview";

const Home = () => {

    const { user } = useAuth();

    return (
        <Container>
            <HomeHeader />
            {
                user ? (
                    <YourNotebooks />
                ) : (
                    <Overview />
                )
            }

        </Container>
    );
};

export default Home;
