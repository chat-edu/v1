import React from 'react';

import {HStack, Text} from "@chakra-ui/react";

import {UserScore} from "@/types/Score";
import UsernameText from "@/components/Utilities/UsernameText";

interface Props {
    userScore: UserScore,
    rank: number
}

const NotebookLeaderboardRow: React.FC<Props> = ({ userScore, rank }) => {
    return (
        <HStack
            spacing={4}
            p={2}
            borderTopWidth={rank === 1 ? 0 : 2}
            w={'100%'}
            justify={'space-between'}
        >
            <HStack>
                <Text
                    fontWeight={'medium'}
                    color={rank <= 3 ? 'brand.500' : undefined}
                >
                    #{rank}
                </Text>
                <UsernameText
                    username={userScore.username}
                    id={userScore.userId}
                />
            </HStack>
            <Text>
                {userScore.score}
            </Text>
        </HStack>
    );
};

export default NotebookLeaderboardRow;
