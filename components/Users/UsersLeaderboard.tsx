import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import UserLeaderboardRow from "@/components/Users/UserLeaderboardRow";

import useTopUsers from "@/hooks/queries/user/useTopUsers";
import Loading from "@/components/Utilities/Loading";

const UsersLeaderboard: React.FC = () => {

    const { userScores, loading } = useTopUsers()

    return (
        <VStack
            w={'100%'}
        >
            <Loading loading={loading}>
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
                                        key={userScore.id}
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
