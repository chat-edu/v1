import React from 'react';

import UsersHeader from "@/components/Users/UsersHeader";
import Container from "@/components/Utilities/Container";
import UserScoreLeaderboard from "@/components/Users/UserScoreLeaderboard";

const Users = () => {
    return (
        <Container>
            <UsersHeader />
            <UserScoreLeaderboard />
        </Container>
    );
};

export default Users;
