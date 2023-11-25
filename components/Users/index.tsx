import React from 'react';

import UsersHeader from "@/components/Users/UsersHeader";
import Container from "@/components/Utilities/Container";
import UsersLeaderboard from "@/components/Users/UsersLeaderboard";

const Users = () => {
    return (
        <Container>
            <UsersHeader />
            <UsersLeaderboard />
        </Container>
    );
};

export default Users;
