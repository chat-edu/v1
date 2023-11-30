import React from 'react';

import {HStack} from "@chakra-ui/react";

import UsernameText from "@/components/Utilities/UsernameText";
import Medal from "@/components/Utilities/Medal";
import UserPoints from "@/components/Utilities/Points/UserPoints";

import {UserScore} from "@/types/score";

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
                <Medal rank={rank} />
                <UsernameText
                    username={userScore.username}
                    id={userScore.userId}
                    verified={userScore.verified}
                    opacity={0.75}
                />
            </HStack>
            <UserPoints
                points={userScore.score}
            />
        </HStack>
    );
};

export default NotebookLeaderboardRow;
