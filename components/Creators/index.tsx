import React from 'react';

import Container from "@/components/Utilities/Container";
import CreatorsHeader from "@/components/Creators/CreatorsHeader";
import CreatorLeaderboard from "@/components/Creators/CreatorLeaderboard";

const Creators = () => {
    return (
        <Container>
            <CreatorsHeader />
            <CreatorLeaderboard />
        </Container>
    );
};

export default Creators;
