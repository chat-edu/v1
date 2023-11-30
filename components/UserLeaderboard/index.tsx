import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import UserLeaderboardRow from "@/components/UserLeaderboard/UserLeaderboardRow";
import Loading from "@/components/Utilities/Loading";

import {RankedUserScore} from "@/types/score";

interface Props<RankedUserScoreType extends RankedUserScore> {
    users: RankedUserScoreType[],
    loading: boolean,
    rightComponent?: (userScore: RankedUserScoreType) => React.ReactNode
}

const UserLeaderboard = <RankedUserScoreType extends RankedUserScore,>({ users, loading, rightComponent }: Props<RankedUserScoreType>) => {
    return (
        <VStack
            w={'100%'}
        >
            <Loading
                loading={loading}
                h={'500px'}
            >
                {
                    users.length === 0 ? (
                        <Text>
                            No users found.
                        </Text>
                    ) : (
                        <VStack
                            w={'100%'}
                        >
                            {
                                users.map((userScore) => (
                                    <UserLeaderboardRow
                                        userScore={userScore}
                                        key={userScore.userId}
                                        rightComponent={rightComponent ? rightComponent(userScore) : undefined}
                                    />
                                ))
                            }
                        </VStack>
                    )
                }
            </Loading>
        </VStack>
    );
};

export default UserLeaderboard;
