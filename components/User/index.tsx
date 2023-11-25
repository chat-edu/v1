import React from 'react';

import {Container, Skeleton} from "@chakra-ui/react";

import NoUserFound from "@/components/User/NoUserFound";

import useUser from "@/hooks/queries/user/useUser";

import {User as UserType} from "@/types/User";
import UserDisplay from "@/components/User/UserDisplay";

interface Props {
    userId: UserType["id"]
}

const User: React.FC<Props> = ({ userId }) => {

    const { userData, loading } = useUser(userId);

    if(loading) return (
        <Skeleton />
    );

    return (
        <Container
            maxW={'6xl'}
            py={{
                base: 4,
                md: 8
            }}
            display={'flex'}
            flexDir={'column'}
            gap={{
                base: 4,
                md: 8
            }}
            h={'100%'}
        >
            {
                userData ? (
                    <UserDisplay
                        user={userData}
                    />
                ) : (
                    <NoUserFound />
                )
            }

        </Container>
    );
};

export default User;
