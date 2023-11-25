import React from 'react';

import SectionBlock from "@/components/Utilities/SectionBlock";
import UsersLeaderboard from "@/components/Users/UsersLeaderboard";

const ExploreLeaderboard = () => {
    return (
        <SectionBlock heading={'Leaderboard'}>
            <UsersLeaderboard />
        </SectionBlock>
    );
};

export default ExploreLeaderboard;
