import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import UserLeaderboardRow from "@/components/Users/UserLeaderboardRow";

import useTopUsers from "@/hooks/queries/scores/users/useTopUsers";
import Loading from "@/components/Utilities/Loading";

interface Props {
    limit?: number
}

const UsersLeaderboard: React.FC<Props> = ({ limit }) => {

    const { userScores, loading } = useTopUsers(limit);

    return (
        <VStack
            w={'100%'}
        >
            <Loading
                loading={loading}
                h={'500px'}
            >
                {
                    userScores.length === 0 ? (
                        <Text>
                            No users found.
                        </Text>
                    ) : (
                        <VStack
                            w={'100%'}
                        >
                            {
                                userScores.map((userScore) => (
                                    <UserLeaderboardRow
                                        userScore={userScore}
                                        key={userScore.userId}
                                    />
                                ))
                            }
                        </VStack>
                    )
                }
            </Loading>
        </VStack>
    )
};

export default UsersLeaderboard;
